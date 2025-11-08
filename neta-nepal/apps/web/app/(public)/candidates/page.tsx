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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-lg">Loading candidates...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-lg text-red-600">Error loading candidates</p>
            <p className="text-sm text-gray-500 mt-2">{error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  const candidates = data?.candidates || []
  const total = data?.total || 0
  const totalPages = data?.totalPages || 1

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Political Candidates</h1>
          <p className="text-gray-600 mt-2">
            Browse verified information about {total} candidates
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Sort By</label>
                  <select
                    className="w-full mt-1 p-2 border rounded"
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
                  <label className="text-sm font-medium">Order</label>
                  <select
                    className="w-full mt-1 p-2 border rounded"
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
                    <label className="text-sm font-medium">Party</label>
                    <select
                      className="w-full mt-1 p-2 border rounded"
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

                <Button
                  variant="outline"
                  className="w-full"
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
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Candidates Grid */}
          <main className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {(filters.page - 1) * filters.limit + 1} to{' '}
                {Math.min(filters.page * filters.limit, total)} of {total}{' '}
                candidates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {candidates.map((candidate: any) => (
                <Card
                  key={candidate.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={candidate.photoUrl || undefined}
                          alt={candidate.name}
                        />
                        <AvatarFallback>
                          {candidate.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <Link href={`/candidates/${candidate.id}`}>
                          <h3 className="font-semibold text-lg hover:text-blue-600">
                            {candidate.name}
                          </h3>
                        </Link>

                        <p className="text-sm text-gray-600 mt-1">
                          {candidate.party?.name}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {candidate.constituency?.name},{' '}
                          {candidate.constituency?.province?.name}
                        </p>

                        <div className="flex gap-2 mt-3">
                          {candidate.isVerified && (
                            <Badge variant="default">Verified</Badge>
                          )}
                          {candidate.hasAllegations && (
                            <Badge variant="secondary">Allegations</Badge>
                          )}
                          {candidate.hasCriminalCases && (
                            <Badge variant="destructive">Criminal Cases</Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                          <div>
                            <p className="text-xs text-gray-500">Impact</p>
                            <p className="text-sm font-semibold">
                              {candidate.impactScore?.toFixed(1) || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Fulfillment</p>
                            <p className="text-sm font-semibold">
                              {candidate.fulfillmentRate?.toFixed(0) || 'N/A'}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Scandal</p>
                            <p className="text-sm font-semibold">
                              {candidate.scandalScore?.toFixed(1) || 'N/A'}
                            </p>
                          </div>
                        </div>

                        <Link href={`/candidates/${candidate.id}`}>
                          <Button className="w-full mt-4" size="sm">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  disabled={filters.page === 1}
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page - 1 })
                  }
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
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
                          <span key={`ellipsis-${page}`}>...</span>
                        )}
                        <Button
                          key={page}
                          variant={filters.page === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFilters({ ...filters, page })}
                        >
                          {page}
                        </Button>
                      </>
                    ))}
                </div>

                <Button
                  variant="outline"
                  disabled={filters.page === totalPages}
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page + 1 })
                  }
                >
                  Next
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
