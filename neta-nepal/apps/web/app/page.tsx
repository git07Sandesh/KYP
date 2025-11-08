import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Nepal Political Candidate Information Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A non-partisan, fact-based transparency platform for Nepal. Browse political candidates,
          view verified track records, and make informed voting decisions.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/candidates">
            <Button size="lg" className="px-8">
              Browse Candidates
            </Button>
          </Link>
          <Link href="/search">
            <Button size="lg" variant="outline" className="px-8">
              Search
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>📊 Verified Track Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                View comprehensive profiles with promises, works, cases, and sources.
                All information is fact-checked and verified.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔍 Advanced Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Search across candidates, promises, works, and cases.
                Filter by party, constituency, and performance metrics.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⚖️ Compare Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Side-by-side comparison of up to 3 candidates. 
                View their scores, achievements, and track records.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🏆 Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                View rankings by impact, fulfillment rate, clean records,
                and experience across all government levels.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📚 Source Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Every claim is backed by sources with reliability tiers.
                Access original documents and archived versions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🇳🇵 For Nepal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Coverage of federal, provincial, and local level candidates
                across all provinces of Nepal.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-blue-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Started</h2>
          <p className="text-lg mb-8 opacity-90">
            Explore comprehensive information about political candidates in Nepal
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/candidates">
              <Button size="lg" variant="secondary">
                View All Candidates
              </Button>
            </Link>
            <Link href="/rankings">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                View Rankings
              </Button>
            </Link>
            <Link href="/compare">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                Compare Candidates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Built with ❤️ for democratic transparency in Nepal
          </p>
          <div className="flex gap-6 justify-center mt-4">
            <Link href="/more" className="text-gray-400 hover:text-white">
              About
            </Link>
            <Link href="/more" className="text-gray-400 hover:text-white">
              Editorial Policy
            </Link>
            <Link href="/more" className="text-gray-400 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
