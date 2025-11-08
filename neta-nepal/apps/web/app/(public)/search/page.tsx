"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CandidateCard } from "@/components/domain/CandidateCard"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { colors, typography, spacing, shadows } from "@/lib/design-system"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState<"candidates" | "parties" | "constituencies">("candidates")

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${selectedTab}`)
        const data = await response.json()
        setResults(data.results || [])
      } catch (error) {
        console.error("Search failed:", error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, selectedTab])

  return (
    <div className="container max-w-4xl py-8 pb-20 md:pb-8">
      {/* Search Header */}
      <div className="mb-8 space-y-4 bg-white p-8 rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-linear-to-br from-primary to-primary-dark rounded-xl shadow-md">
            <Search className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold" style={{ color: colors.primary }}>Search</h1>
            <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>Discover candidates, parties, and constituencies</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <Search className="h-5 w-5" style={{ color: query ? colors.primary : colors.textMuted }} />
          </div>
          <Input
            type="search"
            placeholder="Search candidates, parties, constituencies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 pl-12 pr-12 text-base border-2 rounded-xl transition-all"
            style={{ 
              borderColor: query ? colors.primary : colors.border,
              backgroundColor: colors.background,
              boxShadow: query ? `0 0 0 3px ${colors.primaryLight}20` : 'none'
            }}
            autoFocus
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 mt-2">
          {[{id: "candidates", label: "Candidates"}, {id: "parties", label: "Parties"}, {id: "constituencies", label: "Constituencies"}].map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className="px-6 py-3 font-semibold rounded-xl transition-all duration-300 transform"
                style={{
                  backgroundColor: isActive ? colors.primary : colors.background,
                  color: isActive ? 'white' : colors.textSecondary,
                  boxShadow: isActive ? shadows.md : 'none',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  border: `2px solid ${isActive ? colors.primary : colors.border}`,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200" style={{ borderTopColor: colors.primary }}></div>
            <p className="mt-4 text-lg font-medium" style={{ color: colors.textSecondary }}>Searching...</p>
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <Card className="p-16 text-center bg-white rounded-2xl shadow-lg">
            <Search className="mx-auto h-20 w-20 mb-4" style={{ color: colors.border }} />
            <p className="text-2xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
              No results found
            </p>
            <p className="text-base mb-1" style={{ color: colors.textSecondary }}>
              No matches for <strong style={{ color: colors.primary }}>"{query}"</strong>
            </p>
            <p className="text-sm mt-3" style={{ color: colors.textMuted }}>
              Try adjusting your search query or browse all candidates
            </p>
          </Card>
        )}

        {!loading && results.length > 0 && (
          <>
            <div className="px-2 py-3 rounded-xl font-semibold" style={{ 
              color: colors.textSecondary,
              backgroundColor: colors.background 
            }}>
              <span style={{ color: colors.primary, fontSize: '1.125rem' }}>{results.length}</span> result{results.length !== 1 && "s"} found
            </div>

            {selectedTab === "candidates" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {results.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            )}

            {selectedTab === "parties" && (
              <div className="space-y-4">
                {results.map((party: any) => (
                  <Card key={party.id} className="p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center gap-6">
                      {party.symbolUrl && (
                        <div className="p-3 rounded-xl" style={{ backgroundColor: colors.background }}>
                          <img
                            src={party.symbolUrl}
                            alt={party.name}
                            className="h-16 w-16 object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-1" style={{ color: colors.textPrimary }}>{party.name}</h3>
                        {party.nameNepali && (
                          <p className="text-base" style={{ color: colors.textSecondary }}>
                            {party.nameNepali}
                          </p>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        asChild
                        className="px-6 rounded-xl font-semibold transition-all hover:scale-105"
                        style={{ 
                          borderColor: colors.primary, 
                          color: colors.primary,
                          borderWidth: '2px'
                        }}
                      >
                        <a href={`/candidates?party=${party.id}`}>
                          View Candidates
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {selectedTab === "constituencies" && (
              <div className="space-y-4">
                {results.map((constituency: any) => (
                  <Card key={constituency.id} className="p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-2" style={{ color: colors.textPrimary }}>
                          {constituency.name}
                        </h3>
                        <p className="text-base mb-3" style={{ color: colors.textSecondary }}>
                          {constituency.district?.name}, {constituency.province?.name}
                        </p>
                        <Badge 
                          className="px-3 py-1 rounded-full font-medium"
                          style={{ 
                            backgroundColor: colors.accentLight, 
                            color: colors.accent 
                          }}
                        >
                          {constituency.level}
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        asChild
                        className="px-6 rounded-xl font-semibold transition-all hover:scale-105"
                        style={{ 
                          borderColor: colors.primary, 
                          color: colors.primary,
                          borderWidth: '2px'
                        }}
                      >
                        <a href={`/candidates?constituency=${constituency.id}`}>
                          View Candidates
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {!query && (
          <Card className="p-16 text-center bg-white rounded-2xl shadow-lg">
            <Search className="mx-auto h-20 w-20 mb-4" style={{ color: colors.border }} />
            <p className="text-2xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
              Start Your Search
            </p>
            <p className="text-base" style={{ color: colors.textSecondary }}>
              Type in the search box to find candidates, parties, or constituencies
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
