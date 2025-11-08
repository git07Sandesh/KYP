"use client"

import { useState, useEffect } from "react"
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type RankingCategory = "TOP_IMPACT" | "CLEANEST_RECORDS" | "HIGHEST_FULFILLMENT" | "MOST_POPULAR"

interface RankingData {
  candidate: {
    id: string
    name: string
    photoUrl?: string
    party: { name: string }
    constituency: { name: string }
  }
  rank: number
  score: number
}

export default function RankingsPage() {
  const [selectedCategory, setSelectedCategory] = useState<RankingCategory>("TOP_IMPACT")
  const [rankings, setRankings] = useState<RankingData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRankings() {
      setLoading(true)
      try {
        const response = await fetch(`/api/rankings?category=${selectedCategory}`)
        const data = await response.json()
        setRankings(data.rankings || [])
      } catch (error) {
        console.error("Failed to fetch rankings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRankings()
  }, [selectedCategory])

  const getCategoryLabel = (category: RankingCategory) => {
    const labels = {
      TOP_IMPACT: "Top Impact",
      CLEANEST_RECORDS: "Cleanest Records",
      HIGHEST_FULFILLMENT: "Highest Fulfillment",
      MOST_POPULAR: "Most Popular"
    }
    return labels[category]
  }

  const getCategoryIcon = (category: RankingCategory) => {
    switch (category) {
      case "TOP_IMPACT":
        return <Trophy className="h-5 w-5" />
      case "CLEANEST_RECORDS":
        return <TrendingUp className="h-5 w-5" />
      case "HIGHEST_FULFILLMENT":
        return <TrendingUp className="h-5 w-5" />
      case "MOST_POPULAR":
        return <TrendingUp className="h-5 w-5" />
    }
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500 text-white"
    if (rank === 2) return "bg-gray-400 text-white"
    if (rank === 3) return "bg-amber-600 text-white"
    return "bg-secondary text-secondary-foreground"
  }

  return (
    <div className="container py-8 pb-20 md:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Rankings</h1>
        <p className="text-muted-foreground">
          Top-performing candidates across different categories
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(["TOP_IMPACT", "CLEANEST_RECORDS", "HIGHEST_FULFILLMENT", "MOST_POPULAR"] as RankingCategory[]).map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}
          >
            {getCategoryIcon(category)}
            <span className="ml-2">{getCategoryLabel(category)}</span>
          </Button>
        ))}
      </div>

      {/* Rankings List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-4 animate-pulse">
                <div className="h-12 w-12 rounded-full bg-secondary" />
                <div className="h-12 w-12 rounded-full bg-secondary" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-secondary rounded w-1/3" />
                  <div className="h-3 bg-secondary rounded w-1/2" />
                </div>
                <div className="h-8 w-20 bg-secondary rounded" />
              </div>
            </Card>
          ))}
        </div>
      ) : rankings.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-lg text-muted-foreground">
            No rankings available for this category
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {rankings.map((ranking, index) => (
            <Card key={ranking.candidate.id} className="p-4 hover:shadow-md transition-shadow">
              <Link href={`/candidates/${ranking.candidate.id}`} className="flex items-center gap-4">
                {/* Rank Badge */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${getRankBadgeColor(ranking.rank)}`}>
                  {ranking.rank}
                </div>

                {/* Candidate Photo */}
                <Avatar className="h-16 w-16">
                  <AvatarImage src={ranking.candidate.photoUrl} alt={ranking.candidate.name} />
                  <AvatarFallback className="text-lg">
                    {ranking.candidate.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {/* Candidate Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{ranking.candidate.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {ranking.candidate.party.name} • {ranking.candidate.constituency.name}
                  </p>
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className="text-2xl font-bold">{ranking.score.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">score</div>
                </div>

                {/* Trend Indicator (placeholder) */}
                <div className="hidden md:flex items-center text-muted-foreground">
                  {index === 0 ? (
                    <Minus className="h-5 w-5" />
                  ) : Math.random() > 0.5 ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
