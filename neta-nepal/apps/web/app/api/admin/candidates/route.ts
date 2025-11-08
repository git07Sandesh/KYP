import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@repo/database"
import { z } from "zod"

// Helper to check if user is admin
async function checkAdmin() {
  const session = await auth()
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
    return null
  }
  return session.user
}

const createCandidateSchema = z.object({
  name: z.string().min(1),
  nameNepali: z.string().optional(),
  age: z.number().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  photoUrl: z.string().url().optional(),
  partyId: z.number(),
  constituencyId: z.number(),
  bio: z.string().optional(),
  yearsInPolitics: z.number().optional(),
})

// GET - List all candidates (including drafts for admin)
export async function GET(request: NextRequest) {
  try {
    const user = await checkAdmin()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100)

    const where: any = {}
    if (status) {
      where.status = status
    }

    const skip = (page - 1) * limit

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
          updatedAt: "desc"
        },
        skip,
        take: limit
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
    console.error("Error fetching candidates:", error)
    return NextResponse.json(
      { error: "Failed to fetch candidates" },
      { status: 500 }
    )
  }
}

// POST - Create new candidate
export async function POST(request: NextRequest) {
  try {
    const user = await checkAdmin()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const data = createCandidateSchema.parse(body)

    const candidate = await prisma.candidate.create({
      data: {
        ...data,
        status: "DRAFT"
      },
      include: {
        party: true,
        constituency: {
          include: {
            province: true,
            district: true
          }
        }
      }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "CREATE",
        entityType: "Candidate",
        entityId: candidate.id,
        changes: {
          new: data
        }
      }
    })

    return NextResponse.json({ candidate }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request body", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error creating candidate:", error)
    return NextResponse.json(
      { error: "Failed to create candidate" },
      { status: 500 }
    )
  }
}
