"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import Link from "next/link"
import { Alert } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/admin")
        router.refresh()
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-base py-3xl">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-3xl border border-background-dark">
        <div className="mb-2xl text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-lg">
            <span className="text-3xl text-white font-display font-bold">नेता</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-dark mb-md">Admin Login</h1>
          <p className="text-base font-sans text-medium">
            Sign in to access the admin dashboard
          </p>
        </div>

        {error && (
          <div className="mb-lg p-base bg-error-light border-2 border-error rounded-lg">
            <p className="text-sm font-sans font-semibold text-error">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-lg">
          <div>
            <label htmlFor="email" className="block text-sm font-sans font-semibold text-dark mb-sm">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="admin@netanepal.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="h-12 px-base text-base font-sans border-2 border-default rounded-lg transition-fast focus:border-accent focus:ring-2 focus:ring-accent-light focus:ring-opacity-20 bg-white disabled:bg-background disabled:text-muted"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-sans font-semibold text-dark mb-sm">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="h-12 px-base text-base font-sans border-2 border-default rounded-lg transition-fast focus:border-accent focus:ring-2 focus:ring-accent-light focus:ring-opacity-20 bg-white disabled:bg-background disabled:text-muted"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-accent text-white font-sans font-semibold text-base rounded-lg hover:bg-accent-light transition-fast disabled:bg-background-dark disabled:text-muted disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-xl pt-lg border-t border-background-dark">
          <p className="text-center text-xs font-sans font-semibold text-muted mb-sm">Demo Credentials:</p>
          <div className="bg-background rounded-lg p-md">
            <p className="text-sm font-sans text-medium text-center">
              <span className="font-semibold text-dark">Email:</span> <code className="bg-white px-sm py-xs rounded text-accent font-mono">admin@netanepal.org</code>
            </p>
            <p className="text-sm font-sans text-medium text-center mt-xs">
              <span className="font-semibold text-dark">Password:</span> <code className="bg-white px-sm py-xs rounded text-accent font-mono">admin123</code>
            </p>
          </div>
        </div>

        <div className="mt-lg text-center">
          <Link href="/" className="text-sm font-sans font-semibold text-accent hover:text-accent-light transition-fast inline-flex items-center gap-xs">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
