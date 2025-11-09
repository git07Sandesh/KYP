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
        return "bg-warning-light text-warning"
      case "APPROVED":
        return "bg-success-light text-success"
      case "REJECTED":
        return "bg-error-light text-error"
      case "REQUIRES_CHANGES":
        return "bg-warning-light text-warning"
      default:
        return "bg-background-dark text-medium"
    }
  }

  return (
    <div className="space-y-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-dark">Moderation Queue</h1>
          <p className="text-base font-sans text-medium mt-sm">
            Review and moderate user submissions
          </p>
        </div>
        <div className="flex gap-base">
          <span className="px-lg py-md bg-warning-light text-warning font-sans font-semibold rounded-lg border-2 border-warning">
            {queueItems.length} Pending Review
          </span>
        </div>
      </div>

      {/* Queue List */}
      <div className="bg-white rounded-xl shadow-md border border-background-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b-2 border-background-dark">
              <tr className="text-left">
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Type</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Submitted By</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Submitted</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Status</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Reviewed By</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queueItems.map((item) => (
                <tr key={item.id} className="border-b border-background-dark last:border-0 hover:bg-background transition-fast">
                  <td className="p-base">
                    <div>
                      <div className="text-sm font-sans font-semibold text-dark">{item.entityType}</div>
                      <div className="text-xs font-mono text-muted">
                        {item.entityId.substring(0, 12)}...
                      </div>
                    </div>
                  </td>
                  <td className="p-base">
                    <div className="text-sm font-sans">
                      {item.submittedBy ? (
                        <div className="text-xs font-mono text-medium">
                          {item.submittedBy.substring(0, 12)}...
                        </div>
                      ) : (
                        <span className="text-muted">Anonymous</span>
                      )}
                    </div>
                  </td>
                  <td className="p-base text-sm font-sans text-medium">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="p-base">
                    <span className={`px-md py-xs rounded text-xs font-sans font-semibold ${getStatusColor(item.status)}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-base text-sm font-sans text-medium">
                    {item.reviewer ? (
                      <div>
                        {item.reviewer.name || item.reviewer.email}
                      </div>
                    ) : (
                      <span className="text-xs text-muted">Not reviewed</span>
                    )}
                  </td>
                  <td className="p-base">
                    <div className="flex items-center justify-end gap-sm">
                      {item.status === 'PENDING' && (
                        <>
                          <button className="flex items-center gap-xs px-md py-sm bg-success-light text-success rounded hover:bg-success hover:text-white transition-fast text-xs font-sans font-semibold">
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </button>
                          <button className="flex items-center gap-xs px-md py-sm bg-error-light text-error rounded hover:bg-error hover:text-white transition-fast text-xs font-sans font-semibold">
                            <XCircle className="h-4 w-4" />
                            Reject
                          </button>
                        </>
                      )}
                      <Link href={`/admin/moderation/${item.id}`} className="px-md py-sm bg-accent-light text-accent rounded hover:bg-accent hover:text-white transition-fast text-xs font-sans font-semibold">
                        View Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {queueItems.length === 0 && (
          <div className="p-3xl text-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-lg">
              <Clock className="h-8 w-8 text-muted" />
            </div>
            <p className="text-base font-sans text-medium">No items in moderation queue</p>
          </div>
        )}
      </div>
    </div>
  )
}
