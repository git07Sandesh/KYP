import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Get all unique sources from promises, works, and cases for this candidate
    const [promiseSources, workSources, caseSources] = await Promise.all([
      prisma.promiseSource.findMany({
        where: {
          promise: {
            candidateId: id
          }
        },
        include: {
          source: true
        },
        distinct: ['sourceId']
      }),
      prisma.workSource.findMany({
        where: {
          work: {
            candidateId: id
          }
        },
        include: {
          source: true
        },
        distinct: ['sourceId']
      }),
      prisma.caseSource.findMany({
        where: {
          case: {
            candidateId: id
          }
        },
        include: {
          source: true
        },
        distinct: ['sourceId']
      })
    ])

    // Combine and deduplicate sources
    const sourceMap = new Map()
    
    for (const ps of promiseSources) {
      sourceMap.set(ps.source.id, ps.source)
    }
    for (const ws of workSources) {
      sourceMap.set(ws.source.id, ws.source)
    }
    for (const cs of caseSources) {
      sourceMap.set(cs.source.id, cs.source)
    }

    const sources = Array.from(sourceMap.values())

    return NextResponse.json({ sources })
  } catch (error) {
    console.error("Error fetching sources:", error)
    return NextResponse.json(
      { error: "Failed to fetch sources" },
      { status: 500 }
    )
  }
}
