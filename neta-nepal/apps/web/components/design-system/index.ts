/**
 * Design System Components
 * 
 * Centralized export for all design system components.
 * All components follow zero-tolerance design system rules:
 * - NO hex colors
 * - NO arbitrary Tailwind values
 * - NO inline styles
 * - Proper color semantics (primary=red brand, accent=blue CTAs)
 * - Typography hierarchy (font-display for headings, font-sans for body)
 * - Text colors (text-dark/medium/light/muted)
 */

// Core Components
export { Button } from './Button'
export type { ButtonProps } from './Button'

export { Badge } from './Badge'
export type { BadgeProps } from './Badge'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card'
export type { CardProps } from './Card'

export { Input, Label, InputGroup } from './Input'
export type { InputProps } from './Input'

export {
  TableContainer,
  TableScroll,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
} from './Table'

export { Alert } from './Alert'
export type { AlertProps } from './Alert'

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from './Modal'
export type { ModalProps } from './Modal'
