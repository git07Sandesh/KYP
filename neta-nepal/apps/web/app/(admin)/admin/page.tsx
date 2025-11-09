import { PrismaClient } from "@prisma/client"
import { Card, CardContent, Button } from "@/components/design-system"
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
    <div className="space-y-3xl">
      <div>
        <h1 className="text-4xl font-display font-bold text-dark">Admin Dashboard</h1>
        <p className="text-base font-sans text-medium mt-sm">
          Overview of the platform's data and activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-base md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.name} href={stat.href}>
              <Card variant="elevated" className="hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-sans font-semibold text-muted uppercase tracking-wide">
                        {stat.name}
                      </p>
                      <p className="text-4xl font-display font-bold text-primary mt-sm">{stat.value}</p>
                      <p className="text-xs font-sans text-medium mt-xs">
                        {stat.description}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-xl">
          <h2 className="text-2xl font-display font-semibold text-dark mb-lg">Quick Actions</h2>
        <div className="grid gap-base md:grid-cols-3">
          <Link
            href="/admin/candidates/new"
            className="flex items-center gap-md p-lg rounded-lg border-2 border-accent text-accent hover:bg-accent hover:text-white transition-fast group"
          >
            <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center group-hover:bg-white transition-fast">
              <Users className="h-5 w-5 text-accent group-hover:text-accent" />
            </div>
            <span className="font-sans font-semibold">Add Candidate</span>
          </Link>
          <Link
            href="/admin/promises/new"
            className="flex items-center gap-md p-lg rounded-lg border-2 border-info text-info hover:bg-info hover:text-white transition-fast group"
          >
            <div className="w-10 h-10 bg-info-light rounded-lg flex items-center justify-center group-hover:bg-white transition-fast">
              <FileText className="h-5 w-5 text-info group-hover:text-info" />
            </div>
            <span className="font-sans font-semibold">Add Promise</span>
          </Link>
          <Link
            href="/admin/works/new"
            className="flex items-center gap-md p-lg rounded-lg border-2 border-success text-success hover:bg-success hover:text-white transition-fast group"
          >
            <div className="w-10 h-10 bg-success-light rounded-lg flex items-center justify-center group-hover:bg-white transition-fast">
              <Activity className="h-5 w-5 text-success group-hover:text-success" />
            </div>
            <span className="font-sans font-semibold">Add Work</span>
          </Link>
        </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-xl">
          <h2 className="text-2xl font-display font-semibold text-dark mb-lg">Recent Activity</h2>
        <div className="space-y-base">
          {recentLogs.length === 0 ? (
            <div className="text-center py-3xl">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-md">
                <Activity className="h-8 w-8 text-muted" />
              </div>
              <p className="text-base font-sans text-medium">No recent activity</p>
            </div>
          ) : (
            recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-base pb-base border-b border-background-dark last:border-0"
              >
                <div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center shrink-0">
                  <Activity className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-sans font-medium text-dark">
                    {log.user.name || log.user.email} <span className="text-medium">{log.action.toLowerCase()}</span> {log.entityType}
                  </p>
                  <p className="text-sm font-sans text-muted mt-xs">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-lg pt-lg border-t border-background-dark">
          <Link
            href="/admin/audit-log"
            className="text-sm font-sans font-semibold text-accent hover:text-accent-light transition-fast inline-flex items-center gap-xs"
          >
            View all activity →
          </Link>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}
