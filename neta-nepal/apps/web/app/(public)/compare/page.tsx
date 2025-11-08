"use client"

import { useState, useEffect } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScoreBadge } from "@/components/domain/ScoreBadge"

interface Candidate {
  id: string
  name: string
  photoUrl?: string
  party: { name: string }
  constituency: { name: string }
  age?: number
  yearsInPolitics?: number
  impactScore?: number
  scandalScore?: number
  fulfillmentRate?: number
  _count?: {
    promises: number
    works: number
    cases: number
  }
}

export default function ComparePage() {
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&type=candidates`)
        const data = await response.json()
        setSearchResults(data.results || [])
      } catch (error) {
        console.error("Search failed:", error)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const addCandidate = (candidate: Candidate) => {
    if (selectedCandidates.length < 3 && !selectedCandidates.find(c => c.id === candidate.id)) {
      setSelectedCandidates([...selectedCandidates, candidate])
      setSearchQuery("")
      setSearchResults([])
    }
  }

  const removeCandidate = (id: string) => {
    setSelectedCandidates(selectedCandidates.filter(c => c.id !== id))
  }

  return (
    <div className="container py-8 pb-20 md:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Compare Candidates</h1>
        <p className="text-muted-foreground">
          Select up to 3 candidates to compare side-by-side
        </p>
      </div>

      {/* Candidate Selection */}
      <Card className="p-6 mb-8">
        <div className="flex flex-wrap gap-4 mb-4">
          {selectedCandidates.map((candidate) => (
            <div key={candidate.id} className="flex items-center gap-2 bg-secondary rounded-lg p-2 pr-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={candidate.photoUrl} alt={candidate.name} />
                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{candidate.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-2"
                onClick={() => removeCandidate(candidate.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {selectedCandidates.length < 3 && (
            <div className="relative flex-1 min-w-[200px]">
              <Input
                type="search"
                placeholder="Search to add candidate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                  {searchResults.map((candidate) => (
                    <button
                      key={candidate.id}
                      className="w-full flex items-center gap-3 p-3 hover:bg-secondary text-left"
                      onClick={() => addCandidate(candidate)}
                      disabled={selectedCandidates.some(c => c.id === candidate.id)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={candidate.photoUrl} alt={candidate.name} />
                        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {candidate.party.name} • {candidate.constituency.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {selectedCandidates.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Plus className="mx-auto h-12 w-12 mb-2" />
            <p>Search and select candidates to compare</p>
          </div>
        )}
      </Card>

      {/* Comparison Table */}
      {selectedCandidates.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-semibold">Attribute</th>
                {selectedCandidates.map((candidate) => (
                  <th key={candidate.id} className="text-center py-4 px-4 min-w-[200px]">
                    <div className="space-y-2">
                      <Avatar className="h-16 w-16 mx-auto">
                        <AvatarImage src={candidate.photoUrl} alt={candidate.name} />
                        <AvatarFallback className="text-lg">{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-semibold">{candidate.name}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <ComparisonRow
                label="Party"
                values={selectedCandidates.map(c => c.party.name)}
              />
              <ComparisonRow
                label="Constituency"
                values={selectedCandidates.map(c => c.constituency.name)}
              />
              <ComparisonRow
                label="Age"
                values={selectedCandidates.map(c => c.age ? `${c.age} years` : "N/A")}
              />
              <ComparisonRow
                label="Years in Politics"
                values={selectedCandidates.map(c => c.yearsInPolitics ? `${c.yearsInPolitics} years` : "N/A")}
              />
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">Impact Score</td>
                {selectedCandidates.map((candidate) => (
                  <td key={candidate.id} className="py-4 px-4 text-center">
                    <ScoreBadge type="impact" value={candidate.impactScore || 0} />
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">Scandal Score</td>
                {selectedCandidates.map((candidate) => (
                  <td key={candidate.id} className="py-4 px-4 text-center">
                    <ScoreBadge type="scandal" value={candidate.scandalScore || 0} />
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">Fulfillment Rate</td>
                {selectedCandidates.map((candidate) => (
                  <td key={candidate.id} className="py-4 px-4 text-center">
                    <ScoreBadge type="fulfillment" value={candidate.fulfillmentRate || 0} />
                  </td>
                ))}
              </tr>
              <ComparisonRow
                label="Promises Made"
                values={selectedCandidates.map(c => String(c._count?.promises || 0))}
              />
              <ComparisonRow
                label="Works Completed"
                values={selectedCandidates.map(c => String(c._count?.works || 0))}
              />
              <ComparisonRow
                label="Legal Cases"
                values={selectedCandidates.map(c => String(c._count?.cases || 0))}
              />
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">Actions</td>
                {selectedCandidates.map((candidate) => (
                  <td key={candidate.id} className="py-4 px-4 text-center">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/candidates/${candidate.id}`}>View Profile</a>
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function ComparisonRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr className="border-b">
      <td className="py-4 px-4 font-medium">{label}</td>
      {values.map((value, index) => (
        <td key={index} className="py-4 px-4 text-center">
          {value}
        </td>
      ))}
    </tr>
  )
}
