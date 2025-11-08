import { PrismaClient } from "@prisma/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Eye, AlertTriangle } from "lucide-react"

const prisma = new PrismaClient()

export default async function AdminCasesPage() {
  const cases = await prisma.case.findMany({
    include: {
      candidate: {
        select: {
          id: true,
          name: true,
          nameNepali: true,
          party: {
            select: { name: true }
          }
        }
      },
      sources: true
    },
    orderBy: {
      filedDate: "desc"
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACQUITTED":
        return "bg-green-100 text-green-800"
      case "CONVICTED":
        return "bg-red-100 text-red-800"
      case "TRIAL":
      case "HEARING":
        return "bg-yellow-100 text-yellow-800"
      case "UNDER_INVESTIGATION":
        return "bg-blue-100 text-blue-800"
      case "FILED":
        return "bg-orange-100 text-orange-800"
      case "WITHDRAWN":
      case "CLOSED":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: number) => {
    if (severity >= 4) return "text-red-600"
    if (severity >= 3) return "text-orange-600"
    return "text-yellow-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Legal Cases</h1>
          <p className="text-muted-foreground mt-2">
            Manage all legal cases and allegations
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/cases/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Case
          </Link>
        </Button>
      </div>

      {/* Cases List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-4 font-semibold">Allegation</th>
                <th className="p-4 font-semibold">Candidate</th>
                <th className="p-4 font-semibold">Case #</th>
                <th className="p-4 font-semibold">Severity</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Filed Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem) => (
                <tr key={caseItem.id} className="border-b last:border-0 hover:bg-secondary/50">
                  <td className="p-4">
                    <div className="max-w-md">
                      <div className="font-medium line-clamp-2">{caseItem.allegation}</div>
                      {caseItem.courtName && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {caseItem.courtName}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      {caseItem.candidate.name}
                      <div className="text-xs text-muted-foreground">
                        {caseItem.candidate.party.name}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    {caseItem.caseNumber || <span className="text-muted-foreground">N/A</span>}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className={`h-4 w-4 ${getSeverityColor(caseItem.severity)}`} />
                      <span className={`font-medium ${getSeverityColor(caseItem.severity)}`}>
                        {caseItem.severity}/5
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(caseItem.status)}>
                      {caseItem.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {caseItem.filedDate ? new Date(caseItem.filedDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/candidates/${caseItem.candidate.id}?tab=cases`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/cases/${caseItem.id}/edit`}>
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

        {cases.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            No cases found. Add your first case to get started.
          </div>
        )}
      </Card>
    </div>
  )
}
