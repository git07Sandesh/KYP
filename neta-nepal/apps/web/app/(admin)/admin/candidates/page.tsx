import { PrismaClient } from "@prisma/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Eye } from "lucide-react"

const prisma = new PrismaClient()

export default async function AdminCandidatesPage() {
  const candidates = await prisma.candidate.findMany({
    include: {
      party: true,
      constituency: {
        include: {
          province: true,
          district: true
        }
      }
    },
    orderBy: {
      updatedAt: "desc"
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800"
      case "DRAFT":
        return "bg-gray-100 text-gray-800"
      case "PENDING_REVIEW":
        return "bg-yellow-100 text-yellow-800"
      case "ARCHIVED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Candidates</h1>
          <p className="text-muted-foreground mt-2">
            Manage all candidates in the system
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/candidates/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Candidate
          </Link>
        </Button>
      </div>

      {/* Candidates List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-4 font-semibold">Candidate</th>
                <th className="p-4 font-semibold">Party</th>
                <th className="p-4 font-semibold">Constituency</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Last Updated</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b last:border-0 hover:bg-secondary/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={candidate.photoUrl || undefined} alt={candidate.name} />
                        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        {candidate.nameNepali && (
                          <div className="text-sm text-muted-foreground">{candidate.nameNepali}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{candidate.party.name}</td>
                  <td className="p-4">
                    <div className="text-sm">
                      {candidate.constituency.name}
                      <div className="text-xs text-muted-foreground">
                        {candidate.constituency.district?.name || candidate.constituency.province.name}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(candidate.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" asChild>
                        <Link href={`/candidates/${candidate.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/admin/candidates/${candidate.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {candidates.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            No candidates found. Add your first candidate to get started.
          </div>
        )}
      </Card>
    </div>
  )
}
