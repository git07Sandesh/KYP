import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"
import { z } from "zod"

const constituenciesQuerySchema = z.object({
  provinceId: z.string().pipe(z.coerce.number()).optional(),
  districtId: z.string().pipe(z.coerce.number()).optional(),
  level: z.enum(["FEDERAL", "PROVINCIAL", "LOCAL"]).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = constituenciesQuerySchema.parse(Object.fromEntries(searchParams))

    const where: any = {}

    if (query.provinceId) {
      where.provinceId = query.provinceId
    }

    if (query.districtId) {
      where.districtId = query.districtId
    }

    if (query.level) {
      where.level = query.level
    }

    const constituencies = await prisma.constituency.findMany({
      where,
      include: {
        province: true,
        district: true
      },
      orderBy: [
        {
          provinceId: "asc"
        },
        {
          constituencyNumber: "asc"
        }
      ]
    })

    return NextResponse.json({ constituencies })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error fetching constituencies:", error)
    return NextResponse.json(
      { error: "Failed to fetch constituencies" },
      { status: 500 }
    )
  }
}
