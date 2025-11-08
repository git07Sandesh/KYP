import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"
import { z } from "zod"

const worksQuerySchema = z.object({
  category: z.enum(["INFRASTRUCTURE", "HEALTH", "EDUCATION", "SOCIAL_PROGRAMS", "POLICY_WORK", "LEGISLATION", "COMMUNITY_DEVELOPMENT", "ENVIRONMENT", "OTHER"]).optional(),
  impactLevel: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const searchParams = request.nextUrl.searchParams
    const query = worksQuerySchema.parse(Object.fromEntries(searchParams))

    const where: any = {
      candidateId: id
    }

    if (query.category) {
      where.category = query.category
    }

    if (query.impactLevel) {
      where.impactLevel = query.impactLevel
    }

    const works = await prisma.work.findMany({
      where,
      include: {
        sources: {
          include: {
            source: true
          }
        }
      },
      orderBy: {
        startDate: "desc"
      }
    })

    return NextResponse.json({ works })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error fetching works:", error)
    return NextResponse.json(
      { error: "Failed to fetch works" },
      { status: 500 }
    )
  }
}
