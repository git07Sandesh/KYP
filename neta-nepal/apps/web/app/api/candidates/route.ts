import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"
import { z } from "zod"

// Query params validation schema
const candidatesQuerySchema = z.object({
  level: z.enum(["FEDERAL", "PROVINCIAL", "LOCAL"]).optional(),
  partyId: z.string().pipe(z.coerce.number()).optional(),
  constituencyId: z.string().pipe(z.coerce.number()).optional(),
  page: z.string().default("1").pipe(z.coerce.number()),
  limit: z.string().default("20").pipe(z.coerce.number()),
  sortBy: z.enum(["name", "impactScore", "fulfillmentRate", "scandalScore"]).default("name"),
  order: z.enum(["asc", "desc"]).default("asc"),
  status: z.enum(["DRAFT", "PENDING_REVIEW", "PUBLISHED", "ARCHIVED"]).optional(),
  minImpactScore: z.string().pipe(z.coerce.number()).optional(),
  maxScandalScore: z.string().pipe(z.coerce.number()).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const params = candidatesQuerySchema.parse(Object.fromEntries(searchParams))

    const { page, limit, sortBy, order, level, partyId, constituencyId, status, minImpactScore, maxScandalScore } = params

    // Build where clause
    const where: any = {
      status: status || "PUBLISHED", // Default to showing only published candidates
    }

    if (level) {
      where.constituency = {
        level
      }
    }

    if (partyId) {
      where.partyId = partyId
    }

    if (constituencyId) {
      where.constituencyId = constituencyId
    }

    if (minImpactScore !== undefined) {
      where.impactScore = {
        ...where.impactScore,
        gte: minImpactScore
      }
    }

    if (maxScandalScore !== undefined) {
      where.scandalScore = {
        ...where.scandalScore,
        lte: maxScandalScore
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit
    const take = Math.min(limit, 100) // Max 100 per page

    // Get total count and candidates
    const [total, candidates] = await Promise.all([
      prisma.candidate.count({ where }),
      prisma.candidate.findMany({
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
        orderBy: {
          [sortBy]: order
        },
        skip,
        take
      })
    ])

    return NextResponse.json({
      candidates,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error fetching candidates:", error)
    return NextResponse.json(
      { error: "Failed to fetch candidates" },
      { status: 500 }
    )
  }
}
