import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"
import { z } from "zod"

const promisesQuerySchema = z.object({
  category: z.enum(["ECONOMY", "INFRASTRUCTURE", "HEALTH", "EDUCATION", "SOCIAL_WELFARE", "ENVIRONMENT", "GOVERNANCE", "SECURITY", "AGRICULTURE", "OTHER"]).optional(),
  status: z.enum(["KEPT", "IN_PROGRESS", "BROKEN", "NO_EVIDENCE", "PARTIALLY_FULFILLED"]).optional(),
  electionCycle: z.string().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const searchParams = request.nextUrl.searchParams
    const query = promisesQuerySchema.parse(Object.fromEntries(searchParams))

    const where: any = {
      candidateId: id
    }

    if (query.category) {
      where.category = query.category
    }

    if (query.status) {
      where.status = query.status
    }

    if (query.electionCycle) {
      where.electionCycle = query.electionCycle
    }

    const promises = await prisma.promise.findMany({
      where,
      include: {
        sources: {
          include: {
            source: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({ promises })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error fetching promises:", error)
    return NextResponse.json(
      { error: "Failed to fetch promises" },
      { status: 500 }
    )
  }
}
