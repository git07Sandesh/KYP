import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@repo/database"
import { z } from "zod"

async function checkAdmin() {
  const session = await auth()
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
    return null
  }
  return session.user
}

const createPromiseSchema = z.object({
  candidateId: z.string(),
  text: z.string().min(1),
  category: z.enum(["ECONOMY", "INFRASTRUCTURE", "HEALTH", "EDUCATION", "SOCIAL_WELFARE", "ENVIRONMENT", "GOVERNANCE", "SECURITY", "AGRICULTURE", "OTHER"]),
  type: z.enum(["MANIFESTO", "SPEECH", "PUBLIC_COMMITMENT", "INTERVIEW", "OTHER"]),
  status: z.enum(["KEPT", "IN_PROGRESS", "BROKEN", "NO_EVIDENCE", "PARTIALLY_FULFILLED"]).default("NO_EVIDENCE"),
  electionCycle: z.string().optional(),
  progressPercent: z.number().min(0).max(100).optional(),
  announcedDate: z.string().optional(),
  sourceIds: z.array(z.string()).optional(),
})

// POST - Create new promise
export async function POST(request: NextRequest) {
  try {
    const user = await checkAdmin()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { sourceIds, announcedDate, ...data } = createPromiseSchema.parse(body)

    const promise = await prisma.promise.create({
      data: {
        ...data,
        announcedDate: announcedDate ? new Date(announcedDate) : undefined,
        sources: sourceIds && sourceIds.length > 0 ? {
          create: sourceIds.map(sourceId => ({
            sourceId
          }))
        } : undefined
      },
      include: {
        candidate: true,
        sources: {
          include: {
            source: true
          }
        }
      }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "CREATE",
        entityType: "Promise",
        entityId: promise.id,
        changes: {
          new: data
        }
      }
    })

    return NextResponse.json({ promise }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request body", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error creating promise:", error)
    return NextResponse.json(
      { error: "Failed to create promise" },
      { status: 500 }
    )
  }
}

// GET - List promises
export async function GET(request: NextRequest) {
  try {
    const user = await checkAdmin()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const candidateId = searchParams.get("candidateId")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100)

    const where: any = {}
    if (candidateId) {
      where.candidateId = candidateId
    }

    const skip = (page - 1) * limit

    const [total, promises] = await Promise.all([
      prisma.promise.count({ where }),
      prisma.promise.findMany({
        where,
        include: {
          candidate: true,
          sources: {
            include: {
              source: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        },
        skip,
        take: limit
      })
    ])

    return NextResponse.json({
      promises,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("Error fetching promises:", error)
    return NextResponse.json(
      { error: "Failed to fetch promises" },
      { status: 500 }
    )
  }
}
