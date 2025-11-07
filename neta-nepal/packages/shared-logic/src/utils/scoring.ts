// Scoring utility functions (placeholder implementations)

import type { Work, Case, Promise, ImpactLevel } from '@repo/database'

/**
 * Calculate impact score based on works completed
 * High impact = 10 points, Medium = 5, Low = 2
 * Divided by years in politics for normalization
 */
export function calculateImpactScore(works: Work[], yearsInPolitics: number): number {
  if (!works || works.length === 0 || !yearsInPolitics || yearsInPolitics === 0) {
    return 0
  }

  const totalPoints = works.reduce((sum, work) => {
    const points: Record<ImpactLevel, number> = {
      HIGH: 10,
      MEDIUM: 5,
      LOW: 2,
    }
    return sum + (points[work.impactLevel] || 0)
  }, 0)

  // Normalize by years in politics (cap at 10)
  const score = Math.min((totalPoints / yearsInPolitics) * 2, 10)
  return Math.round(score * 10) / 10
}

/**
 * Calculate scandal score based on legal cases
 * Weighted by severity (1-5 scale)
 */
export function calculateScandalScore(cases: Case[]): number {
  if (!cases || cases.length === 0) {
    return 0
  }

  const totalSeverity = cases.reduce((sum, c) => sum + c.severity, 0)
  const avgSeverity = totalSeverity / cases.length

  // Scale to 0-10 where 10 is worst
  return Math.round(avgSeverity * 2 * 10) / 10
}

/**
 * Calculate promise fulfillment rate
 * (Kept + Partially Fulfilled * 0.5) / Total * 100
 */
export function calculateFulfillmentRate(promises: Promise[]): number {
  if (!promises || promises.length === 0) {
    return 0
  }

  const kept = promises.filter((p) => p.status === 'KEPT').length
  const partial = promises.filter((p) => p.status === 'PARTIALLY_FULFILLED').length

  const rate = ((kept + partial * 0.5) / promises.length) * 100
  return Math.round(rate * 10) / 10
}

/**
 * Get badge color for impact score
 */
export function getImpactScoreColor(score: number): string {
  if (score >= 8) return 'green'
  if (score >= 5) return 'blue'
  if (score >= 3) return 'yellow'
  return 'gray'
}

/**
 * Get badge color for scandal score (inverted - lower is better)
 */
export function getScandalScoreColor(score: number): string {
  if (score >= 7) return 'red'
  if (score >= 4) return 'yellow'
  if (score >= 2) return 'blue'
  return 'green'
}

/**
 * Get badge color for fulfillment rate
 */
export function getFulfillmentRateColor(rate: number): string {
  if (rate >= 75) return 'green'
  if (rate >= 50) return 'blue'
  if (rate >= 25) return 'yellow'
  return 'red'
}
