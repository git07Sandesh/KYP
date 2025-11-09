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
        return "bg-success-light text-success"
      case "DRAFT":
        return "bg-background-dark text-medium"
      case "PENDING_REVIEW":
        return "bg-warning-light text-warning"
      case "ARCHIVED":
        return "bg-error-light text-error"
      default:
        return "bg-background-dark text-medium"
    }
  }

  return (
    <div className="space-y-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-dark">Candidates</h1>
          <p className="text-base font-sans text-medium mt-sm">
            Manage all candidates in the system
          </p>
        </div>
        <Link href="/admin/candidates/new" className="flex items-center gap-sm px-lg py-md bg-accent text-white font-sans font-semibold rounded-lg hover:bg-accent-light transition-fast shadow-md">
          <Plus className="h-4 w-4" />
          Add Candidate
        </Link>
      </div>

      {/* Candidates List */}
      <div className="bg-white rounded-xl shadow-md border border-background-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b-2 border-background-dark">
              <tr className="text-left">
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Candidate</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Party</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Constituency</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Status</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide">Last Updated</th>
                <th className="p-base font-sans font-semibold text-sm text-dark uppercase tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b border-background-dark last:border-0 hover:bg-background transition-fast">
                  <td className="p-base">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-primary flex items-center justify-center shrink-0">
                        {candidate.photoUrl ? (
                          <img src={candidate.photoUrl} alt={candidate.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-base font-display font-semibold text-white">{candidate.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-sans font-semibold text-dark">{candidate.name}</div>
                        {candidate.nameNepali && (
                          <div className="text-xs font-sans text-medium">{candidate.nameNepali}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-base text-sm font-sans text-dark">{candidate.party.name}</td>
                  <td className="p-base">
                    <div className="text-sm font-sans text-dark">
                      {candidate.constituency.name}
                      <div className="text-xs font-sans text-muted">
                        {candidate.constituency.district?.name || candidate.constituency.province.name}
                      </div>
                    </div>
                  </td>
                  <td className="p-base">
                    <span className={`px-md py-xs rounded text-xs font-sans font-semibold ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="p-base text-sm font-sans text-medium">
                    {new Date(candidate.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="p-base">
                    <div className="flex items-center justify-end gap-sm">
                      <Link href={`/candidates/${candidate.id}`} className="w-8 h-8 flex items-center justify-center bg-info-light text-info rounded hover:bg-info hover:text-white transition-fast">
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link href={`/admin/candidates/${candidate.id}/edit`} className="w-8 h-8 flex items-center justify-center bg-accent-light text-accent rounded hover:bg-accent hover:text-white transition-fast">
                        <Edit className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {candidates.length === 0 && (
          <div className="p-3xl text-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-lg">
              <Plus className="h-8 w-8 text-muted" />
            </div>
            <p className="text-base font-sans text-medium">No candidates found. Add your first candidate to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
