import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import Link from "next/link"
import { LayoutDashboard, Users, FileText, Gavel, MessageCircle, History, Settings } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
    redirect("/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Candidates", href: "/admin/candidates", icon: Users },
    { name: "Promises", href: "/admin/promises", icon: FileText },
    { name: "Works", href: "/admin/works", icon: FileText },
    { name: "Cases", href: "/admin/cases", icon: Gavel },
    { name: "Moderation", href: "/admin/moderation", icon: MessageCircle },
    { name: "Audit Log", href: "/admin/audit-log", icon: History },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r bg-background pt-5 pb-4">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <div className="mt-5 flex-1 flex flex-col px-2">
            <nav className="flex-1 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-secondary"
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t p-4">
            <div className="flex-1">
              <p className="text-sm font-medium">{session.user.name || session.user.email}</p>
              <p className="text-xs text-muted-foreground">{session.user.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Site
          </Link>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
