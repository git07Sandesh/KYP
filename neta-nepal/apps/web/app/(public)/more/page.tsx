import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Info, Scale, HelpCircle, MessageSquare, FileText, Shield, Mail, MapPin, Heart } from "lucide-react"

export default function MorePage() {
  const links = [
    {
      title: "About Us",
      description: "Learn about our mission and team",
      icon: Info,
      href: "/more/about",
      color: "from-info-light to-surface",
      iconBg: "bg-info"
    },
    {
      title: "Editorial Policy",
      description: "Our commitment to neutrality and transparency",
      icon: Scale,
      href: "/more/editorial-policy",
      color: "from-success-light to-surface",
      iconBg: "bg-success"
    },
    {
      title: "FAQ",
      description: "Frequently asked questions",
      icon: HelpCircle,
      href: "/more/faq",
      color: "from-warning-light to-surface",
      iconBg: "bg-warning"
    },
    {
      title: "Feedback & Corrections",
      description: "Help us improve our data",
      icon: MessageSquare,
      href: "/more/feedback",
      color: "from-primary-light to-surface",
      iconBg: "bg-accent"
    },
    {
      title: "Terms of Service",
      description: "Terms and conditions",
      icon: FileText,
      href: "/more/terms",
      color: "from-error-light to-surface",
      iconBg: "bg-error"
    },
    {
      title: "Privacy Policy",
      description: "How we handle your data",
      icon: Shield,
      href: "/more/privacy",
      color: "from-background-light to-surface",
      iconBg: "bg-primary"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-xl pb-3xl md:pb-2xl px-lg">
        {/* Header */}
        <div className="mb-xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-md">
            More Information
          </h1>
          <p className="text-lg font-sans text-medium">
            Additional resources and information about Neta Nepal
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-3 mb-xl">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <Card className={`
                  p-lg h-full shadow-md hover:shadow-lg transition-fast 
                  border-2 border-background-dark hover:border-accent 
                  bg-linear-to-br ${link.color}
                  hover:-translate-y-1 cursor-pointer
                `}>
                  <div className="flex items-start gap-md">
                    <div className={`${link.iconBg} rounded-xl p-md shadow-md flex-shrink-0`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-display font-bold text-dark mb-sm">
                        {link.title}
                      </h3>
                      <p className="text-sm font-sans text-medium leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Contact Section */}
        <Card className="shadow-xl border-2 border-background-dark overflow-hidden">
          <div className="bg-primary p-xl md:p-3xl">
            <div className="flex items-center gap-md mb-md">
              <Mail className="h-8 w-8 text-white" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                Contact Us
              </h2>
            </div>
            <p className="text-white opacity-90 font-sans text-lg mb-lg max-w-2xl leading-relaxed">
              Have questions, feedback, or want to contribute? We'd love to hear from you. 
              Together, we can build a more transparent and accountable democracy.
            </p>
          </div>
          
          <div className="bg-white p-xl md:p-3xl">
            <div className="grid md:grid-cols-2 gap-xl">
              {/* Email */}
              <div className="flex items-start gap-md">
                <div className="bg-info-light p-md rounded-xl">
                  <Mail className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-sm font-sans font-semibold text-medium uppercase tracking-wide mb-sm">
                    Email
                  </p>
                  <a 
                    href="mailto:info@netanepal.org" 
                    className="text-accent hover:text-accent-light font-sans font-bold text-lg hover:underline transition-fast"
                  >
                    info@netanepal.org
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-md">
                <div className="bg-success-light p-md rounded-xl">
                  <MapPin className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm font-sans font-semibold text-medium uppercase tracking-wide mb-sm">
                    Location
                  </p>
                  <p className="text-dark font-sans font-bold text-lg">
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="mt-xl pt-xl border-t-2 border-background-dark">
              <div className="flex items-start gap-md">
                <div className="bg-primary-light p-md rounded-xl flex-shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dark mb-md">
                    Our Mission
                  </h3>
                  <p className="font-sans text-medium leading-relaxed">
                    Neta Nepal is a non-partisan platform dedicated to providing accurate, 
                    fact-based information about political candidates in Nepal. We believe 
                    that informed citizens make better democratic choices, and transparency 
                    is the foundation of accountable governance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Support Card */}
        <Card className="mt-xl p-xl md:p-3xl bg-linear-to-br from-background-light to-surface shadow-lg border-2 border-primary">
          <div className="flex items-start gap-md">
            <div className="bg-primary p-md rounded-xl flex-shrink-0">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-dark mb-md">
                Support Our Work
              </h3>
              <p className="font-sans text-medium leading-relaxed mb-md">
                Neta Nepal is a community-driven initiative. Your support helps us maintain 
                this platform and expand our coverage. If you appreciate our work, consider 
                contributing data, sharing with others, or getting involved.
              </p>
              <p className="text-sm font-sans text-light italic">
                Transparency for all, accountability for everyone.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
