'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Admin panel error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-lg p-8">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <h2 className="text-xl font-bold mb-2">Admin Panel Error</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            {error.message || 'An error occurred in the admin panel.'}
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground mb-4">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <Button onClick={() => reset()} className="w-full">
            Try again
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/admin">Back to Dashboard</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
