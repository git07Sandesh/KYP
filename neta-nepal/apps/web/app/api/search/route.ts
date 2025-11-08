import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"
import { z } from "zod"

const searchQuerySchema = z.object({
  q: z.string().min(1),
  type: z.enum(["candidates", "promises", "works", "cases"]).default("candidates"),
  limit: z.string().default("20").pipe(z.coerce.number()),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchQuerySchema.parse(Object.fromEntries(searchParams))

    const { q, type, limit } = query
    const maxLimit = Math.min(limit, 50)

    let results: any[] = []
    let total = 0

    switch (type) {
      case "candidates":
        // Search in candidate names and bios
        results = await prisma.candidate.findMany({
          where: {
            status: "PUBLISHED",
            OR: [
              {
                name: {
                  contains: q,
                  mode: "insensitive"
                }
              },
              {
                nameNepali: {
                  contains: q,
                  mode: "insensitive"
                }
              },
              {
                bio: {
                  contains: q,
                  mode: "insensitive"
                }
              }
            ]
          },
          include: {
            party: true,
            constituency: {
              include: {
                province: true,
                district: true
              }
            }
          },
          take: maxLimit,
          orderBy: {
            popularityScore: "desc"
          }
        })
        
        total = await prisma.candidate.count({
          where: {
            status: "PUBLISHED",
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { nameNepali: { contains: q, mode: "insensitive" } },
              { bio: { contains: q, mode: "insensitive" } }
            ]
          }
        })
        break

      case "promises":
        results = await prisma.promise.findMany({
          where: {
            text: {
              contains: q,
              mode: "insensitive"
            },
            candidate: {
              status: "PUBLISHED"
            }
          },
          include: {
            candidate: {
              include: {
                party: true
              }
            }
          },
          take: maxLimit,
          orderBy: {
            createdAt: "desc"
          }
        })
        
        total = await prisma.promise.count({
          where: {
            text: { contains: q, mode: "insensitive" },
            candidate: { status: "PUBLISHED" }
          }
        })
        break

      case "works":
        results = await prisma.work.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: q,
                  mode: "insensitive"
                }
              },
              {
                description: {
                  contains: q,
                  mode: "insensitive"
                }
              }
            ],
            candidate: {
              status: "PUBLISHED"
            }
          },
          include: {
            candidate: {
              include: {
                party: true
              }
            }
          },
          take: maxLimit,
          orderBy: {
            startDate: "desc"
          }
        })
        
        total = await prisma.work.count({
          where: {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } }
            ],
            candidate: { status: "PUBLISHED" }
          }
        })
        break

      case "cases":
        results = await prisma.case.findMany({
          where: {
            allegation: {
              contains: q,
              mode: "insensitive"
            },
            candidate: {
              status: "PUBLISHED"
            }
          },
          include: {
            candidate: {
              include: {
                party: true
              }
            }
          },
          take: maxLimit,
          orderBy: {
            filedDate: "desc"
          }
        })
        
        total = await prisma.case.count({
          where: {
            allegation: { contains: q, mode: "insensitive" },
            candidate: { status: "PUBLISHED" }
          }
        })
        break
    }

    return NextResponse.json({
      results,
      total,
      query: q,
      type
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error performing search:", error)
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    )
  }
}
