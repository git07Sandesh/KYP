"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/")

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-xl font-bold">N</span>
          </div>
          <span className="hidden font-bold sm:inline-block">
            Neta Nepal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/") && !isActive("/candidates")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link
            href="/candidates"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/candidates")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            Candidates
          </Link>
          <Link
            href="/compare"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/compare")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            Compare
          </Link>
          <Link
            href="/rankings"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/rankings")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            Rankings
          </Link>
          <Link
            href="/more"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/more")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            More
          </Link>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden items-center space-x-4 md:flex">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search candidates..."
              className="w-full pl-8"
              onClick={() => (window.location.href = "/search")}
            />
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin">Admin</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
        <div className="flex items-center justify-around p-2">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center gap-1 rounded-md px-3 py-2 text-xs font-medium transition-colors",
              isActive("/") && !isActive("/candidates")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Home</span>
          </Link>
          <Link
            href="/search"
            className={cn(
              "flex flex-col items-center gap-1 rounded-md px-3 py-2 text-xs font-medium transition-colors",
              isActive("/search")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </Link>
          <Link
            href="/compare"
            className={cn(
              "flex flex-col items-center gap-1 rounded-md px-3 py-2 text-xs font-medium transition-colors",
              isActive("/compare")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span>Compare</span>
          </Link>
          <Link
            href="/rankings"
            className={cn(
              "flex flex-col items-center gap-1 rounded-md px-3 py-2 text-xs font-medium transition-colors",
              isActive("/rankings")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>Rankings</span>
          </Link>
          <Link
            href="/more"
            className={cn(
              "flex flex-col items-center gap-1 rounded-md px-3 py-2 text-xs font-medium transition-colors",
              isActive("/more")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span>More</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
