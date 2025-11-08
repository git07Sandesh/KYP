import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"
import { z } from "zod"

const MAX_COMPARE_CANDIDATES = 3

const compareSchema = z.object({
  candidateIds: z.array(z.string()).min(2).max(MAX_COMPARE_CANDIDATES),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { candidateIds } = compareSchema.parse(body)

    const candidates = await prisma.candidate.findMany({
      where: {
        id: {
          in: candidateIds
        },
        status: "PUBLISHED"
      },
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
        promises: true,
        works: true,
        cases: true
      }
    })

    if (candidates.length !== candidateIds.length) {
      return NextResponse.json(
        { error: "One or more candidates not found or not published" },
        { status: 404 }
      )
    }

    // Calculate comparison metrics
    const metrics = candidates.map(candidate => ({
      candidateId: candidate.id,
      name: candidate.name,
      promiseStats: {
        total: candidate.promises.length,
        kept: candidate.promises.filter(p => p.status === "KEPT").length,
        inProgress: candidate.promises.filter(p => p.status === "IN_PROGRESS").length,
        broken: candidate.promises.filter(p => p.status === "BROKEN").length,
      },
      workStats: {
        total: candidate.works.length,
        highImpact: candidate.works.filter(w => w.impactLevel === "HIGH").length,
        mediumImpact: candidate.works.filter(w => w.impactLevel === "MEDIUM").length,
        lowImpact: candidate.works.filter(w => w.impactLevel === "LOW").length,
      },
      caseStats: {
        total: candidate.cases.length,
        active: candidate.cases.filter(c => 
          c.status !== "ACQUITTED" && 
          c.status !== "CLOSED" && 
          c.status !== "WITHDRAWN"
        ).length,
        convicted: candidate.cases.filter(c => c.status === "CONVICTED").length,
      },
      scores: {
        impact: candidate.impactScore || 0,
        scandal: candidate.scandalScore || 0,
        fulfillment: candidate.fulfillmentRate || 0,
      },
      experience: {
        yearsInPolitics: candidate.yearsInPolitics || 0,
        positionsHeld: candidate.posts.length,
      }
    }))

    return NextResponse.json({
      candidates,
      metrics
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request body", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error comparing candidates:", error)
    return NextResponse.json(
      { error: "Comparison failed" },
      { status: 500 }
    )
  }
}
