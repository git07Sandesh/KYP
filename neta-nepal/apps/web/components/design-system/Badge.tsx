/**
 * Badge Component - Design System
 * 
 * A reusable badge component following zero-tolerance design system rules.
 * 
 * Variants:
 * - success: bg-success-light text-success - For positive states (7.0+, KEPT, PUBLISHED)
 * - warning: bg-warning-light text-warning - For caution states (4.0-6.9, IN_PROGRESS, PENDING)
 * - error: bg-error-light text-error - For negative states (<4.0, BROKEN, REJECTED)
 * - info: bg-info-light text-info - For neutral/informational states
 * - primary: bg-primary-light text-primary - For brand emphasis
 * - accent: bg-accent-light text-accent - For highlights
 * - default: bg-background-dark text-medium - For generic states
 * 
 * Sizes:
 * - sm: px-sm py-xs text-xs
 * - md: px-md py-xs text-xs - DEFAULT
 * - lg: px-lg py-sm text-sm
 * 
 * Usage:
 * ```tsx
 * <Badge variant="success">✓ Verified</Badge>
 * <Badge variant="warning">⚠ Pending Review</Badge>
 * <Badge variant="error">✗ Failed</Badge>
 * <Badge size="lg">Large Badge</Badge>
 * ```
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'accent' | 'default'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center font-sans font-semibold rounded whitespace-nowrap'

    // Variant styles
    const variantStyles = {
      success: 'bg-success-light text-success',
      warning: 'bg-warning-light text-warning',
      error: 'bg-error-light text-error',
      info: 'bg-info-light text-info',
      primary: 'bg-primary-light text-primary',
      accent: 'bg-accent-light text-accent',
      default: 'bg-background-dark text-medium',
    }

    // Size styles
    const sizeStyles = {
      sm: 'px-sm py-xs text-xs',
      md: 'px-md py-xs text-xs',
      lg: 'px-lg py-sm text-sm',
    }

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
