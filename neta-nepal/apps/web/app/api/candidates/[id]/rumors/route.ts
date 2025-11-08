import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const rumors = await prisma.rumor.findMany({
      where: {
        candidateId: id,
        isExpired: false
      },
      orderBy: {
        originDate: "desc"
      }
    })

    return NextResponse.json({ rumors })
  } catch (error) {
    console.error("Error fetching rumors:", error)
    return NextResponse.json(
      { error: "Failed to fetch rumors" },
      { status: 500 }
    )
  }
}
