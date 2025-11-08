import { PrismaClient } from "@prisma/client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, User, FileText } from "lucide-react"

const prisma = new PrismaClient()

export default async function AdminAuditLogPage() {
  const logs = await prisma.auditLog.findMany({
    take: 100,
    orderBy: {
      createdAt: "desc"
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true
        }
      },
      candidate: {
        select: {
          name: true
        }
      }
    }
  })

  const getActionColor = (action: string) => {
    if (action.includes('CREATE')) return "bg-green-100 text-green-800"
    if (action.includes('UPDATE')) return "bg-blue-100 text-blue-800"
    if (action.includes('DELETE')) return "bg-red-100 text-red-800"
    if (action.includes('APPROVE') || action.includes('PUBLISH')) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audit Log</h1>
          <p className="text-muted-foreground mt-2">
            View all system activities and changes
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-2">
          {logs.length} recent entries
        </Badge>
      </div>

      {/* Activity Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Actions</p>
              <p className="text-2xl font-bold">{logs.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <User className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold">
                {new Set(logs.map(l => l.userId)).size}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-muted-foreground">Entity Types</p>
              <p className="text-2xl font-bold">
                {new Set(logs.map(l => l.entityType)).size}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Audit Log Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-4 font-semibold">Timestamp</th>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Action</th>
                <th className="p-4 font-semibold">Entity</th>
                <th className="p-4 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b last:border-0 hover:bg-secondary/50">
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      {log.user.name || log.user.email}
                      <div className="text-xs text-muted-foreground">
                        {log.user.role}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getActionColor(log.action)}>
                      {log.action}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="font-medium">{log.entityType}</div>
                      {log.entityId && (
                        <div className="text-xs text-muted-foreground font-mono">
                          {log.entityId.substring(0, 8)}...
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {log.candidate && (
                      <div className="text-sm">
                        Related to: <span className="font-medium">{log.candidate.name}</span>
                      </div>
                    )}
                    {log.changes && (
                      <details className="text-xs text-muted-foreground cursor-pointer">
                        <summary>View changes</summary>
                        <pre className="mt-2 p-2 bg-secondary rounded text-xs overflow-auto max-w-md">
                          {JSON.stringify(log.changes, null, 2)}
                        </pre>
                      </details>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {logs.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No audit log entries found</p>
          </div>
        )}
      </Card>
    </div>
  )
}
