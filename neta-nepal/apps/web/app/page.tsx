import Link from 'next/link'
import { Button } from '@/components/design-system/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/design-system/Card'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-3xl px-xl">
        <div className="container mx-auto px-lg max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-display font-bold text-accent mb-lg leading-tight">
              A Brighter Future for Nepal
            </h1>
            <p className="text-xl font-sans text-medium mb-2xl leading-relaxed">
              Join the movement for political transparency. Browse verified candidate profiles, track records, and make informed voting decisions.
            </p>

            <div className="flex gap-base flex-wrap">
              <Link href="/candidates">
                <Button 
                  variant="primary"
                  size="lg"
                >
                  Browse Candidates
                </Button>
              </Link>
              <Link href="/search">
                <Button 
                  variant="secondary"
                  size="lg"
                >
                  Search Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent opacity-30 pointer-events-none"></div>
      </section>

      {/* Key Issues Section */}
      <section className="bg-white py-3xl">
        <div className="container mx-auto px-lg max-w-6xl">
          <div className="text-center mb-2xl">
            <h2 className="text-4xl font-display font-bold text-accent mb-base">
              Key Issues
            </h2>
            <p className="text-lg font-sans text-medium">
              Our vision for a better tomorrow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-lg">
            <Card variant="default">
              <CardContent className="p-xl">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-base text-2xl">
                  �
                </div>
                <h3 className="text-xl font-display font-semibold text-accent mb-sm">
                  A Stronger Economy
                </h3>
                <p className="text-base font-sans text-medium leading-relaxed">
                  Implementing policies that support small businesses and create jobs for a prosperous future.
                </p>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardContent className="p-xl">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-base text-2xl">
                  ❤️
                </div>
                <h3 className="text-xl font-display font-semibold text-accent mb-sm">
                  Affordable Healthcare
                </h3>
                <p className="text-base font-sans text-medium leading-relaxed">
                  Working to lower costs and expand access to quality healthcare for every citizen.
                </p>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardContent className="p-xl">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-base text-2xl">
                  🎓
                </div>
                <h3 className="text-xl font-display font-semibold text-accent mb-sm">
                  Quality Education
                </h3>
                <p className="text-base font-sans text-medium leading-relaxed">
                  Investing in our schools and teachers to provide the next generation with the tools to succeed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="bg-background py-3xl">
        <div className="container mx-auto px-lg max-w-6xl">
          <div className="text-center mb-2xl">
            <h2 className="text-4xl font-display font-bold text-accent mb-base">
              Get Involved
            </h2>
            <p className="text-lg font-sans text-medium">
              Be a part of the change. Here's how you can contribute.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-lg">
            <Card variant="default">
              <CardContent className="p-xl text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-base shadow-md">
                  <div className="text-3xl text-primary">🤝</div>
                </div>
                <h3 className="text-xl font-display font-semibold text-accent mb-base">
                  Volunteer
                </h3>
                <p className="text-base font-sans text-medium mb-xl leading-relaxed">
                  Join our team and make a real difference in your community.
                </p>
                <Link href="/more">
                  <Button variant="accent" fullWidth>
                    Sign Up
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardContent className="p-xl text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-base shadow-md">
                  <div className="text-3xl text-primary">❤️</div>
                </div>
                <h3 className="text-xl font-display font-semibold text-accent mb-base">
                  Donate
                </h3>
                <p className="text-base font-sans text-medium mb-xl leading-relaxed">
                  Your contribution powers our campaign and helps us reach more voters.
                </p>
                <Link href="/more">
                  <Button variant="primary" fullWidth>
                    Contribute
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardContent className="p-xl text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-base shadow-md">
                  <div className="text-3xl text-accent">✉️</div>
                </div>
                <h3 className="text-xl font-display font-semibold text-accent mb-base">
                  Subscribe
                </h3>
                <p className="text-base font-sans text-medium mb-xl leading-relaxed">
                  Stay informed with the latest news and updates from the campaign trail.
                </p>
                <Link href="/more">
                  <Button variant="accent" fullWidth>
                    Stay Updated
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent text-white py-3xl">
        <div className="container mx-auto px-lg max-w-6xl">
          <div className="grid md:grid-cols-3 gap-xl mb-xl">
            <div>
              <h4 className="text-lg font-display font-semibold text-white mb-base">
                Contact Us
              </h4>
              <div className="text-sm font-sans text-white space-y-sm opacity-90">
                <p>Campaign Office</p>
                <p>123 Democracy Way, Kathmandu</p>
                <p>contact@netanepal.com</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-display font-semibold text-white mb-base">
                Quick Links
              </h4>
              <div className="flex flex-col gap-sm text-sm font-sans">
                <Link href="/more" className="text-white opacity-90 hover:opacity-100 transition-fast">
                  About
                </Link>
                <Link href="/candidates" className="text-white opacity-90 hover:opacity-100 transition-fast">
                  Issues
                </Link>
                <Link href="/more" className="text-white opacity-90 hover:opacity-100 transition-fast">
                  Events
                </Link>
                <Link href="/more" className="text-white opacity-90 hover:opacity-100 transition-fast">
                  News
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-display font-semibold text-white mb-base">
                Follow Us
              </h4>
              <div className="flex flex-col gap-sm text-sm font-sans">
                <a href="#" className="text-white opacity-90 hover:opacity-100 transition-fast">
                  Twitter
                </a>
                <a href="#" className="text-white opacity-90 hover:opacity-100 transition-fast">
                  Facebook
                </a>
                <a href="#" className="text-white opacity-90 hover:opacity-100 transition-fast">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-xl border-t border-accent-light text-center">
            <p className="text-sm font-sans text-white opacity-75">
              © 2024 Neta Nepal. All rights reserved. Built with ❤️ for democratic transparency.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
