/**
 * Input Component - Design System
 * 
 * A reusable input component following zero-tolerance design system rules.
 * 
 * States:
 * - default: Normal input state
 * - focus: border-accent with ring
 * - error: border-error with error message
 * - disabled: bg-background with reduced opacity
 * 
 * Usage:
 * ```tsx
 * <Input
 *   type="text"
 *   placeholder="Enter text"
 *   error="This field is required"
 * />
 * 
 * <InputGroup>
 *   <Label htmlFor="email">Email</Label>
 *   <Input id="email" type="email" required />
 * </InputGroup>
 * ```
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, disabled, ...props }, ref) => {
    // Base styles
    const baseStyles = 'w-full px-base py-md text-base font-sans text-dark bg-white border-2 rounded-lg transition-fast placeholder:text-muted'

    // State styles
    const stateStyles = error
      ? 'border-error focus:border-error focus:ring-2 focus:ring-error-light focus:ring-opacity-20'
      : 'border-default focus:border-accent focus:ring-2 focus:ring-accent-light focus:ring-opacity-20'

    // Disabled styles
    const disabledStyles = disabled
      ? 'bg-background text-muted cursor-not-allowed opacity-60'
      : ''

    return (
      <div className="w-full">
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={cn(baseStyles, stateStyles, disabledStyles, className)}
          {...props}
        />
        {error && (
          <p className="mt-sm text-xs font-sans font-medium text-error">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('block text-sm font-sans font-semibold text-dark mb-sm', className)}
      {...props}
    />
  )
)

Label.displayName = 'Label'

const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-xs', className)} {...props} />
  )
)

InputGroup.displayName = 'InputGroup'

export { Input, Label, InputGroup }
