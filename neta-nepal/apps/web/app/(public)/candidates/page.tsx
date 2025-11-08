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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'var(--color-white)', borderBottom: '1px solid var(--color-background-dark)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-bold" style={{ fontSize: '2rem', color: 'var(--color-text-dark)', marginBottom: '0.5rem' }}>Political Candidates</h1>
          <p style={{ color: 'var(--color-text-light)', fontSize: '1.125rem' }}>
            Browse verified information about <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{total}</span> candidates
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-background-dark)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--color-text-dark)', fontSize: '1.25rem', fontWeight: '600' }}>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="font-medium" style={{ fontSize: '0.875rem', color: 'var(--color-text-dark)', display: 'block', marginBottom: '0.5rem' }}>Sort By</label>
                  <select
                    className="w-full transition-all duration-200"
                    style={{
                      padding: '0.75rem',
                      border: '2px solid var(--color-background-dark)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-white)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-dark)',
                      cursor: 'pointer',
                    }}
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
                  <label className="font-medium" style={{ fontSize: '0.875rem', color: 'var(--color-text-dark)', display: 'block', marginBottom: '0.5rem' }}>Order</label>
                  <select
                    className="w-full transition-all duration-200"
                    style={{
                      padding: '0.75rem',
                      border: '2px solid var(--color-background-dark)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-white)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-dark)',
                      cursor: 'pointer',
                    }}
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
                    <label className="font-medium" style={{ fontSize: '0.875rem', color: 'var(--color-text-dark)', display: 'block', marginBottom: '0.5rem' }}>Party</label>
                    <select
                      className="w-full transition-all duration-200"
                      style={{
                        padding: '0.75rem',
                        border: '2px solid var(--color-background-dark)',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-white)',
                        fontSize: '0.875rem',
                        color: 'var(--color-text-dark)',
                        cursor: 'pointer',
                      }}
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
                  className="w-full font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    borderWidth: '2px',
                    borderColor: 'var(--color-accent)',
                    color: 'var(--color-accent)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem',
                  }}
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
                  className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--color-white)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--color-background-dark)',
                  }}
                >
                  <CardContent style={{ padding: '1.5rem' }}>
                    <div className="flex gap-4">
                      <Avatar className="h-20 w-20" style={{ border: '3px solid var(--color-background-dark)' }}>
                        <AvatarImage
                          src={candidate.photoUrl || undefined}
                          alt={candidate.name}
                        />
                        <AvatarFallback style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', fontSize: '1.5rem', fontWeight: '600' }}>
                          {candidate.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <Link href={`/candidates/${candidate.id}`}>
                          <h3 
                            className="font-semibold transition-colors duration-200"
                            style={{ 
                              fontSize: '1.125rem',
                              color: 'var(--color-text-dark)',
                              lineHeight: '1.4',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-dark)'}
                          >
                            {candidate.name}
                          </h3>
                        </Link>

                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', marginTop: '0.25rem', fontWeight: '500' }}>
                          {candidate.party?.name}
                        </p>

                        <p style={{ fontSize: '0.813rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                          {candidate.constituency?.name},{' '}
                          {candidate.constituency?.province?.name}
                        </p>

                        <div className="flex gap-2 mt-3 flex-wrap">
                          {candidate.isVerified && (
                            <Badge 
                              variant="default" 
                              style={{ 
                                backgroundColor: 'var(--color-success)', 
                                color: 'var(--color-white)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                              }}
                            >
                              ✓ Verified
                            </Badge>
                          )}
                          {candidate.hasAllegations && (
                            <Badge 
                              variant="secondary"
                              style={{ 
                                backgroundColor: 'var(--color-warning-light)', 
                                color: 'var(--color-warning)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                              }}
                            >
                              ⚠ Allegations
                            </Badge>
                          )}
                          {candidate.hasCriminalCases && (
                            <Badge 
                              variant="destructive"
                              style={{ 
                                backgroundColor: 'var(--color-error-light)', 
                                color: 'var(--color-error)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                              }}
                            >
                              ⚖ Criminal Cases
                            </Badge>
                          )}
                        </div>

                        <div 
                          className="grid grid-cols-3 gap-3 mt-4 text-center"
                          style={{
                            backgroundColor: 'var(--color-background)',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                          }}
                        >
                          <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Impact</p>
                            <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-success)' }}>
                              {candidate.impactScore?.toFixed(1) || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Fulfillment</p>
                            <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-accent)' }}>
                              {candidate.fulfillmentRate?.toFixed(0) || 'N/A'}%
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Scandal</p>
                            <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-error)' }}>
                              {candidate.scandalScore?.toFixed(1) || 'N/A'}
                            </p>
                          </div>
                        </div>

                        <Link href={`/candidates/${candidate.id}`}>
                          <Button 
                            className="w-full mt-4 font-semibold transition-all duration-200 hover:scale-105" 
                            size="sm"
                            style={{
                              backgroundColor: 'var(--color-primary)',
                              color: 'var(--color-white)',
                              borderRadius: 'var(--radius-md)',
                              padding: '0.625rem',
                              fontSize: '0.875rem',
                            }}
                          >
                            View Full Profile →
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
