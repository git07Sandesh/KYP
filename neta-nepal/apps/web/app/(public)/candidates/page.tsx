'use client'

import { useCandidates, useParties } from '@repo/shared-logic'
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function CandidatesPage() {
  const [filters, setFilters] = useState<any>({
    page: 1,
    limit: 20,
    sortBy: 'name' as const,
    order: 'asc' as const,
  })

  const { data, isLoading, error } = useCandidates(filters)
  const { data: partiesData } = useParties()

  if (isLoading) {
    return (
      <div className="container mx-auto px-base py-3xl">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-background-dark border-t-accent rounded-full animate-spin mx-auto mb-lg"></div>
            <p className="text-xl font-display font-semibold text-dark">Loading candidates...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-base py-3xl">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-error-light rounded-full flex items-center justify-center mx-auto mb-lg">
              <span className="text-3xl text-error">⚠</span>
            </div>
            <p className="text-2xl font-display font-bold text-error mb-sm">Error Loading Candidates</p>
            <p className="text-base font-sans text-medium">{error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  const candidates = data?.candidates || []
  const total = data?.total || 0
  const totalPages = data?.totalPages || 1

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-background-dark shadow-sm">
        <div className="container mx-auto px-base py-2xl">
          <h1 className="text-4xl font-display font-bold text-dark mb-md">Political Candidates</h1>
          <p className="text-lg font-sans text-medium">
            Browse verified information about <span className="font-semibold text-primary">{total}</span> candidates
          </p>
        </div>
      </header>

      <div className="container mx-auto px-base py-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2xl">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-background-dark">
              <div className="p-lg border-b border-background-dark">
                <h2 className="text-xl font-display font-semibold text-dark">Filters</h2>
              </div>
              <div className="p-lg space-y-lg">
                <div>
                  <label className="block text-sm font-sans font-semibold text-dark mb-sm">Sort By</label>
                  <select
                    className="w-full px-base py-md text-sm font-sans text-dark bg-white border-2 border-default rounded-lg cursor-pointer transition-fast hover:border-accent focus:border-accent focus:ring-2 focus:ring-accent-light focus:ring-opacity-20"
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        sortBy: e.target.value as any,
                        page: 1,
                      })
                    }
                  >
                    <option value="name">Name</option>
                    <option value="impactScore">Impact Score</option>
                    <option value="fulfillmentRate">Fulfillment Rate</option>
                    <option value="scandalScore">Scandal Score</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-sans font-semibold text-dark mb-sm">Order</label>
                  <select
                    className="w-full px-base py-md text-sm font-sans text-dark bg-white border-2 border-default rounded-lg cursor-pointer transition-fast hover:border-accent focus:border-accent focus:ring-2 focus:ring-accent-light focus:ring-opacity-20"
                    value={filters.order}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        order: e.target.value as any,
                        page: 1,
                      })
                    }
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>

                {partiesData && (partiesData as any).parties && (
                  <div>
                    <label className="block text-sm font-sans font-semibold text-dark mb-sm">Party</label>
                    <select
                      className="w-full px-base py-md text-sm font-sans text-dark bg-white border-2 border-default rounded-lg cursor-pointer transition-fast hover:border-accent focus:border-accent focus:ring-2 focus:ring-accent-light focus:ring-opacity-20"
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          partyId: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                          page: 1,
                        })
                      }
                    >
                      <option value="">All Parties</option>
                      {((partiesData as any).parties || []).map((party: any) => (
                        <option key={party.id} value={party.id}>
                          {party.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  className="w-full px-base py-md text-sm font-sans font-semibold text-accent bg-white border-2 border-accent rounded-lg transition-fast hover:bg-accent hover:text-white hover:scale-105"
                  onClick={() =>
                    setFilters({
                      page: 1,
                      limit: 20,
                      sortBy: 'name',
                      order: 'asc',
                    })
                  }
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Candidates Grid */}
          <main className="lg:col-span-3">
            <div className="mb-lg flex justify-between items-center">
              <p className="text-sm font-sans text-medium">
                Showing <span className="font-semibold text-dark">{(filters.page - 1) * filters.limit + 1}</span> to{' '}
                <span className="font-semibold text-dark">{Math.min(filters.page * filters.limit, total)}</span> of{' '}
                <span className="font-semibold text-primary">{total}</span> candidates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
              {candidates.map((candidate: any) => (
                <div
                  key={candidate.id}
                  className="bg-white rounded-xl shadow-md border border-background-dark transition-fast hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="p-xl">
                    <div className="flex gap-base">
                      <div className="h-20 w-20 shrink-0 border-2 border-background-dark rounded-full overflow-hidden bg-primary flex items-center justify-center">
                        {candidate.photoUrl ? (
                          <img
                            src={candidate.photoUrl}
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl font-display font-semibold text-white">
                            {candidate.name.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div className="flex-1">
                        <Link href={`/candidates/${candidate.id}`}>
                          <h3 className="text-xl font-display font-semibold text-dark hover:text-accent transition-fast leading-tight">
                            {candidate.name}
                          </h3>
                        </Link>

                        <p className="text-sm font-sans font-medium text-light mt-xs">
                          {candidate.party?.name}
                        </p>

                        <p className="text-xs font-sans text-muted mt-xs">
                          {candidate.constituency?.name},{' '}
                          {candidate.constituency?.province?.name}
                        </p>

                        <div className="flex gap-sm mt-md flex-wrap">
                          {candidate.isVerified && (
                            <span className="bg-success text-white px-md py-xs rounded text-xs font-sans font-semibold">
                              ✓ Verified
                            </span>
                          )}
                          {candidate.hasAllegations && (
                            <span className="bg-warning-light text-warning px-md py-xs rounded text-xs font-sans font-semibold">
                              ⚠ Allegations
                            </span>
                          )}
                          {candidate.hasCriminalCases && (
                            <span className="bg-error-light text-error px-md py-xs rounded text-xs font-sans font-semibold">
                              ⚖ Criminal Cases
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-md mt-base bg-background p-md rounded-lg text-center">
                          <div>
                            <p className="text-xs font-sans text-muted mb-xs">Impact</p>
                            <p className="text-base font-sans font-bold text-success">
                              {candidate.impactScore?.toFixed(1) || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-sans text-muted mb-xs">Fulfillment</p>
                            <p className="text-base font-sans font-bold text-info">
                              {candidate.fulfillmentRate?.toFixed(0) || 'N/A'}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-sans text-muted mb-xs">Scandal</p>
                            <p className="text-base font-sans font-bold text-error">
                              {candidate.scandalScore?.toFixed(1) || 'N/A'}
                            </p>
                          </div>
                        </div>

                        <Link href={`/candidates/${candidate.id}`}>
                          <button className="w-full mt-base px-base py-md text-sm font-sans font-semibold text-white bg-accent rounded-lg transition-fast hover:bg-accent-light hover:scale-105 shadow-sm">
                            View Full Profile →
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-sm mt-3xl">
                <button
                  disabled={filters.page === 1}
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page - 1 })
                  }
                  className="px-lg py-md text-sm font-sans font-semibold text-accent bg-white border-2 border-accent rounded-lg transition-fast hover:bg-accent hover:text-white disabled:bg-background-light disabled:text-muted disabled:border-background-dark disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center gap-sm">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - filters.page) <= 2
                    )
                    .map((page, index, array) => (
                      <>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span key={`ellipsis-${page}`} className="text-medium font-sans">...</span>
                        )}
                        <button
                          key={page}
                          onClick={() => setFilters({ ...filters, page })}
                          className={`px-base py-sm text-sm font-sans font-semibold rounded-lg transition-fast ${
                            filters.page === page
                              ? 'bg-accent text-white border-2 border-accent'
                              : 'bg-white text-accent border-2 border-accent hover:bg-accent hover:text-white'
                          }`}
                        >
                          {page}
                        </button>
                      </>
                    ))}
                </div>

                <button
                  disabled={filters.page === totalPages}
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page + 1 })
                  }
                  className="px-lg py-md text-sm font-sans font-semibold text-accent bg-white border-2 border-accent rounded-lg transition-fast hover:bg-accent hover:text-white disabled:bg-background-light disabled:text-muted disabled:border-background-dark disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
