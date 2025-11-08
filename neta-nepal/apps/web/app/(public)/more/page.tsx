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
      color: "from-[#DBEAFE] to-white",
      iconBg: "bg-[#3B82F6]"
    },
    {
      title: "Editorial Policy",
      description: "Our commitment to neutrality and transparency",
      icon: Scale,
      href: "/more/editorial-policy",
      color: "from-[#D1FAE5] to-white",
      iconBg: "bg-[#059669]"
    },
    {
      title: "FAQ",
      description: "Frequently asked questions",
      icon: HelpCircle,
      href: "/more/faq",
      color: "from-[#FEF3C7] to-white",
      iconBg: "bg-[#F59E0B]"
    },
    {
      title: "Feedback & Corrections",
      description: "Help us improve our data",
      icon: MessageSquare,
      href: "/more/feedback",
      color: "from-[#E9D5FF] to-white",
      iconBg: "bg-[#9333EA]"
    },
    {
      title: "Terms of Service",
      description: "Terms and conditions",
      icon: FileText,
      href: "/more/terms",
      color: "from-[#FEE2E2] to-white",
      iconBg: "bg-[#DC2626]"
    },
    {
      title: "Privacy Policy",
      description: "How we handle your data",
      icon: Shield,
      href: "/more/privacy",
      color: "from-[#FDF0D5] to-white",
      iconBg: "bg-[#C1121F]"
    }
  ]

  return (
    <div className="min-h-screen bg-[#FDF0D5]">
      <div className="container py-8 pb-20 md:pb-12 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[#2C2C2C] mb-3">
            More Information
          </h1>
          <p className="text-lg text-[#6B6B6B] font-sans">
            Additional resources and information about Neta Nepal
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <Card className={`
                  p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300 
                  border-2 border-gray-200 hover:border-[#C1121F] 
                  bg-gradient-to-br ${link.color}
                  hover:-translate-y-1 cursor-pointer
                `}>
                  <div className="flex items-start gap-4">
                    <div className={`${link.iconBg} rounded-xl p-3 shadow-md flex-shrink-0`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-lg text-[#2C2C2C] mb-2">
                        {link.title}
                      </h3>
                      <p className="text-sm text-[#6B6B6B] font-sans leading-relaxed">
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
        <Card className="shadow-xl border-2 border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#C1121F] to-[#A00F1A] p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-8 w-8 text-white" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                Contact Us
              </h2>
            </div>
            <p className="text-white/90 font-sans text-lg mb-6 max-w-2xl">
              Have questions, feedback, or want to contribute? We'd love to hear from you. 
              Together, we can build a more transparent and accountable democracy.
            </p>
          </div>
          
          <div className="bg-white p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-[#DBEAFE] p-3 rounded-xl">
                  <Mail className="h-6 w-6 text-[#3B82F6]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
                    Email
                  </p>
                  <a 
                    href="mailto:info@netanepal.org" 
                    className="text-[#C1121F] hover:text-[#A00F1A] font-bold text-lg hover:underline transition-colors duration-200"
                  >
                    info@netanepal.org
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="bg-[#D1FAE5] p-3 rounded-xl">
                  <MapPin className="h-6 w-6 text-[#059669]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">
                    Location
                  </p>
                  <p className="text-[#2C2C2C] font-bold text-lg">
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-[#FEE2E2] p-3 rounded-xl flex-shrink-0">
                  <Heart className="h-6 w-6 text-[#C1121F]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#2C2C2C] mb-3">
                    Our Mission
                  </h3>
                  <p className="text-[#4A4A4A] font-sans leading-relaxed">
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
        <Card className="mt-8 p-8 md:p-10 bg-gradient-to-br from-[#FDF0D5] to-white shadow-lg border-2 border-[#C1121F]">
          <div className="flex items-start gap-4">
            <div className="bg-[#C1121F] p-3 rounded-xl flex-shrink-0">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl text-[#2C2C2C] mb-3">
                Support Our Work
              </h3>
              <p className="text-[#4A4A4A] font-sans leading-relaxed mb-4">
                Neta Nepal is a community-driven initiative. Your support helps us maintain 
                this platform and expand our coverage. If you appreciate our work, consider 
                contributing data, sharing with others, or getting involved.
              </p>
              <p className="text-sm text-[#6B6B6B] italic">
                Transparency for all, accountability for everyone.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
