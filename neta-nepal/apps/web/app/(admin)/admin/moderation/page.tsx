import { PrismaClient } from "@prisma/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CheckCircle, XCircle, Clock } from "lucide-react"

const prisma = new PrismaClient()

export default async function AdminModerationPage() {
  const queueItems = await prisma.moderationQueue.findMany({
    where: {
      status: "PENDING"
    },
    include: {
      reviewer: {
        select: {
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "APPROVED":
        return "bg-green-100 text-green-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      case "REQUIRES_CHANGES":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Moderation Queue</h1>
          <p className="text-muted-foreground mt-2">
            Review and moderate user submissions
          </p>
        </div>
        <div className="flex gap-4">
          <Badge variant="outline" className="px-4 py-2">
            {queueItems.length} Pending Review
          </Badge>
        </div>
      </div>

      {/* Queue List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Submitted By</th>
                <th className="p-4 font-semibold">Submitted</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Reviewed By</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queueItems.map((item) => (
                <tr key={item.id} className="border-b last:border-0 hover:bg-secondary/50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{item.entityType}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {item.entityId.substring(0, 12)}...
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      {item.submittedBy ? (
                        <div className="text-xs text-muted-foreground font-mono">
                          {item.submittedBy.substring(0, 12)}...
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Anonymous</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {item.reviewer ? (
                      <div>
                        {item.reviewer.name || item.reviewer.email}
                      </div>
                    ) : (
                      <span className="text-xs">Not reviewed</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {item.status === 'PENDING' && (
                        <>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/moderation/${item.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {queueItems.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No items in moderation queue</p>
          </div>
        )}
      </Card>
    </div>
  )
}
