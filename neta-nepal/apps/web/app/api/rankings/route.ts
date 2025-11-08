import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"
import { z } from "zod"

const rankingsQuerySchema = z.object({
  category: z.enum(["TOP_IMPACT", "CLEANEST_RECORDS", "HIGHEST_FULFILLMENT", "MOST_EXPERIENCED", "MOST_POPULAR"]).default("TOP_IMPACT"),
  level: z.enum(["FEDERAL", "PROVINCIAL", "LOCAL"]).optional(),
  partyId: z.string().pipe(z.coerce.number()).optional(),
  limit: z.string().default("50").pipe(z.coerce.number()),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = rankingsQuerySchema.parse(Object.fromEntries(searchParams))

    const { category, level, partyId, limit } = query
    const maxLimit = Math.min(limit, 100)

    // Build where clause for filtering
    const where: any = {
      status: "PUBLISHED"
    }

    if (level) {
      where.constituency = {
        level
      }
    }

    if (partyId) {
      where.partyId = partyId
    }

    let orderBy: any = {}
    let rankings: any[] = []

    switch (category) {
      case "TOP_IMPACT":
        orderBy = { impactScore: "desc" }
        break
      case "CLEANEST_RECORDS":
        // Lower scandal score is better
        orderBy = { scandalScore: "asc" }
        break
      case "HIGHEST_FULFILLMENT":
        orderBy = { fulfillmentRate: "desc" }
        break
      case "MOST_EXPERIENCED":
        orderBy = { yearsInPolitics: "desc" }
        break
      case "MOST_POPULAR":
        orderBy = { popularityScore: "desc" }
        break
    }

    const candidates = await prisma.candidate.findMany({
      where,
      include: {
        party: true,
        constituency: {
          include: {
            province: true,
            district: true
          }
        }
      },
      orderBy,
      take: maxLimit
    })

    // Add rank numbers
    rankings = candidates.map((candidate, index) => ({
      rank: index + 1,
      candidate,
      score: category === "TOP_IMPACT" ? candidate.impactScore :
             category === "CLEANEST_RECORDS" ? candidate.scandalScore :
             category === "HIGHEST_FULFILLMENT" ? candidate.fulfillmentRate :
             category === "MOST_EXPERIENCED" ? candidate.yearsInPolitics :
             candidate.popularityScore
    }))

    return NextResponse.json({
      rankings,
      category,
      filters: {
        level,
        partyId
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error fetching rankings:", error)
    return NextResponse.json(
      { error: "Failed to fetch rankings" },
      { status: 500 }
    )
  }
}
