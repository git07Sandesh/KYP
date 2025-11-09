import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Using primary (red) for brand identity */}
      <section className="relative overflow-hidden bg-primary py-3xl px-xl">
        <div className="container mx-auto px-lg text-center relative z-10">
          <h1 className="text-5xl font-display font-bold text-white mb-lg max-w-4xl mx-auto leading-tight">
            Know Your Political Candidate
          </h1>
          <p className="text-lg font-sans text-white mb-2xl max-w-3xl mx-auto leading-relaxed opacity-95">
            A non-partisan, fact-based transparency platform for Nepal. Browse verified candidate profiles,
            track records, and make informed voting decisions.
          </p>

          <div className="flex gap-lg justify-center flex-wrap">
            <Link href="/candidates">
              {/* Primary CTA uses accent (dark blue), NOT primary */}
              <Button 
                size="lg" 
                className="bg-accent text-white px-xl py-lg rounded-lg hover:bg-accent-light transition-fast font-sans font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Browse Candidates →
              </Button>
            </Link>
            <Link href="/search">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white text-accent border-2 border-white px-xl py-lg rounded-lg hover:bg-background transition-fast font-sans font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105"
              >
                Search
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-lg py-3xl">
        <h2 className="text-3xl font-display font-bold text-center text-dark mb-md">
          Platform Features
        </h2>
        <p className="text-center text-lg font-sans text-medium mb-2xl max-w-2xl mx-auto leading-relaxed">
          Everything you need to make informed decisions about political candidates
        </p>

        <div className="grid md:grid-cols-3 gap-xl max-w-7xl mx-auto">
          {/* Feature Card Pattern: bg-white, rounded-lg, shadow-md, proper typography */}
          <div className="bg-white rounded-lg shadow-md p-lg hover:shadow-lg transition-fast hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-md text-2xl">
              📊
            </div>
            <h4 className="text-xl font-display font-semibold text-dark mb-sm">
              Verified Track Records
            </h4>
            <p className="text-sm font-sans text-medium leading-relaxed">
              View comprehensive profiles with promises, works, cases, and sources.
              All information is fact-checked and verified.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-lg hover:shadow-lg transition-fast hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-md text-2xl">
              🔍
            </div>
            <h4 className="text-xl font-display font-semibold text-dark mb-sm">
              Advanced Search
            </h4>
            <p className="text-sm font-sans text-medium leading-relaxed">
              Search across candidates, promises, works, and cases.
              Filter by party, constituency, and performance metrics.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-lg hover:shadow-lg transition-fast hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-md text-2xl">
              ⚖️
            </div>
            <h4 className="text-xl font-display font-semibold text-dark mb-sm">
              Compare Candidates
            </h4>
            <p className="text-sm font-sans text-medium leading-relaxed">
              Side-by-side comparison of up to 3 candidates. 
              View their scores, achievements, and track records.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-lg hover:shadow-lg transition-fast hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-md text-2xl">
              🏆
            </div>
            <h4 className="text-xl font-display font-semibold text-dark mb-sm">
              Rankings
            </h4>
            <p className="text-sm font-sans text-medium leading-relaxed">
              View rankings by impact, fulfillment rate, clean records,
              and experience across all government levels.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-lg hover:shadow-lg transition-fast hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-md text-2xl">
              📚
            </div>
            <h4 className="text-xl font-display font-semibold text-dark mb-sm">
              Source Transparency
            </h4>
            <p className="text-sm font-sans text-medium leading-relaxed">
              Every claim is backed by sources with reliability tiers.
              Access original documents and archived versions.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-lg hover:shadow-lg transition-fast hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-md text-2xl">
              🇳🇵
            </div>
            <h4 className="text-xl font-display font-semibold text-dark mb-sm">
              For Nepal
            </h4>
            <p className="text-sm font-sans text-medium leading-relaxed">
              Coverage of federal, provincial, and local level candidates
              across all provinces of Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Using accent (dark blue) for CTA background */}
      <section className="container mx-auto px-lg py-3xl">
        <div className="bg-accent text-white text-center rounded-xl p-3xl shadow-xl hover:shadow-2xl transition-fast">
          <h2 className="text-4xl font-display font-bold text-white mb-lg">
            Get Started Today
          </h2>
          <p className="text-lg font-sans text-white mb-2xl max-w-2xl mx-auto leading-relaxed opacity-95">
            Explore comprehensive, verified information about political candidates across Nepal
          </p>
          <div className="flex gap-lg justify-center flex-wrap">
            <Link href="/candidates">
              {/* Using primary (red) for emphasis on white background */}
              <Button 
                size="lg" 
                className="bg-primary text-white px-xl py-lg rounded-lg hover:bg-primary-light transition-fast font-sans font-semibold shadow-md hover:scale-105"
              >
                View All Candidates
              </Button>
            </Link>
            <Link href="/rankings">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent text-white border-2 border-white px-xl py-lg rounded-lg hover:bg-white hover:text-accent transition-fast font-sans font-semibold hover:scale-105"
              >
                View Rankings
              </Button>
            </Link>
            <Link href="/compare">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent text-white border-2 border-white px-xl py-lg rounded-lg hover:bg-white hover:text-accent transition-fast font-sans font-semibold hover:scale-105"
              >
                Compare Candidates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent-dark text-white py-3xl mt-3xl">
        <div className="container mx-auto px-lg text-center">
          <p className="text-base font-sans text-white opacity-75 mb-lg">
            Built with ❤️ for democratic transparency in Nepal
          </p>
          <div className="flex gap-xl justify-center">
            <Link 
              href="/more" 
              className="text-sm font-sans text-white opacity-75 hover:opacity-100 hover:text-white transition-fast"
            >
              About
            </Link>
            <Link 
              href="/more" 
              className="text-sm font-sans text-white opacity-75 hover:opacity-100 hover:text-white transition-fast"
            >
              Editorial Policy
            </Link>
            <Link 
              href="/more" 
              className="text-sm font-sans text-white opacity-75 hover:opacity-100 hover:text-white transition-fast"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
