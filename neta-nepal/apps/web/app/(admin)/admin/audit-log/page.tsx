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
    if (action.includes('CREATE')) return "bg-success-light text-success"
    if (action.includes('UPDATE')) return "bg-info-light text-info"
    if (action.includes('DELETE')) return "bg-error-light text-error"
    if (action.includes('APPROVE') || action.includes('PUBLISH')) return "bg-primary-light text-primary"
    return "bg-background-dark text-medium"
  }

  return (
    <div className="space-y-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-dark">Audit Log</h1>
          <p className="text-base font-sans text-medium mt-sm">
            View all system activities and changes
          </p>
        </div>
        <span className="px-lg py-md bg-background border-2 border-background-dark text-dark font-sans font-semibold rounded-lg">
          {logs.length} recent entries
        </span>
      </div>

      {/* Activity Stats */}
      <div className="grid gap-base md:grid-cols-3">
        <div className="bg-white rounded-xl shadow-md border border-background-dark p-lg">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 bg-info-light rounded-lg flex items-center justify-center shrink-0">
              <Activity className="h-6 w-6 text-info" />
            </div>
            <div>
              <p className="text-xs font-sans font-semibold text-muted uppercase tracking-wide">Total Actions</p>
              <p className="text-3xl font-display font-bold text-dark mt-xs">{logs.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-background-dark p-lg">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center shrink-0">
              <User className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-xs font-sans font-semibold text-muted uppercase tracking-wide">Active Users</p>
              <p className="text-3xl font-display font-bold text-dark mt-xs">
                {new Set(logs.map(l => l.userId)).size}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-background-dark p-lg">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 bg-warning-light rounded-lg flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-xs font-sans font-semibold text-muted uppercase tracking-wide">Entity Types</p>
              <p className="text-3xl font-display font-bold text-dark mt-xs">
                {new Set(logs.map(l => l.entityType)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl shadow-md border border-background-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b-2 border-background-dark">
              <tr className="text-left">
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Timestamp</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">User</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Action</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Entity</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-background-dark last:border-0 hover:bg-background transition-fast">
                  <td className="p-base text-sm font-sans text-medium">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="p-base">
                    <div className="text-sm font-sans text-dark">
                      {log.user.name || log.user.email}
                      <div className="text-xs font-sans text-muted">
                        {log.user.role}
                      </div>
                    </div>
                  </td>
                  <td className="p-base">
                    <span className={`px-md py-xs rounded text-xs font-sans font-semibold ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-base">
                    <div className="text-sm font-sans">
                      <div className="font-semibold text-dark">{log.entityType}</div>
                      {log.entityId && (
                        <div className="text-xs font-mono text-muted">
                          {log.entityId.substring(0, 8)}...
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-base">
                    {log.candidate && (
                      <div className="text-sm font-sans text-dark">
                        Related to: <span className="font-semibold">{log.candidate.name}</span>
                      </div>
                    )}
                    {log.changes && (
                      <details className="text-xs font-sans text-medium cursor-pointer">
                        <summary className="hover:text-accent transition-fast">View changes</summary>
                        <pre className="mt-sm p-sm bg-background rounded text-xs overflow-auto max-w-md font-mono">
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
          <div className="p-3xl text-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-lg">
              <Activity className="h-8 w-8 text-muted" />
            </div>
            <p className="text-base font-sans text-medium">No audit log entries found</p>
          </div>
        )}
      </div>
    </div>
  )
}
