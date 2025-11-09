/**
 * Alert Component - Design System
 * 
 * A reusable alert component following zero-tolerance design system rules.
 * 
 * Variants:
 * - success: bg-success-light border-success - For success messages
 * - warning: bg-warning-light border-warning - For warnings
 * - error: bg-error-light border-error - For errors
 * - info: bg-info-light border-info - For informational messages
 * 
 * Usage:
 * ```tsx
 * <Alert variant="success">
 *   Your changes have been saved successfully!
 * </Alert>
 * 
 * <Alert variant="error" title="Error">
 *   Please fix the errors before submitting.
 * </Alert>
 * ```
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info'
  title?: string
  icon?: React.ReactNode
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, icon, children, ...props }, ref) => {
    // Base styles
    const baseStyles = 'rounded-lg border-2 p-base'

    // Variant styles
    const variantStyles = {
      success: 'bg-success-light border-success',
      warning: 'bg-warning-light border-warning',
      error: 'bg-error-light border-error',
      info: 'bg-info-light border-info',
    }

    // Text color styles
    const textColorStyles = {
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      info: 'text-info',
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        <div className="flex items-start gap-md">
          {icon && <div className="shrink-0 mt-xs">{icon}</div>}
          <div className="flex-1">
            {title && (
              <h5 className={cn('text-sm font-sans font-bold mb-xs', textColorStyles[variant])}>
                {title}
              </h5>
            )}
            <div className={cn('text-sm font-sans font-medium', textColorStyles[variant])}>
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export { Alert }
