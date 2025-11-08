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

const updateCandidateSchema = z.object({
  name: z.string().min(1).optional(),
  nameNepali: z.string().optional(),
  age: z.number().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  photoUrl: z.string().url().optional(),
  partyId: z.number().optional(),
  constituencyId: z.number().optional(),
  bio: z.string().optional(),
  yearsInPolitics: z.number().optional(),
  status: z.enum(["DRAFT", "PENDING_REVIEW", "PUBLISHED", "ARCHIVED"]).optional(),
})

// PATCH - Update candidate
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await checkAdmin()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const data = updateCandidateSchema.parse(body)

    // Get old data for audit log
    const oldCandidate = await prisma.candidate.findUnique({
      where: { id }
    })

    if (!oldCandidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 })
    }

    const candidate = await prisma.candidate.update({
      where: { id },
      data,
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
        action: "UPDATE",
        entityType: "Candidate",
        entityId: id,
        changes: {
          old: oldCandidate,
          new: data
        }
      }
    })

    return NextResponse.json({ candidate })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request body", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error updating candidate:", error)
    return NextResponse.json(
      { error: "Failed to update candidate" },
      { status: 500 }
    )
  }
}

// DELETE - Delete candidate
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await checkAdmin()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const candidate = await prisma.candidate.findUnique({
      where: { id }
    })

    if (!candidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 })
    }

    await prisma.candidate.delete({
      where: { id }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "DELETE",
        entityType: "Candidate",
        entityId: id,
        changes: {
          deleted: candidate
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting candidate:", error)
    return NextResponse.json(
      { error: "Failed to delete candidate" },
      { status: 500 }
    )
  }
}
