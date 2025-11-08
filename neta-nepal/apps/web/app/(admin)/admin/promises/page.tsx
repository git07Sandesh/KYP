import { PrismaClient } from "@prisma/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Eye } from "lucide-react"

const prisma = new PrismaClient()

export default async function AdminPromisesPage() {
  const promises = await prisma.promise.findMany({
    include: {
      candidate: {
        select: {
          id: true,
          name: true,
          nameNepali: true,
          party: {
            select: { name: true }
          }
        }
      },
      sources: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const getFulfillmentColor = (status: string) => {
    switch (status) {
      case "KEPT":
        return "bg-green-100 text-green-800"
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800"
      case "BROKEN":
        return "bg-red-100 text-red-800"
      case "PARTIALLY_FULFILLED":
        return "bg-yellow-100 text-yellow-800"
      case "NO_EVIDENCE":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Promises</h1>
          <p className="text-muted-foreground mt-2">
            Manage all candidate promises and track fulfillment
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/promises/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Promise
          </Link>
        </Button>
      </div>

      {/* Promises List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-4 font-semibold">Promise</th>
                <th className="p-4 font-semibold">Candidate</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Sources</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promises.map((promise) => (
                <tr key={promise.id} className="border-b last:border-0 hover:bg-secondary/50">
                  <td className="p-4">
                    <div className="max-w-md">
                      <div className="font-medium line-clamp-2">{promise.text}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {promise.category} • {promise.type}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      {promise.candidate.name}
                      <div className="text-xs text-muted-foreground">
                        {promise.candidate.party.name}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {promise.announcedDate ? new Date(promise.announcedDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4">
                    <Badge className={getFulfillmentColor(promise.status)}>
                      {promise.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {promise.sources.length > 0 ? (
                        <Badge variant="outline" className="text-xs">
                          {promise.sources.length} source{promise.sources.length > 1 ? 's' : ''}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">No sources</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/candidates/${promise.candidate.id}?tab=promises`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/promises/${promise.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {promises.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            No promises found. Add your first promise to get started.
          </div>
        )}
      </Card>
    </div>
  )
}
