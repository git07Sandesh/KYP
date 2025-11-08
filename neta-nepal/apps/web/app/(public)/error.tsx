'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Public page error:', error)
  }, [error])

  return (
    <div className="container flex items-center justify-center min-h-[60vh] py-8">
      <Card className="w-full max-w-md p-8 text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
        <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          {error.message || 'We encountered an error while loading this page.'}
        </p>
        <div className="flex flex-col gap-3">
          <Button onClick={() => reset()} className="w-full">
            Try again
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
