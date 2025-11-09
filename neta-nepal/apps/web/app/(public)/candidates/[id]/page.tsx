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
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-lg font-sans text-text-secondary">Loading candidate profile...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="card-lg max-w-md w-full">
              <div className="text-center">
                <AlertCircle className="h-16 w-16 mx-auto mb-4 text-error" />
                <h2 className="text-2xl font-display font-bold text-text-primary mb-2">
                  {error ? 'Error Loading Candidate' : 'Candidate Not Found'}
                </h2>
                <p className="text-text-secondary mb-6">
                  {error ? 'We encountered an error while loading the candidate profile.' : 'The candidate you\'re looking for doesn\'t exist.'}
                </p>
                <Link href="/candidates">
                  <Button className="btn-base btn-primary">
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
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/candidates">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-2 border-default hover:border-primary hover:bg-primary-light/10 transition-all"
                >
                  ← Back
                </Button>
              </Link>
              <h1 className="text-xl md:text-2xl font-display font-bold text-text-primary hidden sm:block">
                {candidate.name}
              </h1>
            </div>
            <Button className="btn-base bg-accent hover:bg-accent-dark text-white">
              Share Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Candidate Header Card */}
        <Card className="mb-6 border-2 border-accent shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row items-stretch">
              {/* Large Profile Photo Section */}
              <div className="w-full md:w-64 lg:w-80 bg-accent flex items-center justify-center shrink-0">
                <div className="w-full aspect-[3/4] relative">
                  {candidate.photoUrl ? (
                    <img
                      src={candidate.photoUrl}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-accent">
                      <span className="text-8xl font-display font-bold text-white">
                        {candidate.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Candidate Info Section */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative bg-background">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark mb-3">
                  {candidate.name}
                </h1>
                <p className="text-lg md:text-xl text-medium font-sans mb-6">उम्मेदवारको नाम</p>
                
                <div className="flex flex-wrap gap-3 items-center mb-4">
                  <Badge className="bg-accent text-white px-5 py-2 text-base font-semibold rounded-md">
                    {candidate.party?.name}
                  </Badge>
                  <span className="text-base md:text-lg text-medium font-sans">
                    {candidate.constituency?.name}, {candidate.constituency?.province?.name}
                  </span>
                </div>

                {/* Verified Badge - Absolute positioned */}
                {candidate.isVerified && (
                  <div className="absolute top-6 right-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-accent flex flex-col items-center justify-center bg-white shadow-lg">
                      <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-accent mb-1" />
                      <span className="text-xs font-bold text-accent uppercase">Verified</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Report Card */}
        <Card className="mb-6 shadow-md border-2 border-gray-200">
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-white text-center py-8 px-6 border-b-2 border-gray-200">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-accent uppercase tracking-wider mb-2">
                Performance Report Card
              </h2>
              <p className="text-sm text-medium font-sans">Official Performance Metrics</p>
            </div>

            {/* Performance Table */}
            <div className="overflow-x-auto bg-white">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-accent">
                    <th className="text-left py-4 px-6 font-display font-semibold text-accent uppercase text-sm tracking-wide">
                      Metric
                    </th>
                    <th className="text-center py-4 px-4 font-display font-semibold text-accent uppercase text-sm tracking-wide">
                      Score / Rate
                    </th>
                    <th className="text-center py-4 px-4 font-display font-semibold text-accent uppercase text-sm tracking-wide">
                      Grade
                    </th>
                    <th className="text-left py-4 px-6 font-display font-semibold text-accent uppercase text-sm tracking-wide hidden lg:table-cell">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Impact Score */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-display font-semibold text-accent text-base">
                      Impact Score
                    </td>
                    <td className="py-4 px-4 text-center font-sans text-dark font-medium text-base">
                      {candidate.impactScore?.toFixed(1) || '0.0'} / 5.0
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-display font-bold text-base ${
                        (candidate.impactScore || 0) >= 4.5 ? 'bg-success text-white' :
                        (candidate.impactScore || 0) >= 3.5 ? 'bg-info text-white' :
                        (candidate.impactScore || 0) >= 2.5 ? 'bg-warning text-white' :
                        'bg-error text-white'
                      }`}>
                        {(candidate.impactScore || 0) >= 4.5 ? 'A+' :
                         (candidate.impactScore || 0) >= 4.0 ? 'A' :
                         (candidate.impactScore || 0) >= 3.5 ? 'B+' :
                         (candidate.impactScore || 0) >= 3.0 ? 'B' :
                         (candidate.impactScore || 0) >= 2.5 ? 'C' :
                         (candidate.impactScore || 0) >= 2.0 ? 'D' : 'F'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-medium font-sans text-sm hidden lg:table-cell">
                      {(candidate.impactScore || 0) >= 4.0 ? 'High overall effectiveness in legislative duties.' :
                       (candidate.impactScore || 0) >= 3.0 ? 'Moderate effectiveness in legislative work.' :
                       (candidate.impactScore || 0) >= 2.0 ? 'Below average legislative impact.' :
                       'Low impact; requires significant improvement.'}
                    </td>
                  </tr>

                  {/* Fulfillment Rate */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-display font-semibold text-accent text-base">
                      Fulfillment Rate
                    </td>
                    <td className="py-4 px-4 text-center font-sans text-dark font-medium text-base">
                      {candidate.fulfillmentRate?.toFixed(0) || '0'}%
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-display font-bold text-base ${
                        (candidate.fulfillmentRate || 0) >= 80 ? 'bg-success text-white' :
                        (candidate.fulfillmentRate || 0) >= 60 ? 'bg-info text-white' :
                        (candidate.fulfillmentRate || 0) >= 40 ? 'bg-warning text-white' :
                        'bg-error text-white'
                      }`}>
                        {(candidate.fulfillmentRate || 0) >= 80 ? 'A' :
                         (candidate.fulfillmentRate || 0) >= 70 ? 'B+' :
                         (candidate.fulfillmentRate || 0) >= 60 ? 'B' :
                         (candidate.fulfillmentRate || 0) >= 50 ? 'C+' :
                         (candidate.fulfillmentRate || 0) >= 40 ? 'C' :
                         (candidate.fulfillmentRate || 0) >= 30 ? 'D' : 'F'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-medium font-sans text-sm hidden lg:table-cell">
                      {(candidate.fulfillmentRate || 0) >= 70 ? 'Strong track record of promises kept from manifesto.' :
                       (candidate.fulfillmentRate || 0) >= 50 ? 'Moderate rate of promises kept from manifesto.' :
                       (candidate.fulfillmentRate || 0) >= 30 ? 'Below expectations in promise fulfillment.' :
                       'Poor record of keeping campaign promises.'}
                    </td>
                  </tr>

                  {/* Attendance (if available) */}
                  {candidate.attendance && (
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-display font-semibold text-accent text-base">
                        Attendance
                      </td>
                      <td className="py-4 px-4 text-center font-sans text-dark font-medium text-base">
                        {candidate.attendance}%
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-display font-bold text-base ${
                          candidate.attendance >= 90 ? 'bg-success text-white' :
                          candidate.attendance >= 75 ? 'bg-info text-white' :
                          candidate.attendance >= 60 ? 'bg-warning text-white' :
                          'bg-error text-white'
                        }`}>
                          {candidate.attendance >= 90 ? 'A+' :
                           candidate.attendance >= 85 ? 'A' :
                           candidate.attendance >= 75 ? 'B+' :
                           candidate.attendance >= 65 ? 'B' :
                           candidate.attendance >= 60 ? 'C' : 'D'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-medium font-sans text-sm hidden lg:table-cell">
                        {candidate.attendance >= 85 ? 'Excellent presence in parliamentary sessions.' :
                         candidate.attendance >= 70 ? 'Good attendance record.' :
                         'Below average attendance; needs improvement.'}
                      </td>
                    </tr>
                  )}

                  {/* Scandal Score (inverted - lower is better) */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-display font-semibold text-accent text-base">
                      Scandal Score
                    </td>
                    <td className="py-4 px-4 text-center font-sans text-dark font-medium text-base">
                      {candidate.scandalScore?.toFixed(1) || '0.0'} / 5.0
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-display font-bold text-base ${
                        (candidate.scandalScore || 0) <= 1.0 ? 'bg-success text-white' :
                        (candidate.scandalScore || 0) <= 2.0 ? 'bg-info text-white' :
                        (candidate.scandalScore || 0) <= 3.0 ? 'bg-warning text-white' :
                        'bg-error text-white'
                      }`}>
                        {(candidate.scandalScore || 0) <= 0.5 ? 'A+' :
                         (candidate.scandalScore || 0) <= 1.0 ? 'A' :
                         (candidate.scandalScore || 0) <= 1.5 ? 'B+' :
                         (candidate.scandalScore || 0) <= 2.0 ? 'B' :
                         (candidate.scandalScore || 0) <= 2.5 ? 'C' :
                         (candidate.scandalScore || 0) <= 3.5 ? 'D' : 'F'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-medium font-sans text-sm hidden lg:table-cell">
                      {(candidate.scandalScore || 0) <= 1.0 ? 'Clean record with minimal controversy.' :
                       (candidate.scandalScore || 0) <= 2.0 ? 'Some minor controversies noted.' :
                       (candidate.scandalScore || 0) <= 3.0 ? 'Some controversy; requires improvement.' :
                       'Significant controversies; requires immediate attention.'}
                    </td>
                  </tr>

                  {/* Public Trust Index (if available) */}
                  {candidate.trustScore && (
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-display font-semibold text-accent text-base">
                        Public Trust Index
                      </td>
                      <td className="py-4 px-4 text-center font-sans text-dark font-medium text-base">
                        {candidate.trustScore?.toFixed(1) || '0.0'} / 10
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-display font-bold text-base ${
                          (candidate.trustScore || 0) >= 8.0 ? 'bg-success text-white' :
                          (candidate.trustScore || 0) >= 6.5 ? 'bg-info text-white' :
                          (candidate.trustScore || 0) >= 5.0 ? 'bg-warning text-white' :
                          'bg-error text-white'
                        }`}>
                          {(candidate.trustScore || 0) >= 8.5 ? 'A+' :
                           (candidate.trustScore || 0) >= 8.0 ? 'A' :
                           (candidate.trustScore || 0) >= 7.0 ? 'B+' :
                           (candidate.trustScore || 0) >= 6.0 ? 'B' :
                           (candidate.trustScore || 0) >= 5.0 ? 'C' :
                           (candidate.trustScore || 0) >= 4.0 ? 'D' : 'F'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-medium font-sans text-sm hidden lg:table-cell">
                        {(candidate.trustScore || 0) >= 7.5 ? 'Strong level of trust among constituents.' :
                         (candidate.trustScore || 0) >= 6.0 ? 'Moderate public trust level.' :
                         (candidate.trustScore || 0) >= 4.5 ? 'Below average public trust.' :
                         'Low public trust; requires significant improvement.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Biography Section */}
        {candidate.bio && (
          <Card className="mb-6 shadow-md border-2 border-gray-200">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl font-display font-bold text-accent mb-4">Biography</h3>
              <p className="text-base text-medium leading-relaxed font-sans whitespace-pre-line">
                {candidate.bio}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-surface rounded-xl p-1.5 shadow-md border border-default">
            <TabsTrigger 
              value="overview"
              className="rounded-lg font-semibold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="works"
              className="rounded-lg font-semibold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              <Briefcase className="h-4 w-4 mr-1 inline md:hidden" />
              Works ({candidate.works?.length || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="promises"
              className="rounded-lg font-semibold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              <Target className="h-4 w-4 mr-1 inline md:hidden" />
              Promises ({candidate.promises?.length || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="cases"
              className="rounded-lg font-semibold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              <Scale className="h-4 w-4 mr-1 inline md:hidden" />
              Cases ({candidate.cases?.length || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="rumors"
              className="rounded-lg font-semibold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              <MessageSquare className="h-4 w-4 mr-1 inline md:hidden" />
              Rumors ({candidate.rumors?.length || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="posts"
              className="rounded-lg font-semibold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              <Users className="h-4 w-4 mr-1 inline md:hidden" />
              Posts ({candidate.posts?.length || 0})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Summary Statistics */}
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-bold text-text-primary">
                  Summary Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Works Completed */}
                  <div className="bg-info-light rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                    <Briefcase className="h-8 w-8 mx-auto mb-2 text-info" />
                    <p className="text-4xl font-display font-bold text-info">
                      {candidate.works?.length || 0}
                    </p>
                    <p className="text-sm text-text-secondary font-medium mt-1">Works Completed</p>
                  </div>

                  {/* Promises Made */}
                  <div className="bg-success-light rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                    <Target className="h-8 w-8 mx-auto mb-2 text-success" />
                    <p className="text-4xl font-display font-bold text-success">
                      {candidate.promises?.length || 0}
                    </p>
                    <p className="text-sm text-text-secondary font-medium mt-1">Promises Made</p>
                  </div>

                  {/* Legal Cases */}
                  <div className="bg-warning-light rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                    <Scale className="h-8 w-8 mx-auto mb-2 text-warning" />
                    <p className="text-4xl font-display font-bold text-warning">
                      {candidate.cases?.length || 0}
                    </p>
                    <p className="text-sm text-text-secondary font-medium mt-1">Legal Cases</p>
                  </div>

                  {/* Positions Held */}
                  <div className="bg-purple-100 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                    <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-4xl font-display font-bold text-purple-600">
                      {candidate.posts?.length || 0}
                    </p>
                    <p className="text-sm text-text-secondary font-medium mt-1">Positions Held</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-bold text-text-primary">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-text-muted" />
                  <p className="text-text-secondary font-sans">
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
                <Card className="card">
                  <CardContent className="p-12 text-center">
                    <Briefcase className="h-24 w-24 mx-auto mb-4 text-text-muted" />
                    <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                      No works yet
                    </h3>
                    <p className="text-text-secondary font-sans">
                      This candidate hasn't recorded any works yet.
                    </p>
                    <p className="text-sm text-text-muted mt-2">
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
                <Card className="card">
                  <CardContent className="p-12 text-center">
                    <Target className="h-24 w-24 mx-auto mb-4 text-text-muted" />
                    <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                      No promises yet
                    </h3>
                    <p className="text-text-secondary font-sans">
                      This candidate hasn't made any recorded promises yet.
                    </p>
                    <p className="text-sm text-text-muted mt-2">
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
                <Card className="card">
                  <CardContent className="p-12 text-center">
                    <Scale className="h-24 w-24 mx-auto mb-4 text-text-muted" />
                    <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                      No legal cases
                    </h3>
                    <p className="text-text-secondary font-sans">
                      This candidate has no recorded legal cases.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Rumors Tab */}
          <TabsContent value="rumors">
            <div className="alert-error mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-error flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-error-dark font-display text-lg mb-1">
                    🚨 Unverified Claims - Shown for Transparency
                  </p>
                  <p className="text-sm text-error font-sans">
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
                <Card className="card">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-24 w-24 mx-auto mb-4 text-text-muted" />
                    <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                      No active rumors
                    </h3>
                    <p className="text-text-secondary font-sans">
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
                  <Card key={post.id} className="card hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Users className="h-5 w-5 text-primary" />
                            <h3 className="font-display font-bold text-lg text-text-primary">
                              {post.position}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-text-secondary">
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
                          <Badge className="badge-success text-white px-3 py-1 text-xs font-semibold rounded-full">
                            Current
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="card">
                  <CardContent className="p-12 text-center">
                    <Users className="h-24 w-24 mx-auto mb-4 text-text-muted" />
                    <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                      No positions yet
                    </h3>
                    <p className="text-text-secondary font-sans">
                      This candidate hasn't held any recorded positions yet.
                    </p>
                    <p className="text-sm text-text-muted mt-2">
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
