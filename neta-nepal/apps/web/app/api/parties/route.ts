import { NextResponse } from "next/server"
import { prisma } from "@repo/database"

export async function GET() {
  try {
    const parties = await prisma.party.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        name: "asc"
      }
    })

    return NextResponse.json({ parties })
  } catch (error) {
    console.error("Error fetching parties:", error)
    return NextResponse.json(
      { error: "Failed to fetch parties" },
      { status: 500 }
    )
  }
}
