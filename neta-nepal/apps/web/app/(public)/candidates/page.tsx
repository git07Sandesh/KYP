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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
              {candidates.map((candidate: any) => (
                <div
                  key={candidate.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 transition-fast hover:shadow-2xl"
                >
                  <div className="p-xl text-center">
                    {/* Profile Photo */}
                    <div className="relative inline-block mb-lg">
                      <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg mx-auto">
                        {candidate.photoUrl ? (
                          <img
                            src={candidate.photoUrl}
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-accent">
                            <span className="text-4xl font-display font-semibold text-white">
                              {candidate.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name and Title */}
                    <Link href={`/candidates/${candidate.id}`}>
                      <h3 className="text-2xl font-display font-bold text-accent hover:text-accent-light transition-fast mb-sm">
                        {candidate.name}
                      </h3>
                    </Link>
                    
                    <p className="text-base font-sans font-medium text-info mb-xs">
                      {candidate.party?.name || 'Independent'}
                    </p>

                    <p className="text-sm font-sans text-medium mb-lg">
                      {candidate.constituency?.name}, {candidate.constituency?.province?.name}
                    </p>

                    {/* Key Policy Stances / Scores */}
                    <div className="mb-lg">
                      <h4 className="text-base font-display font-semibold text-dark mb-base flex items-center justify-center gap-sm">
                        Key Performance Scores
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-base mb-base">
                        {/* Impact Score */}
                        <div className="flex flex-col items-center">
                          <div className="relative w-20 h-20">
                            <svg className="w-20 h-20 transform -rotate-90">
                              <circle
                                cx="40"
                                cy="40"
                                r="32"
                                stroke="#E5E7EB"
                                strokeWidth="8"
                                fill="none"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="32"
                                stroke="#003049"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 32}`}
                                strokeDashoffset={`${2 * Math.PI * 32 * (1 - (candidate.impactScore || 0) / 10)}`}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-lg font-display font-bold text-accent">
                                {candidate.impactScore ? `${Math.round((candidate.impactScore / 10) * 100)}%` : 'N/A'}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs font-sans font-medium text-medium mt-sm">Impact Score</p>
                        </div>

                        {/* Fulfillment Rate */}
                        <div className="flex flex-col items-center">
                          <div className="relative w-20 h-20">
                            <svg className="w-20 h-20 transform -rotate-90">
                              <circle
                                cx="40"
                                cy="40"
                                r="32"
                                stroke="#E5E7EB"
                                strokeWidth="8"
                                fill="none"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="32"
                                stroke="#003049"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 32}`}
                                strokeDashoffset={`${2 * Math.PI * 32 * (1 - (candidate.fulfillmentRate || 0) / 100)}`}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-lg font-display font-bold text-accent">
                                {candidate.fulfillmentRate ? `${Math.round(candidate.fulfillmentRate)}%` : 'N/A'}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs font-sans font-medium text-medium mt-sm">Fulfillment</p>
                        </div>
                      </div>

                      {/* Scandal Score (inverted - lower is better) */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20">
                          <svg className="w-20 h-20 transform -rotate-90">
                            <circle
                              cx="40"
                              cy="40"
                              r="32"
                              stroke="#E5E7EB"
                              strokeWidth="8"
                              fill="none"
                            />
                            <circle
                              cx="40"
                              cy="40"
                              r="32"
                              stroke="#003049"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 32}`}
                              strokeDashoffset={`${2 * Math.PI * 32 * (candidate.scandalScore ? (candidate.scandalScore / 10) : 1)}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-display font-bold text-accent">
                              {candidate.scandalScore ? `${(10 - candidate.scandalScore).toFixed(1)}` : '10'}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs font-sans font-medium text-medium mt-sm">Clean Record</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={`/candidates/${candidate.id}`} className="block mb-lg">
                      <button className="w-full px-xl py-md text-base font-sans font-semibold text-white bg-accent rounded-lg transition-fast hover:bg-accent-light shadow-md hover:shadow-lg">
                        Learn More
                      </button>
                    </Link>

                    {/* Social Media Links */}
                    <div className="flex justify-center gap-lg items-center border-t border-gray-200 pt-base">
                      {candidate.twitterHandle && (
                        <a
                          href={`https://twitter.com/${candidate.twitterHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-medium hover:text-info transition-fast"
                          title="Twitter"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                      )}
                      {candidate.facebookUrl && (
                        <a
                          href={candidate.facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-medium hover:text-info transition-fast"
                          title="Facebook"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </a>
                      )}
                      {candidate.instagramHandle && (
                        <a
                          href={`https://instagram.com/${candidate.instagramHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-medium hover:text-primary transition-fast"
                          title="Instagram"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                      )}
                      {candidate.websiteUrl && (
                        <a
                          href={candidate.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-medium hover:text-accent transition-fast"
                          title="Website"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z" />
                          </svg>
                        </a>
                      )}
                      {!candidate.twitterHandle && !candidate.facebookUrl && !candidate.instagramHandle && !candidate.websiteUrl && (
                        <span className="text-xs text-muted">No social links</span>
                      )}
                    </div>

                    {/* Status Badges */}
                    {(candidate.isVerified || candidate.hasAllegations || candidate.hasCriminalCases) && (
                      <div className="flex justify-center gap-base mt-sm">
                        {candidate.isVerified && (
                          <span className="text-success text-xs" title="Verified">✓ Verified</span>
                        )}
                        {candidate.hasAllegations && (
                          <span className="text-warning text-xs" title="Has Allegations">⚠ Allegations</span>
                        )}
                        {candidate.hasCriminalCases && (
                          <span className="text-error text-xs" title="Criminal Cases">⚖ Cases</span>
                        )}
                      </div>
                    )}
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
