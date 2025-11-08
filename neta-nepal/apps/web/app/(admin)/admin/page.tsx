import { PrismaClient } from "@prisma/client"
import { Card } from "@/components/ui/card"
import { Users, FileText, AlertTriangle, Activity } from "lucide-react"
import Link from "next/link"

const prisma = new PrismaClient()

export default async function AdminDashboard() {
  // Fetch stats
  const [
    totalCandidates,
    publishedCandidates,
    draftCandidates,
    totalPromises,
    totalWorks,
    totalCases,
    recentLogs
  ] = await Promise.all([
    prisma.candidate.count(),
    prisma.candidate.count({ where: { status: "PUBLISHED" } }),
    prisma.candidate.count({ where: { status: "DRAFT" } }),
    prisma.promise.count(),
    prisma.work.count(),
    prisma.case.count(),
    prisma.auditLog.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    })
  ])

  const stats = [
    {
      name: "Total Candidates",
      value: totalCandidates,
      description: `${publishedCandidates} published, ${draftCandidates} draft`,
      icon: Users,
      href: "/admin/candidates"
    },
    {
      name: "Promises",
      value: totalPromises,
      description: "Total promises tracked",
      icon: FileText,
      href: "/admin/promises"
    },
    {
      name: "Works",
      value: totalWorks,
      description: "Total works recorded",
      icon: Activity,
      href: "/admin/works"
    },
    {
      name: "Legal Cases",
      value: totalCases,
      description: "Total cases tracked",
      icon: AlertTriangle,
      href: "/admin/cases"
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of the platform's data and activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.name} href={stat.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.name}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/admin/candidates/new"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-secondary transition-colors"
          >
            <Users className="h-5 w-5" />
            <span className="font-medium">Add Candidate</span>
          </Link>
          <Link
            href="/admin/promises/new"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-secondary transition-colors"
          >
            <FileText className="h-5 w-5" />
            <span className="font-medium">Add Promise</span>
          </Link>
          <Link
            href="/admin/works/new"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-secondary transition-colors"
          >
            <Activity className="h-5 w-5" />
            <span className="font-medium">Add Work</span>
          </Link>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentLogs.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No recent activity
            </p>
          ) : (
            recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 pb-4 border-b last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium">
                    {log.user.name || log.user.email} {log.action.toLowerCase()} {log.entityType}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4">
          <Link
            href="/admin/audit-log"
            className="text-sm text-primary hover:underline"
          >
            View all activity →
          </Link>
        </div>
      </Card>
    </div>
  )
}
