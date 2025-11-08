import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Info, Scale, HelpCircle, MessageSquare, FileText, Shield } from "lucide-react"

export default function MorePage() {
  const links = [
    {
      title: "About Us",
      description: "Learn about our mission and team",
      icon: Info,
      href: "/more/about"
    },
    {
      title: "Editorial Policy",
      description: "Our commitment to neutrality and transparency",
      icon: Scale,
      href: "/more/editorial-policy"
    },
    {
      title: "FAQ",
      description: "Frequently asked questions",
      icon: HelpCircle,
      href: "/more/faq"
    },
    {
      title: "Feedback & Corrections",
      description: "Help us improve our data",
      icon: MessageSquare,
      href: "/more/feedback"
    },
    {
      title: "Terms of Service",
      description: "Terms and conditions",
      icon: FileText,
      href: "/more/terms"
    },
    {
      title: "Privacy Policy",
      description: "How we handle your data",
      icon: Shield,
      href: "/more/privacy"
    }
  ]

  return (
    <div className="container py-8 pb-20 md:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">More</h1>
        <p className="text-muted-foreground">
          Additional information and resources
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">
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
      <Card className="mt-8 p-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-muted-foreground mb-4">
          Have questions or feedback? We'd love to hear from you.
        </p>
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> <a href="mailto:info@netanepal.org" className="text-primary hover:underline">info@netanepal.org</a>
          </p>
          <p>
            <strong>Address:</strong> Kathmandu, Nepal
          </p>
        </div>
      </Card>
    </div>
  )
}
