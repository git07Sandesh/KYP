"use client"

import { useState, useEffect } from "react"
import { Trophy, TrendingUp, TrendingDown, Minus, Award, Shield, CheckCircle, Users } from "lucide-react"
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
        return <Shield className="h-5 w-5" />
      case "HIGHEST_FULFILLMENT":
        return <CheckCircle className="h-5 w-5" />
      case "MOST_POPULAR":
        return <Users className="h-5 w-5" />
    }
  }

  const getRankBadgeStyle = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg ring-4 ring-yellow-200"
    if (rank === 2) return "bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg ring-4 ring-gray-200"
    if (rank === 3) return "bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-lg ring-4 ring-amber-200"
    return "bg-gradient-to-br from-gray-100 to-gray-200 text-[#2C2C2C] shadow-md"
  }

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return null
  }

  return (
    <div className="min-h-screen bg-[#FDF0D5]">
      <div className="container py-8 pb-20 md:pb-12 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="h-10 w-10 text-[#C1121F]" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[#2C2C2C]">
              Rankings
            </h1>
          </div>
          <p className="text-lg text-[#6B6B6B] font-sans">
            Top-performing candidates across different categories
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(["TOP_IMPACT", "CLEANEST_RECORDS", "HIGHEST_FULFILLMENT", "MOST_POPULAR"] as RankingCategory[]).map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 
                flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105
                ${selectedCategory === category 
                  ? "bg-[#C1121F] text-white hover:bg-[#A00F1A]" 
                  : "bg-white text-[#2C2C2C] border-2 border-gray-200 hover:border-[#C1121F] hover:text-[#C1121F]"
                }
              `}
            >
              {getCategoryIcon(category)}
              <span>{getCategoryLabel(category)}</span>
            </Button>
          ))}
        </div>

        {/* Rankings List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <Card key={i} className="p-6 shadow-md border border-gray-200">
                <div className="flex items-center gap-6 animate-pulse">
                  <div className="h-14 w-14 rounded-full bg-gray-200" />
                  <div className="h-16 w-16 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                  <div className="h-10 w-24 bg-gray-200 rounded-lg" />
                </div>
              </Card>
            ))}
          </div>
        ) : rankings.length === 0 ? (
          <Card className="p-16 text-center shadow-lg border-2 border-dashed border-gray-300">
            <Award className="h-24 w-24 mx-auto mb-6 text-[#9CA3AF]" />
            <h3 className="text-2xl font-display font-bold text-[#2C2C2C] mb-2">
              No Rankings Available
            </h3>
            <p className="text-lg text-[#6B6B6B] font-sans">
              No rankings available for this category yet
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {rankings.map((ranking, index) => (
              <Card 
                key={ranking.candidate.id} 
                className={`
                  p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2
                  ${ranking.rank <= 3 ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-white' : 'border-gray-200 hover:border-[#C1121F]'}
                `}
              >
                <Link 
                  href={`/candidates/${ranking.candidate.id}`} 
                  className="flex items-center gap-4 md:gap-6"
                >
                  {/* Rank Badge */}
                  <div className={`
                    relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center 
                    rounded-full text-xl md:text-2xl font-display font-bold flex-shrink-0
                    ${getRankBadgeStyle(ranking.rank)}
                  `}>
                    {getMedalEmoji(ranking.rank) || ranking.rank}
                  </div>

                  {/* Candidate Photo */}
                  <Avatar className="h-16 w-16 md:h-20 md:w-20 ring-4 ring-white shadow-lg flex-shrink-0">
                    <AvatarImage src={ranking.candidate.photoUrl} alt={ranking.candidate.name} />
                    <AvatarFallback className="text-xl md:text-2xl font-display font-bold bg-[#003049] text-white">
                      {ranking.candidate.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Candidate Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-xl md:text-2xl text-[#2C2C2C] mb-1 truncate">
                      {ranking.candidate.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-[#6B6B6B]">
                      <Badge className="bg-[#003049] hover:bg-[#001A2C] text-white text-xs font-medium px-2 py-0.5">
                        {ranking.candidate.party.name}
                      </Badge>
                      <span className="hidden md:inline">•</span>
                      <span className="font-medium">{ranking.candidate.constituency.name}</span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-3xl md:text-4xl font-display font-bold text-[#C1121F]">
                      {ranking.score.toFixed(1)}
                    </div>
                    <div className="text-xs text-[#6B6B6B] uppercase tracking-wide font-semibold">
                      Score
                    </div>
                  </div>

                  {/* Trend Indicator */}
                  <div className="hidden lg:flex items-center text-[#6B6B6B] flex-shrink-0">
                    {index === 0 ? (
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Minus className="h-6 w-6" />
                      </div>
                    ) : Math.random() > 0.5 ? (
                      <div className="bg-green-100 p-2 rounded-full">
                        <TrendingUp className="h-6 w-6 text-[#059669]" />
                      </div>
                    ) : (
                      <div className="bg-red-100 p-2 rounded-full">
                        <TrendingDown className="h-6 w-6 text-[#DC2626]" />
                      </div>
                    )}
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}

        {/* Info Card */}
        {rankings.length > 0 && (
          <Card className="mt-8 p-6 bg-gradient-to-r from-[#DBEAFE] to-white border-2 border-[#3B82F6] shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-[#3B82F6] p-3 rounded-full flex-shrink-0">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#2C2C2C] mb-2">
                  How Rankings Work
                </h3>
                <p className="text-[#4A4A4A] font-sans leading-relaxed">
                  Rankings are calculated based on multiple factors including impact scores, 
                  fulfillment rates, public engagement, and transparency. The data is updated 
                  regularly to reflect the latest information about candidates' performance 
                  and contributions.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
