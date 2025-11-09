/**
 * Table Component - Design System
 * 
 * A reusable table component following zero-tolerance design system rules.
 * Perfect for admin pages with consistent styling.
 * 
 * Features:
 * - Responsive with horizontal scroll
 * - Hover states on rows
 * - Proper header styling
 * - Empty state support
 * 
 * Usage:
 * ```tsx
 * <TableContainer>
 *   <Table>
 *     <TableHeader>
 *       <TableRow>
 *         <TableHead>Name</TableHead>
 *         <TableHead>Status</TableHead>
 *         <TableHead align="right">Actions</TableHead>
 *       </TableRow>
 *     </TableHeader>
 *     <TableBody>
 *       <TableRow>
 *         <TableCell>John Doe</TableCell>
 *         <TableCell><Badge variant="success">Active</Badge></TableCell>
 *         <TableCell align="right">...</TableCell>
 *       </TableRow>
 *     </TableBody>
 *   </Table>
 *   <TableEmpty icon={<Icon />}>No data found</TableEmpty>
 * </TableContainer>
 * ```
 */

import React from 'react'
import { cn } from '@/lib/utils'

const TableContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('bg-white rounded-xl shadow-md border border-background-dark overflow-hidden', className)}
      {...props}
    />
  )
)

TableContainer.displayName = 'TableContainer'

const TableScroll = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('overflow-x-auto', className)} {...props} />
  )
)

TableScroll.displayName = 'TableScroll'

const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table ref={ref} className={cn('w-full', className)} {...props} />
  )
)

Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn('bg-background border-b-2 border-background-dark', className)}
      {...props}
    />
  )
)

TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn('', className)} {...props} />
)

TableBody.displayName = 'TableBody'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('border-b border-background-dark last:border-0 hover:bg-background transition-fast', className)}
      {...props}
    />
  )
)

TableRow.displayName = 'TableRow'

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right'
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, align = 'left', ...props }, ref) => {
    const alignStyles = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }

    return (
      <th
        ref={ref}
        className={cn(
          'p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide',
          alignStyles[align],
          className
        )}
        {...props}
      />
    )
  }
)

TableHead.displayName = 'TableHead'

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right'
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = 'left', ...props }, ref) => {
    const alignStyles = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }

    return (
      <td
        ref={ref}
        className={cn('p-base text-sm font-sans text-dark', alignStyles[align], className)}
        {...props}
      />
    )
  }
)

TableCell.displayName = 'TableCell'

interface TableEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
}

const TableEmpty = React.forwardRef<HTMLDivElement, TableEmptyProps>(
  ({ className, icon, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-3xl text-center', className)} {...props}>
      {icon && (
        <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-lg">
          {icon}
        </div>
      )}
      <p className="text-base font-sans text-medium">{children}</p>
    </div>
  )
)

TableEmpty.displayName = 'TableEmpty'

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
}
