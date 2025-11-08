import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CandidateProfileLoading() {
  return (
    <div className="container py-8">
      {/* Header */}
      <Card className="p-8 mb-6">
        <div className="flex items-start gap-6">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <div className="flex gap-3 mt-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="mb-6 flex gap-4 border-b">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-24" />
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-6 w-48 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </Card>
        ))}
      </div>
    </div>
  )
}
