"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CandidateCard } from "@/components/domain/CandidateCard"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
      <div className="mb-xl space-y-md bg-white p-xl rounded-2xl shadow-md">
        <div className="flex items-center gap-lg">
          <div className="p-md bg-primary rounded-xl shadow-md">
            <Search className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-primary">Search</h1>
            <p className="text-sm font-sans text-medium mt-xs">Discover candidates, parties, and constituencies</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <Search className={`h-5 w-5 ${query ? 'text-primary' : 'text-muted'}`} />
          </div>
          <Input
            type="search"
            placeholder="Search candidates, parties, constituencies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`h-14 pl-12 pr-12 text-base font-sans border-2 rounded-xl transition-fast bg-background ${
              query ? 'border-primary ring-2 ring-primary-light ring-opacity-20' : 'border-default'
            }`}
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
        <div className="flex gap-md mt-sm">
          {[{id: "candidates", label: "Candidates"}, {id: "parties", label: "Parties"}, {id: "constituencies", label: "Constituencies"}].map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-lg py-md font-sans font-semibold rounded-xl transition-fast border-2 ${
                  isActive 
                    ? 'bg-accent text-white border-accent shadow-md scale-105' 
                    : 'bg-background text-medium border-default hover:border-accent'
                }`}
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
          <div className="text-center py-2xl">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-background-dark border-t-primary"></div>
            <p className="mt-md text-lg font-sans font-medium text-medium">Searching...</p>
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <Card className="p-3xl text-center bg-white rounded-2xl shadow-lg">
            <Search className="mx-auto h-20 w-20 mb-md text-muted" />
            <p className="text-2xl font-display font-semibold text-dark mb-sm">
              No results found
            </p>
            <p className="text-base font-sans text-medium mb-xs">
              No matches for <strong className="text-primary font-semibold">"{query}"</strong>
            </p>
            <p className="text-sm font-sans text-muted mt-md">
              Try adjusting your search query or browse all candidates
            </p>
          </Card>
        )}

        {!loading && results.length > 0 && (
          <>
            <div className="px-sm py-md rounded-xl bg-background">
              <span className="text-lg font-sans font-semibold text-primary">{results.length}</span>
              <span className="font-sans font-semibold text-medium"> result{results.length !== 1 && "s"} found</span>
            </div>

            {selectedTab === "candidates" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {results.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            )}

            {selectedTab === "parties" && (
              <div className="space-y-md">
                {results.map((party: any) => (
                  <Card key={party.id} className="p-lg bg-white rounded-2xl shadow-md hover:shadow-lg transition-fast hover:-translate-y-1">
                    <div className="flex items-center gap-lg">
                      {party.symbolUrl && (
                        <div className="p-md rounded-xl bg-background">
                          <img
                            src={party.symbolUrl}
                            alt={party.name}
                            className="h-16 w-16 object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-bold text-dark mb-xs">{party.name}</h3>
                        {party.nameNepali && (
                          <p className="text-base font-sans text-medium">
                            {party.nameNepali}
                          </p>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        asChild
                        className="px-lg py-md rounded-xl font-sans font-semibold border-2 border-accent text-accent hover:bg-accent hover:text-white transition-fast hover:scale-105"
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
              <div className="space-y-md">
                {results.map((constituency: any) => (
                  <Card key={constituency.id} className="p-lg bg-white rounded-2xl shadow-md hover:shadow-lg transition-fast hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-bold text-dark mb-sm">
                          {constituency.name}
                        </h3>
                        <p className="text-base font-sans text-medium mb-md">
                          {constituency.district?.name}, {constituency.province?.name}
                        </p>
                        <Badge className="px-md py-xs rounded-full bg-info-light text-info font-sans font-medium">
                          {constituency.level}
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        asChild
                        className="px-lg py-md rounded-xl font-sans font-semibold border-2 border-accent text-accent hover:bg-accent hover:text-white transition-fast hover:scale-105"
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
          <Card className="p-3xl text-center bg-white rounded-2xl shadow-lg">
            <Search className="mx-auto h-20 w-20 mb-md text-muted" />
            <p className="text-2xl font-display font-semibold text-dark mb-sm">
              Start Your Search
            </p>
            <p className="text-base font-sans text-medium">
              Type in the search box to find candidates, parties, or constituencies
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
