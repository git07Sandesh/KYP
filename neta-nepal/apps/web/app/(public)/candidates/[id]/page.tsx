'use client'

import { useCandidate } from '@repo/shared-logic'
import { use } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CandidateCard } from '@/components/domain/CandidateCard'
import { PromiseCard } from '@/components/domain/PromiseCard'
import { WorkCard } from '@/components/domain/WorkCard'
import { CaseCard } from '@/components/domain/CaseCard'
import { RumorCard } from '@/components/domain/RumorCard'
import { ScoreBadge } from '@/components/domain/ScoreBadge'

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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-lg">Loading candidate profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-lg text-red-600">
              {error ? 'Error loading candidate' : 'Candidate not found'}
            </p>
            <Link href="/candidates">
              <Button className="mt-4">Back to Candidates</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const candidate = (data as any).candidate

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/candidates">
                <Button variant="outline" size="sm">
                  ← Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">{candidate.name}</h1>
            </div>
            <Button>Share Profile</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <Avatar className="h-32 w-32">
                <AvatarImage src={candidate.photoUrl || undefined} alt={candidate.name} />
                <AvatarFallback className="text-3xl">{candidate.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {candidate.isVerified && <Badge variant="default">✓ Verified</Badge>}
                  {candidate.hasAllegations && <Badge variant="secondary">⚠ Allegations</Badge>}
                  {candidate.hasCriminalCases && <Badge variant="destructive">❗ Criminal Cases</Badge>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Party</p>
                    <p className="font-semibold">{candidate.party?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Constituency</p>
                    <p className="font-semibold">
                      {candidate.constituency?.name}, {candidate.constituency?.province?.name}
                    </p>
                  </div>
                  {candidate.age && (
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-semibold">{candidate.age} years</p>
                    </div>
                  )}
                  {candidate.yearsInPolitics && (
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-semibold">{candidate.yearsInPolitics} years in politics</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <ScoreBadge
                    value={candidate.impactScore || 0}
                    type="impact"
                    size="lg"
                  />
                  <ScoreBadge
                    value={candidate.fulfillmentRate || 0}
                    type="fulfillment"
                    size="lg"
                  />
                  <ScoreBadge
                    value={candidate.scandalScore || 0}
                    type="scandal"
                    size="lg"
                  />
                </div>
              </div>
            </div>

            {candidate.bio && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-2">Biography</h3>
                <p className="text-gray-700">{candidate.bio}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="works">Works ({candidate.works?.length || 0})</TabsTrigger>
            <TabsTrigger value="promises">Promises ({candidate.promises?.length || 0})</TabsTrigger>
            <TabsTrigger value="cases">Cases ({candidate.cases?.length || 0})</TabsTrigger>
            <TabsTrigger value="rumors">Rumors ({candidate.rumors?.length || 0})</TabsTrigger>
            <TabsTrigger value="posts">Posts ({candidate.posts?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Summary Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded">
                      <p className="text-3xl font-bold text-blue-600">{candidate.works?.length || 0}</p>
                      <p className="text-sm text-gray-600">Works Completed</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded">
                      <p className="text-3xl font-bold text-green-600">{candidate.promises?.length || 0}</p>
                      <p className="text-sm text-gray-600">Promises Made</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded">
                      <p className="text-3xl font-bold text-yellow-600">{candidate.cases?.length || 0}</p>
                      <p className="text-sm text-gray-600">Legal Cases</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded">
                      <p className="text-3xl font-bold text-purple-600">{candidate.posts?.length || 0}</p>
                      <p className="text-sm text-gray-600">Positions Held</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Check other tabs for detailed information</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="works">
            <div className="grid gap-4">
              {candidate.works && candidate.works.length > 0 ? (
                candidate.works.map((work: any) => (
                  <WorkCard work={work} key={work.id} />
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500">No works recorded yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="promises">
            <div className="grid gap-4">
              {candidate.promises && candidate.promises.length > 0 ? (
                candidate.promises.map((promise: any) => (
                  <PromiseCard promise={promise} key={promise.id} />
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500">No promises recorded yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="cases">
            <div className="grid gap-4">
              {candidate.cases && candidate.cases.length > 0 ? (
                candidate.cases.map((legalCase: any) => (
                  <CaseCard legalCase={legalCase} key={legalCase.id} />
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500">No legal cases recorded</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rumors">
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-600 rounded">
              <p className="font-semibold text-red-800">🚨 Unverified Claims - Shown for Transparency</p>
              <p className="text-sm text-red-700 mt-1">
                These are NOT verified and may be false. Auto-expire after 60 days.
              </p>
            </div>
            <div className="grid gap-4">
              {candidate.rumors && candidate.rumors.length > 0 ? (
                candidate.rumors.map((rumor: any) => (
                  <RumorCard rumor={rumor} key={rumor.id} />
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500">No active rumors</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <div className="grid gap-4">
              {candidate.posts && candidate.posts.length > 0 ? (
                candidate.posts.map((post: any) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{post.position}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(post.startDate).toLocaleDateString()} - {' '}
                            {post.endDate
                              ? new Date(post.endDate).toLocaleDateString()
                              : 'Present'}
                          </p>
                        </div>
                        {post.isCurrent && (
                          <Badge variant="default">Current</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500">No positions recorded yet</p>
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
