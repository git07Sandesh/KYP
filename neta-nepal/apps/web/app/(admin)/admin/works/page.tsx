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
import { Plus, Edit, Eye } from "lucide-react"

const prisma = new PrismaClient()

export default async function AdminWorksPage() {
  const works = await prisma.work.findMany({
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
      startDate: "desc"
    }
  })



  return (
    <div className="space-y-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-dark">Works</h1>
          <p className="text-base font-sans text-medium mt-sm">
            Manage all candidate works and accomplishments
          </p>
        </div>
        <Link href="/admin/works/new">
          <Button variant="accent" icon={<Plus className="h-4 w-4" />}>
            Add Work
          </Button>
        </Link>
      </div>

      {/* Works List */}
      <TableContainer>
        <TableScroll>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Work</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Sources</TableHead>
                <TableHead align="right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {works.map((work) => (
                <TableRow key={work.id}>
                  <TableCell>
                    <div className="max-w-md">
                      <div className="text-sm font-sans font-medium text-dark line-clamp-2">{work.title}</div>
                      {work.description && (
                        <div className="text-xs font-sans text-medium line-clamp-1 mt-xs">
                          {work.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-sans text-dark">
                      {work.candidate.name}
                      <div className="text-xs font-sans text-muted">
                        {work.candidate.party.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-sans text-medium">
                    <div>{new Date(work.startDate).toLocaleDateString()}</div>
                    {work.endDate && (
                      <div>to {new Date(work.endDate).toLocaleDateString()}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={work.impactLevel === 'HIGH' ? 'success' : work.impactLevel === 'MEDIUM' ? 'info' : 'default'}
                      size="sm"
                    >
                      {work.impactLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-xs">
                      {work.sources.length > 0 ? (
                        <span className="px-sm py-xs bg-background border border-background-dark text-dark rounded text-xs font-sans font-medium">
                          {work.sources.length} source{work.sources.length > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-xs font-sans text-muted">No sources</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-sm">
                      <Link href={`/candidates/${work.candidate.id}?tab=works`}>
                        <Button variant="info" size="sm" icon={<Eye className="h-4 w-4" />} />
                      </Link>
                      <Link href={`/admin/works/${work.id}/edit`}>
                        <Button variant="accent" size="sm" icon={<Edit className="h-4 w-4" />} />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableScroll>
        {works.length === 0 && (
          <TableEmpty icon={<Plus className="h-8 w-8" />}>
            No works found. Add your first work to get started.
          </TableEmpty>
        )}
      </TableContainer>
    </div>
  )
}
