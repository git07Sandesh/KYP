import { PrismaClient } from "@prisma/client"
import { Button, Badge } from "@/components/design-system"
import {
  TableContainer,
  TableScroll,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
} from "@/components/design-system"
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

  const getSeverityColor = (severity: number) => {
    if (severity >= 4) return "text-error"
    if (severity >= 3) return "text-warning"
    return "text-warning"
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ACQUITTED": return "success"
      case "CONVICTED": return "error"
      case "TRIAL":
      case "HEARING":
      case "FILED": return "warning"
      case "UNDER_INVESTIGATION": return "info"
      default: return "default"
    }
  }

  return (
    <div className="space-y-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-dark">Legal Cases</h1>
          <p className="text-base font-sans text-medium mt-sm">
            Manage all legal cases and allegations
          </p>
        </div>
        <Link href="/admin/cases/new">
          <Button variant="accent" icon={<Plus className="h-4 w-4" />}>
            Add Case
          </Button>
        </Link>
      </div>

      {/* Cases List */}
      <TableContainer>
        <TableScroll>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Allegation</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Case #</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Filed Date</TableHead>
                <TableHead align="right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell>
                    <div className="max-w-md">
                      <div className="text-sm font-sans font-medium text-dark line-clamp-2">{caseItem.allegation}</div>
                      {caseItem.courtName && (
                        <div className="text-xs font-sans text-medium mt-xs">
                          {caseItem.courtName}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-sans text-dark">
                      {caseItem.candidate.name}
                      <div className="text-xs font-sans text-muted">
                        {caseItem.candidate.party.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-sans text-dark">
                    {caseItem.caseNumber || <span className="text-muted">N/A</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-xs">
                      <AlertTriangle className={`h-4 w-4 ${getSeverityColor(caseItem.severity)}`} />
                      <span className={`text-sm font-sans font-bold ${getSeverityColor(caseItem.severity)}`}>
                        {caseItem.severity}/5
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(caseItem.status) as any} size="sm">
                      {caseItem.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-sans text-medium">
                    {caseItem.filedDate ? new Date(caseItem.filedDate).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-sm">
                      <Link href={`/candidates/${caseItem.candidate.id}?tab=cases`}>
                        <Button variant="info" size="sm" icon={<Eye className="h-4 w-4" />} />
                      </Link>
                      <Link href={`/admin/cases/${caseItem.id}/edit`}>
                        <Button variant="accent" size="sm" icon={<Edit className="h-4 w-4" />} />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableScroll>
        {cases.length === 0 && (
          <TableEmpty icon={<AlertTriangle className="h-8 w-8" />}>
            No cases found. Add your first case to get started.
          </TableEmpty>
        )}
      </TableContainer>
    </div>
  )
}
