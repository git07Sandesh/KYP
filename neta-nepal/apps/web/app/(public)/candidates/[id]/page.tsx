'use client'

import { useCandidate } from '@repo/shared-logic'
import { use } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PromiseCard } from '@/components/domain/PromiseCard'
import { WorkCard } from '@/components/domain/WorkCard'
import { CaseCard } from '@/components/domain/CaseCard'
import { RumorCard } from '@/components/domain/RumorCard'
import { ScoreBadge } from '@/components/domain/ScoreBadge'
import { 
  CheckCircle, 
  AlertTriangle, 
  Scale, 
  TrendingUp, 
  FileText, 
  Briefcase, 
  MessageSquare,
  Calendar,
  Award,
  Target,
  AlertCircle,
  Users
} from 'lucide-react'

interface CandidateProfilePageProps {
  params: Promise<{
    id: string
  }>
}

export default function CandidateProfilePage({ params }: CandidateProfilePageProps) {
  const { id } = use(params)
  const { data, isLoading, error } = useCandidate(id)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDF0D5]">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#C1121F] mb-4"></div>
              <p className="text-lg font-sans text-[#4A4A4A]">Loading candidate profile...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#FDF0D5]">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="p-8 max-w-md w-full shadow-lg">
              <div className="text-center">
                <AlertCircle className="h-16 w-16 mx-auto mb-4 text-[#DC2626]" />
                <h2 className="text-2xl font-display font-bold text-[#2C2C2C] mb-2">
                  {error ? 'Error Loading Candidate' : 'Candidate Not Found'}
                </h2>
                <p className="text-[#6B6B6B] mb-6">
                  {error ? 'We encountered an error while loading the candidate profile.' : 'The candidate you\'re looking for doesn\'t exist.'}
                </p>
                <Link href="/candidates">
                  <Button className="bg-[#C1121F] hover:bg-[#A00F1A] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg">
                    Back to Candidates
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const candidate = (data as any).candidate

  return (
    <div className="min-h-screen bg-[#FDF0D5]">
      {/* Sticky Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/candidates">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-2 border-gray-300 hover:border-[#C1121F] hover:bg-[#FEF2F2] transition-all duration-200"
                >
                  ← Back
                </Button>
              </Link>
              <h1 className="text-xl md:text-2xl font-display font-bold text-[#2C2C2C] hidden sm:block">
                {candidate.name}
              </h1>
            </div>
            <Button className="bg-[#003049] hover:bg-[#001A2C] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-md">
              Share Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
          <CardContent className="p-0">
            {/* Top Section with Avatar and Main Info */}
            <div className="bg-gradient-to-r from-[#FDF0D5] to-white p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
                {/* Large Avatar */}
                <div className="relative">
                  <Avatar className="h-28 w-28 md:h-32 md:w-32 ring-4 ring-white shadow-xl">
                    <AvatarImage src={candidate.photoUrl || undefined} alt={candidate.name} />
                    <AvatarFallback className="text-4xl font-display font-bold bg-[#C1121F] text-white">
                      {candidate.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {candidate.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-[#059669] rounded-full p-2 shadow-lg">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Name and Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#2C2C2C] mb-3">
                    {candidate.name}
                  </h1>
                  
                  {/* Party and Constituency */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                    <Badge className="bg-[#003049] hover:bg-[#001A2C] text-white px-4 py-1.5 text-sm font-semibold rounded-full">
                      {candidate.party?.name}
                    </Badge>
                    <Badge variant="outline" className="border-2 border-[#003049] text-[#003049] px-4 py-1.5 text-sm font-semibold rounded-full">
                      {candidate.constituency?.name}, {candidate.constituency?.province?.name}
                    </Badge>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    {candidate.isVerified && (
                      <Badge className="bg-[#059669] hover:bg-[#047857] text-white px-3 py-1 text-xs font-medium rounded-full">
                        <CheckCircle className="h-3 w-3 mr-1 inline" />
                        Verified
                      </Badge>
                    )}
                    {candidate.hasAllegations && (
                      <Badge className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-3 py-1 text-xs font-medium rounded-full">
                        <AlertTriangle className="h-3 w-3 mr-1 inline" />
                        Allegations
                      </Badge>
                    )}
                    {candidate.hasCriminalCases && (
                      <Badge className="bg-[#DC2626] hover:bg-[#991B1B] text-white px-3 py-1 text-xs font-medium rounded-full">
                        <AlertCircle className="h-3 w-3 mr-1 inline" />
                        Criminal Cases
                      </Badge>
                    )}
                  </div>

                  {/* Additional Info Grid */}
                  {(candidate.age || candidate.yearsInPolitics) && (
                    <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto md:mx-0">
                      {candidate.age && (
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-[#6B6B6B] font-medium mb-1">Age</p>
                          <p className="text-lg font-bold text-[#2C2C2C]">{candidate.age} years</p>
                        </div>
                      )}
                      {candidate.yearsInPolitics && (
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-[#6B6B6B] font-medium mb-1">Experience</p>
                          <p className="text-lg font-bold text-[#2C2C2C]">{candidate.yearsInPolitics} years</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Key Metrics Section */}
            <div className="bg-white px-6 md:px-10 py-6 md:py-8 border-t border-gray-200">
              <h3 className="text-lg font-display font-semibold text-[#2C2C2C] mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-[#C1121F]" />
                Key Performance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Impact Score Card */}
                <div className="bg-gradient-to-br from-[#DBEAFE] to-white rounded-xl p-5 border-2 border-[#3B82F6] hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-6 w-6 text-[#3B82F6]" />
                    <ScoreBadge value={candidate.impactScore || 0} type="impact" size="sm" />
                  </div>
                  <p className="text-xs text-[#4A4A4A] font-medium uppercase tracking-wide">Impact Score</p>
                  <p className="text-3xl font-display font-bold text-[#3B82F6] mt-1">{candidate.impactScore || 0}</p>
                  <p className="text-xs text-[#6B6B6B] mt-1">Overall effectiveness</p>
                </div>

                {/* Fulfillment Rate Card */}
                <div className="bg-gradient-to-br from-[#D1FAE5] to-white rounded-xl p-5 border-2 border-[#059669] hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="h-6 w-6 text-[#059669]" />
                    <ScoreBadge value={candidate.fulfillmentRate || 0} type="fulfillment" size="sm" />
                  </div>
                  <p className="text-xs text-[#4A4A4A] font-medium uppercase tracking-wide">Fulfillment Rate</p>
                  <p className="text-3xl font-display font-bold text-[#059669] mt-1">{candidate.fulfillmentRate || 0}%</p>
                  <p className="text-xs text-[#6B6B6B] mt-1">Promises kept</p>
                </div>

                {/* Scandal Score Card */}
                <div className="bg-gradient-to-br from-[#FEE2E2] to-white rounded-xl p-5 border-2 border-[#DC2626] hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="h-6 w-6 text-[#DC2626]" />
                    <ScoreBadge value={candidate.scandalScore || 0} type="scandal" size="sm" />
                  </div>
                  <p className="text-xs text-[#4A4A4A] font-medium uppercase tracking-wide">Scandal Score</p>
                  <p className="text-3xl font-display font-bold text-[#DC2626] mt-1">{candidate.scandalScore || 0}</p>
                  <p className="text-xs text-[#6B6B6B] mt-1">Controversy level</p>
                </div>
              </div>
            </div>

            {/* Biography Section */}
            {candidate.bio && (
              <div className="bg-[#FFFBF0] px-6 md:px-10 py-6 md:py-8 border-t border-gray-200">
                <h3 className="text-2xl font-display font-bold text-[#2C2C2C] mb-4">Biography</h3>
                <p className="text-base text-[#4A4A4A] leading-relaxed font-sans whitespace-pre-line">
                  {candidate.bio}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-white rounded-xl p-1.5 shadow-md border border-gray-200">
            <TabsTrigger 
              value="overview"
              className="rounded-lg font-semibold text-sm data-[state=active]:bg-[#C1121F] data-[state=active]:text-white transition-all duration-200"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="works"
              className="rounded-lg font-semibold text-sm data-[state=active]:bg-[#C1121F] data-[state=active]:text-white transition-all duration-200"
            >
              <Briefcase className="h-4 w-4 mr-1 inline md:hidden" />
              Works ({candidate.works?.length || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="promises"
              className="rounded-lg font-semibold text-sm data-[state=active]:bg-[#C1121F] data-[state=active]:text-white transition-all duration-200"
            >
              <Target className="h-4 w-4 mr-1 inline md:hidden" />
              Promises ({candidate.promises?.length || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="cases"
              className="rounded-lg font-semibold text-sm data-[state=active]:bg-[#C1121F] data-[state=active]:text-white transition-all duration-200"
            >
              <Scale className="h-4 w-4 mr-1 inline md:hidden" />
              Cases ({candidate.cases?.length || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="rumors"
              className="rounded-lg font-semibold text-sm data-[state=active]:bg-[#C1121F] data-[state=active]:text-white transition-all duration-200"
            >
              <MessageSquare className="h-4 w-4 mr-1 inline md:hidden" />
              Rumors ({candidate.rumors?.length || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="posts"
              className="rounded-lg font-semibold text-sm data-[state=active]:bg-[#C1121F] data-[state=active]:text-white transition-all duration-200"
            >
              <Users className="h-4 w-4 mr-1 inline md:hidden" />
              Posts ({candidate.posts?.length || 0})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Summary Statistics */}
            <Card className="shadow-md border border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-bold text-[#2C2C2C]">
                  Summary Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Works Completed */}
                  <div className="bg-[#DBEAFE] rounded-xl p-5 text-center hover:shadow-md transition-shadow duration-200">
                    <Briefcase className="h-8 w-8 mx-auto mb-2 text-[#3B82F6]" />
                    <p className="text-4xl font-display font-bold text-[#3B82F6]">
                      {candidate.works?.length || 0}
                    </p>
                    <p className="text-sm text-[#4A4A4A] font-medium mt-1">Works Completed</p>
                  </div>

                  {/* Promises Made */}
                  <div className="bg-[#D1FAE5] rounded-xl p-5 text-center hover:shadow-md transition-shadow duration-200">
                    <Target className="h-8 w-8 mx-auto mb-2 text-[#059669]" />
                    <p className="text-4xl font-display font-bold text-[#059669]">
                      {candidate.promises?.length || 0}
                    </p>
                    <p className="text-sm text-[#4A4A4A] font-medium mt-1">Promises Made</p>
                  </div>

                  {/* Legal Cases */}
                  <div className="bg-[#FEF3C7] rounded-xl p-5 text-center hover:shadow-md transition-shadow duration-200">
                    <Scale className="h-8 w-8 mx-auto mb-2 text-[#F59E0B]" />
                    <p className="text-4xl font-display font-bold text-[#F59E0B]">
                      {candidate.cases?.length || 0}
                    </p>
                    <p className="text-sm text-[#4A4A4A] font-medium mt-1">Legal Cases</p>
                  </div>

                  {/* Positions Held */}
                  <div className="bg-[#E9D5FF] rounded-xl p-5 text-center hover:shadow-md transition-shadow duration-200">
                    <Users className="h-8 w-8 mx-auto mb-2 text-[#9333EA]" />
                    <p className="text-4xl font-display font-bold text-[#9333EA]">
                      {candidate.posts?.length || 0}
                    </p>
                    <p className="text-sm text-[#4A4A4A] font-medium mt-1">Positions Held</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-md border border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-bold text-[#2C2C2C]">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-[#9CA3AF]" />
                  <p className="text-[#6B6B6B] font-sans">
                    Check other tabs for detailed information about works, promises, cases, and more.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Works Tab */}
          <TabsContent value="works">
            <div className="grid gap-4">
              {candidate.works && candidate.works.length > 0 ? (
                candidate.works.map((work: any) => (
                  <WorkCard work={work} key={work.id} />
                ))
              ) : (
                <Card className="shadow-md border border-gray-200">
                  <CardContent className="p-12 text-center">
                    <Briefcase className="h-24 w-24 mx-auto mb-4 text-[#9CA3AF]" />
                    <h3 className="text-xl font-display font-bold text-[#2C2C2C] mb-2">
                      No works yet
                    </h3>
                    <p className="text-[#6B6B6B] font-sans">
                      This candidate hasn't recorded any works yet.
                    </p>
                    <p className="text-sm text-[#9CA3AF] mt-2">
                      Check back later for updates
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Promises Tab */}
          <TabsContent value="promises">
            <div className="grid gap-4">
              {candidate.promises && candidate.promises.length > 0 ? (
                candidate.promises.map((promise: any) => (
                  <PromiseCard promise={promise} key={promise.id} />
                ))
              ) : (
                <Card className="shadow-md border border-gray-200">
                  <CardContent className="p-12 text-center">
                    <Target className="h-24 w-24 mx-auto mb-4 text-[#9CA3AF]" />
                    <h3 className="text-xl font-display font-bold text-[#2C2C2C] mb-2">
                      No promises yet
                    </h3>
                    <p className="text-[#6B6B6B] font-sans">
                      This candidate hasn't made any recorded promises yet.
                    </p>
                    <p className="text-sm text-[#9CA3AF] mt-2">
                      Check back later for updates
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases">
            <div className="grid gap-4">
              {candidate.cases && candidate.cases.length > 0 ? (
                candidate.cases.map((legalCase: any) => (
                  <CaseCard legalCase={legalCase} key={legalCase.id} />
                ))
              ) : (
                <Card className="shadow-md border border-gray-200">
                  <CardContent className="p-12 text-center">
                    <Scale className="h-24 w-24 mx-auto mb-4 text-[#9CA3AF]" />
                    <h3 className="text-xl font-display font-bold text-[#2C2C2C] mb-2">
                      No legal cases
                    </h3>
                    <p className="text-[#6B6B6B] font-sans">
                      This candidate has no recorded legal cases.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Rumors Tab */}
          <TabsContent value="rumors">
            <div className="mb-6 p-5 bg-[#FEE2E2] border-l-4 border-[#DC2626] rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#991B1B] font-display text-lg mb-1">
                    🚨 Unverified Claims - Shown for Transparency
                  </p>
                  <p className="text-sm text-[#DC2626] font-sans">
                    These are NOT verified and may be false. Auto-expire after 60 days. 
                    Please do not make judgments based solely on unverified information.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {candidate.rumors && candidate.rumors.length > 0 ? (
                candidate.rumors.map((rumor: any) => (
                  <RumorCard rumor={rumor} key={rumor.id} />
                ))
              ) : (
                <Card className="shadow-md border border-gray-200">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-24 w-24 mx-auto mb-4 text-[#9CA3AF]" />
                    <h3 className="text-xl font-display font-bold text-[#2C2C2C] mb-2">
                      No active rumors
                    </h3>
                    <p className="text-[#6B6B6B] font-sans">
                      There are currently no active rumors about this candidate.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts">
            <div className="grid gap-4">
              {candidate.posts && candidate.posts.length > 0 ? (
                candidate.posts.map((post: any) => (
                  <Card key={post.id} className="shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Users className="h-5 w-5 text-[#C1121F]" />
                            <h3 className="font-display font-bold text-lg text-[#2C2C2C]">
                              {post.position}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(post.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} 
                              {' → '}
                              {post.endDate
                                ? new Date(post.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                : 'Present'}
                            </span>
                          </div>
                        </div>
                        {post.isCurrent && (
                          <Badge className="bg-[#059669] hover:bg-[#047857] text-white px-3 py-1 text-xs font-semibold rounded-full">
                            Current
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="shadow-md border border-gray-200">
                  <CardContent className="p-12 text-center">
                    <Users className="h-24 w-24 mx-auto mb-4 text-[#9CA3AF]" />
                    <h3 className="text-xl font-display font-bold text-[#2C2C2C] mb-2">
                      No positions yet
                    </h3>
                    <p className="text-[#6B6B6B] font-sans">
                      This candidate hasn't held any recorded positions yet.
                    </p>
                    <p className="text-sm text-[#9CA3AF] mt-2">
                      Check back later for updates
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
