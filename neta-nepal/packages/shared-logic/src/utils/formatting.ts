// Formatting utility functions

/**
 * Format date to Nepali-friendly format
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return 'N/A'
  
  const d = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

/**
 * Format date to short format (MMM DD, YYYY)
 */
export function formatDateShort(date: Date | string | null | undefined): string {
  if (!date) return 'N/A'
  
  const d = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

/**
 * Format score with appropriate icons and text
 */
export function formatScore(
  score: number,
  type: 'impact' | 'scandal' | 'fulfillment'
): string {
  const rounded = Math.round(score * 10) / 10

  switch (type) {
    case 'impact':
      return `${rounded}/10`
    case 'scandal':
      return `${rounded}/10`
    case 'fulfillment':
      return `${rounded}%`
    default:
      return `${rounded}`
  }
}

/**
 * Format currency in NPR
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (!amount && amount !== 0) return 'N/A'
  
  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(num: number | null | undefined): string {
  if (!num && num !== 0) return 'N/A'
  
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`
  }
  return num.toString()
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Format percentage
 */
export function formatPercentage(value: number | null | undefined): string {
  if (!value && value !== 0) return 'N/A'
  return `${Math.round(value)}%`
}

/**
 * Get relative time string (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string | null | undefined): string {
  if (!date) return 'N/A'
  
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInMs = now.getTime() - d.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  return `${Math.floor(diffInDays / 365)} years ago`
}
