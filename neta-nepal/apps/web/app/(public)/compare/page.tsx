"use client"

import { useState, useEffect } from "react"
import { X, Plus, Users, TrendingUp, Target, AlertTriangle, Briefcase, Scale, FileText } from "lucide-react"
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

  const getComparisonColor = (value: number, type: 'high' | 'low') => {
    if (type === 'high') {
      if (value >= 75) return 'bg-[#D1FAE5] text-[#059669]'
      if (value >= 50) return 'bg-[#FEF3C7] text-[#F59E0B]'
      return 'bg-[#FEE2E2] text-[#DC2626]'
    } else {
      if (value <= 25) return 'bg-[#D1FAE5] text-[#059669]'
      if (value <= 50) return 'bg-[#FEF3C7] text-[#F59E0B]'
      return 'bg-[#FEE2E2] text-[#DC2626]'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 pb-20 md:pb-12 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-3">
            Compare Candidates
          </h1>
          <p className="text-lg text-text-secondary font-sans">
            Select up to 3 candidates to compare side-by-side and make informed decisions
          </p>
        </div>

        {/* Candidate Selection Card */}
        <Card className="card card-lg mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-display font-bold text-text-primary">
              Selected Candidates ({selectedCandidates.length}/3)
            </h2>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            {selectedCandidates.map((candidate) => (
              <div 
                key={candidate.id} 
                className="flex items-center gap-3 bg-gradient-to-r from-background to-surface rounded-xl p-3 pr-4 shadow-md border border-default hover:shadow-lg transition-all"
              >
                <Avatar className="h-10 w-10 ring-2 ring-primary">
                  <AvatarImage src={candidate.photoUrl} alt={candidate.name} />
                  <AvatarFallback className="bg-primary text-white font-bold">
                    {candidate.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <span className="font-semibold text-text-primary block">{candidate.name}</span>
                  <span className="text-xs text-text-secondary">{candidate.party.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-error-light hover:text-error transition-colors"
                  onClick={() => removeCandidate(candidate.id)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ))}

            {selectedCandidates.length < 3 && (
              <div className="relative flex-1 min-w-[250px]">
                <Input
                  type="search"
                  placeholder="Search to add candidate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-base w-full font-sans"
                />
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-surface border-2 border-default rounded-xl shadow-xl z-10 max-h-80 overflow-auto">
                    {searchResults.map((candidate) => (
                      <button
                        key={candidate.id}
                        className="w-full flex items-center gap-4 p-4 hover:bg-background text-left transition-colors border-b border-border last:border-b-0"
                        onClick={() => addCandidate(candidate)}
                        disabled={selectedCandidates.some(c => c.id === candidate.id)}
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={candidate.photoUrl} alt={candidate.name} />
                          <AvatarFallback className="bg-accent text-white font-bold">
                            {candidate.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-bold text-text-primary">{candidate.name}</div>
                          <div className="text-sm text-text-secondary">
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
            <div className="text-center py-12">
              <Plus className="mx-auto h-20 w-20 mb-4 text-text-muted" />
              <p className="text-lg text-text-secondary font-sans font-medium">
                Search and select candidates to compare
              </p>
              <p className="text-sm text-text-muted mt-2">
                Use the search box above to find candidates
              </p>
            </div>
          )}
        </Card>

        {/* Comparison Table */}
        {selectedCandidates.length > 0 && (
          <div className="bg-surface rounded-xl shadow-lg border-2 border-default overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary to-primary-dark">
                  <tr>
                    <th className="text-left py-6 px-6 font-display font-bold text-white text-lg">
                      Attribute
                    </th>
                    {selectedCandidates.map((candidate) => (
                      <th key={candidate.id} className="text-center py-6 px-6 min-w-[220px]">
                        <div className="space-y-3">
                          <Avatar className="h-20 w-20 mx-auto ring-4 ring-white shadow-xl">
                            <AvatarImage src={candidate.photoUrl} alt={candidate.name} />
                            <AvatarFallback className="text-2xl font-bold bg-white text-primary">
                              {candidate.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-display font-bold text-white text-lg">
                            {candidate.name}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <ComparisonRow
                    label="Party"
                    icon={<Users className="h-5 w-5 text-accent" />}
                    values={selectedCandidates.map(c => c.party.name)}
                  />
                  <ComparisonRow
                    label="Constituency"
                    icon={<FileText className="h-5 w-5 text-accent" />}
                    values={selectedCandidates.map(c => c.constituency.name)}
                  />
                  <ComparisonRow
                    label="Age"
                    icon={<Users className="h-5 w-5 text-accent" />}
                    values={selectedCandidates.map(c => c.age ? `${c.age} years` : "N/A")}
                  />
                  <ComparisonRow
                    label="Years in Politics"
                    icon={<TrendingUp className="h-5 w-5 text-accent" />}
                    values={selectedCandidates.map(c => c.yearsInPolitics ? `${c.yearsInPolitics} years` : "N/A")}
                  />
                  
                  {/* Impact Score Row */}
                  <tr className="border-b border-border hover:bg-background transition-colors">
                    <td className="py-5 px-6 font-semibold text-text-primary bg-info-light/30">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-info" />
                        Impact Score
                      </div>
                    </td>
                    {selectedCandidates.map((candidate) => (
                      <td key={candidate.id} className="py-5 px-6 text-center">
                        <div className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold text-lg ${getComparisonColor(candidate.impactScore || 0, 'high')}`}>
                          {candidate.impactScore || 0}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Scandal Score Row */}
                  <tr className="border-b border-border hover:bg-background transition-colors">
                    <td className="py-5 px-6 font-semibold text-text-primary bg-error-light/30">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-error" />
                        Scandal Score
                      </div>
                    </td>
                    {selectedCandidates.map((candidate) => (
                      <td key={candidate.id} className="py-5 px-6 text-center">
                        <div className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold text-lg ${getComparisonColor(candidate.scandalScore || 0, 'low')}`}>
                          {candidate.scandalScore || 0}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Fulfillment Rate Row */}
                  <tr className="border-b border-border hover:bg-background transition-colors">
                    <td className="py-5 px-6 font-semibold text-text-primary bg-success-light/30">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-success" />
                        Fulfillment Rate
                      </div>
                    </td>
                    {selectedCandidates.map((candidate) => (
                      <td key={candidate.id} className="py-5 px-6 text-center">
                        <div className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold text-lg ${getComparisonColor(candidate.fulfillmentRate || 0, 'high')}`}>
                          {candidate.fulfillmentRate || 0}%
                        </div>
                      </td>
                    ))}
                  </tr>

                  <ComparisonRow
                    label="Promises Made"
                    icon={<Target className="h-5 w-5 text-accent" />}
                    values={selectedCandidates.map(c => String(c._count?.promises || 0))}
                  />
                  <ComparisonRow
                    label="Works Completed"
                    icon={<Briefcase className="h-5 w-5 text-accent" />}
                    values={selectedCandidates.map(c => String(c._count?.works || 0))}
                  />
                  <ComparisonRow
                    label="Legal Cases"
                    icon={<Scale className="h-5 w-5 text-accent" />}
                    values={selectedCandidates.map(c => String(c._count?.cases || 0))}
                  />
                  
                  {/* Actions Row */}
                  <tr className="bg-background">
                    <td className="py-6 px-6 font-semibold text-text-primary font-display text-lg">
                      Actions
                    </td>
                    {selectedCandidates.map((candidate) => (
                      <td key={candidate.id} className="py-6 px-6 text-center">
                        <Button 
                          className="btn-base btn-primary" 
                          asChild
                        >
                          <a href={`/candidates/${candidate.id}`}>View Full Profile</a>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedCandidates.length === 0 && (
          <Card className="card-lg text-center border-2 border-dashed border-default">
            <Users className="h-24 w-24 mx-auto mb-6 text-text-muted" />
            <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
              No Candidates Selected
            </h3>
            <p className="text-text-secondary font-sans text-lg">
              Start comparing by searching and selecting candidates above
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

function ComparisonRow({ 
  label, 
  icon, 
  values 
}: { 
  label: string
  icon?: React.ReactNode
  values: string[] 
}) {
  return (
    <tr className="border-b border-border hover:bg-background transition-colors">
      <td className="py-5 px-6 font-semibold text-text-primary">
        <div className="flex items-center gap-2">
          {icon}
          {label}
        </div>
      </td>
      {values.map((value, index) => (
        <td key={index} className="py-5 px-6 text-center text-text-secondary font-sans">
          {value}
        </td>
      ))}
    </tr>
  )
}
