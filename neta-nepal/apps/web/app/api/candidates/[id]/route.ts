import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const candidate = await prisma.candidate.findUnique({
      where: { id },
      include: {
        party: true,
        constituency: {
          include: {
            province: true,
            district: true
          }
        },
        posts: {
          orderBy: {
            startDate: "desc"
          }
        },
        promises: {
          orderBy: {
            createdAt: "desc"
          }
        },
        works: {
          orderBy: {
            startDate: "desc"
          }
        },
        cases: {
          orderBy: {
            filedDate: "desc"
          }
        },
        rumors: {
          where: {
            isExpired: false
          },
          orderBy: {
            originDate: "desc"
          }
        }
      }
    })

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 }
      )
    }

    // Only show published candidates to public
    if (candidate.status !== "PUBLISHED") {
      return NextResponse.json(
        { error: "Candidate not available" },
        { status: 404 }
      )
    }

    return NextResponse.json({ candidate })
  } catch (error) {
    console.error("Error fetching candidate:", error)
    return NextResponse.json(
      { error: "Failed to fetch candidate" },
      { status: 500 }
    )
  }
}
