/**
 * Button Component - Design System
 * 
 * A reusable button component following zero-tolerance design system rules.
 * 
 * Variants:
 * - primary: bg-primary (red) - For brand emphasis and main CTAs
 * - accent: bg-accent (blue) - For secondary CTAs and important actions
 * - secondary: bg-white with border - For secondary actions
 * - outline: transparent with border - For outlined buttons
 * - info: bg-info - For informational actions
 * - success: bg-success - For positive/success actions
 * - warning: bg-warning - For caution actions
 * - error: bg-error - For destructive/error actions
 * - ghost: transparent - For subtle actions
 * 
 * Sizes:
 * - sm: Small button (h-8, px-md, py-sm, text-xs)
 * - md: Medium button (h-10, px-lg, py-md, text-sm) - DEFAULT
 * - lg: Large button (h-12, px-xl, py-lg, text-base)
 * 
 * Usage:
 * ```tsx
 * <Button variant="accent" size="lg">Primary Action</Button>
 * <Button variant="secondary" size="md">Secondary Action</Button>
 * <Button variant="ghost" size="sm" icon={<Icon />}>With Icon</Button>
 * ```
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'outline' | 'info' | 'success' | 'warning' | 'error' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'accent',
      size = 'md',
      icon,
      iconPosition = 'left',
      fullWidth = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles - always applied
    const baseStyles = 'inline-flex items-center justify-center gap-sm font-sans font-semibold rounded-lg transition-fast focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

    // Variant styles
    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-sm hover:shadow-md',
      accent: 'bg-accent text-white hover:bg-accent-light focus:ring-accent shadow-sm hover:shadow-md',
      secondary: 'bg-white text-accent border-2 border-accent hover:bg-accent hover:text-white focus:ring-accent',
      outline: 'bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-white focus:ring-accent',
      info: 'bg-info text-white hover:bg-info-dark focus:ring-info shadow-sm hover:shadow-md',
      success: 'bg-success text-white hover:bg-success-dark focus:ring-success shadow-sm hover:shadow-md',
      warning: 'bg-warning text-white hover:bg-warning-dark focus:ring-warning shadow-sm hover:shadow-md',
      error: 'bg-error text-white hover:bg-error-dark focus:ring-error shadow-sm hover:shadow-md',
      ghost: 'bg-transparent text-accent hover:bg-background focus:ring-accent',
    }

    // Size styles
    const sizeStyles = {
      sm: 'h-8 px-md py-sm text-xs',
      md: 'h-10 px-lg py-md text-sm',
      lg: 'h-12 px-xl py-lg text-base',
    }

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : ''

    // Loading spinner (only for non-ghost variants)
    const spinner = loading && variant !== 'ghost' && (
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    )

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            {spinner}
            {children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
