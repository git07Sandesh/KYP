import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"
import { z } from "zod"

const casesQuerySchema = z.object({
  status: z.enum(["FILED", "UNDER_INVESTIGATION", "TRIAL", "HEARING", "ACQUITTED", "CONVICTED", "WITHDRAWN", "CLOSED", "INACTIVE"]).optional(),
  minSeverity: z.string().pipe(z.coerce.number()).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const searchParams = request.nextUrl.searchParams
    const query = casesQuerySchema.parse(Object.fromEntries(searchParams))

    const where: any = {
      candidateId: id
    }

    if (query.status) {
      where.status = query.status
    }

    if (query.minSeverity !== undefined) {
      where.severity = {
        gte: query.minSeverity
      }
    }

    const cases = await prisma.case.findMany({
      where,
      include: {
        sources: {
          include: {
            source: true
          }
        }
      },
      orderBy: {
        filedDate: "desc"
      }
    })

    return NextResponse.json({ cases })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error fetching cases:", error)
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 500 }
    )
  }
}
