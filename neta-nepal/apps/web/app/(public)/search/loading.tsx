import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchLoading() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <Skeleton className="h-10 w-48 mb-6" />
        
        {/* Search Input */}
        <Skeleton className="h-12 w-full mb-6" />
        
        {/* Category Tabs */}
        <div className="flex gap-4 mb-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        
        {/* Results */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
