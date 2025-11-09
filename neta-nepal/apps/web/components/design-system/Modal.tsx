import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Modal Component
 * 
 * A flexible modal/dialog component with backdrop, animations, and keyboard support.
 * Follows zero-tolerance design system rules.
 * 
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <ModalHeader>
 *     <ModalTitle>Confirmation</ModalTitle>
 *   </ModalHeader>
 *   <ModalBody>
 *     Are you sure you want to delete this item?
 *   </ModalBody>
 *   <ModalFooter>
 *     <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="error" onClick={handleDelete}>Delete</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 */

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is open */
  isOpen: boolean
  /** Callback when modal should close */
  onClose: () => void
  /** Size of the modal */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Whether to show close button */
  showCloseButton?: boolean
  /** Whether clicking backdrop closes modal */
  closeOnBackdropClick?: boolean
  /** Whether ESC key closes modal */
  closeOnEscape?: boolean
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-base',
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      size = 'md',
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Handle ESC key
    React.useEffect(() => {
      if (!isOpen || !closeOnEscape) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, closeOnEscape, onClose])

    // Prevent body scroll when modal is open
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }
      return () => {
        document.body.style.overflow = 'unset'
      }
    }, [isOpen])

    if (!isOpen) return null

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-dark bg-opacity-50 transition-opacity"
          onClick={closeOnBackdropClick ? onClose : undefined}
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          ref={ref}
          className={cn(
            'relative z-10 w-full bg-white rounded-xl shadow-2xl',
            'max-h-[90vh] overflow-hidden',
            'animate-in fade-in zoom-in-95 duration-200',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className={cn(
                'absolute top-base right-base z-10',
                'w-8 h-8 flex items-center justify-center',
                'text-medium hover:text-dark',
                'bg-background hover:bg-background-dark',
                'rounded-lg transition-fast',
                'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
              )}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {children}
        </div>
      </div>
    )
  }
)

Modal.displayName = 'Modal'

/**
 * ModalHeader Component
 * 
 * Container for modal title and optional description.
 */
export const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'px-xl py-lg border-b-2 border-background-dark',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

ModalHeader.displayName = 'ModalHeader'

/**
 * ModalTitle Component
 * 
 * Title for the modal.
 */
export const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        'text-2xl font-display font-semibold text-dark',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
})

ModalTitle.displayName = 'ModalTitle'

/**
 * ModalDescription Component
 * 
 * Description text for the modal.
 */
export const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm font-sans text-medium mt-sm', className)}
      {...props}
    >
      {children}
    </p>
  )
})

ModalDescription.displayName = 'ModalDescription'

/**
 * ModalBody Component
 * 
 * Main content area of the modal with scrolling support.
 */
export const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'px-xl py-lg overflow-y-auto',
        'max-h-[calc(90vh-200px)]', // Account for header and footer
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

ModalBody.displayName = 'ModalBody'

/**
 * ModalFooter Component
 * 
 * Footer area for modal actions (typically buttons).
 */
export const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'px-xl py-lg border-t-2 border-background-dark',
        'flex items-center justify-end gap-base',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

ModalFooter.displayName = 'ModalFooter'

export type { ModalProps }
