import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)`,
          padding: '5rem 0',
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 
            className="font-bold mb-6 text-white"
            style={{ fontSize: '2.5rem', lineHeight: '1.2', maxWidth: '900px', margin: '0 auto 1.5rem' }}
          >
            Know Your Political Candidate
          </h1>
          <p 
            className="mb-10 mx-auto text-white opacity-95"
            style={{ fontSize: '1.25rem', maxWidth: '700px', lineHeight: '1.75' }}
          >
            A non-partisan, fact-based transparency platform for Nepal. Browse verified candidate profiles,
            track records, and make informed voting decisions.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/candidates">
              <Button 
                size="lg" 
                className="px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                Browse Candidates
              </Button>
            </Link>
            <Link href="/search">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-white)',
                  color: 'var(--color-accent)',
                  borderWidth: '2px',
                  borderColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                }}
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
      <section className="container mx-auto px-4 py-20">
        <h2 
          className="font-bold text-center mb-4"
          style={{ fontSize: '2rem', color: 'var(--color-text-dark)' }}
        >
          Platform Features
        </h2>
        <p className="text-center mb-16 text-lg" style={{ color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Everything you need to make informed decisions about political candidates
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-background-dark)' }}>
            <CardHeader>
              <div className="text-4xl mb-4">📊</div>
              <CardTitle style={{ color: 'var(--color-text-dark)', fontSize: '1.25rem', fontWeight: '600' }}>Verified Track Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-light)', lineHeight: '1.75' }}>
                View comprehensive profiles with promises, works, cases, and sources.
                All information is fact-checked and verified.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-background-dark)' }}>
            <CardHeader>
              <div className="text-4xl mb-4">🔍</div>
              <CardTitle style={{ color: 'var(--color-text-dark)', fontSize: '1.25rem', fontWeight: '600' }}>Advanced Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-light)', lineHeight: '1.75' }}>
                Search across candidates, promises, works, and cases.
                Filter by party, constituency, and performance metrics.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-background-dark)' }}>
            <CardHeader>
              <div className="text-4xl mb-4">⚖️</div>
              <CardTitle style={{ color: 'var(--color-text-dark)', fontSize: '1.25rem', fontWeight: '600' }}>Compare Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-light)', lineHeight: '1.75' }}>
                Side-by-side comparison of up to 3 candidates. 
                View their scores, achievements, and track records.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-background-dark)' }}>
            <CardHeader>
              <div className="text-4xl mb-4">🏆</div>
              <CardTitle style={{ color: 'var(--color-text-dark)', fontSize: '1.25rem', fontWeight: '600' }}>Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-light)', lineHeight: '1.75' }}>
                View rankings by impact, fulfillment rate, clean records,
                and experience across all government levels.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-background-dark)' }}>
            <CardHeader>
              <div className="text-4xl mb-4">📚</div>
              <CardTitle style={{ color: 'var(--color-text-dark)', fontSize: '1.25rem', fontWeight: '600' }}>Source Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-light)', lineHeight: '1.75' }}>
                Every claim is backed by sources with reliability tiers.
                Access original documents and archived versions.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-background-dark)' }}>
            <CardHeader>
              <div className="text-4xl mb-4">🇳🇵</div>
              <CardTitle style={{ color: 'var(--color-text-dark)', fontSize: '1.25rem', fontWeight: '600' }}>For Nepal</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-light)', lineHeight: '1.75' }}>
                Coverage of federal, provincial, and local level candidates
                across all provinces of Nepal.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-20">
        <div 
          className="text-white text-center transition-all duration-300 hover:shadow-2xl"
          style={{ 
            background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)`,
            borderRadius: 'var(--radius-xl)',
            padding: '4rem 2rem',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <h2 className="font-bold mb-6" style={{ fontSize: '2.25rem' }}>Get Started Today</h2>
          <p className="mb-10 mx-auto" style={{ fontSize: '1.125rem', maxWidth: '600px', opacity: 0.95, lineHeight: '1.75' }}>
            Explore comprehensive, verified information about political candidates across Nepal
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/candidates">
              <Button 
                size="lg" 
                className="px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                View All Candidates
              </Button>
            </Link>
            <Link href="/rankings">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--color-white)',
                  borderWidth: '2px',
                  borderColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                View Rankings
              </Button>
            </Link>
            <Link href="/compare">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--color-white)',
                  borderWidth: '2px',
                  borderColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                Compare Candidates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--color-accent-dark)', color: 'var(--color-white)', padding: '3rem 0', marginTop: '4rem' }}>
        <div className="container mx-auto px-4 text-center">
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
            Built with ❤️ for democratic transparency in Nepal
          </p>
          <div className="flex gap-8 justify-center">
            <Link 
              href="/more" 
              className="transition-colors duration-200"
              style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}
            >
              About
            </Link>
            <Link 
              href="/more" 
              className="transition-colors duration-200"
              style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}
            >
              Editorial Policy
            </Link>
            <Link 
              href="/more" 
              className="transition-colors duration-200"
              style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
