import { PrismaClient } from "@prisma/client"
import { Button } from "@/components/design-system"
import { Badge } from "@/components/design-system"
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

export default async function AdminPromisesPage() {
  const promises = await prisma.promise.findMany({
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
      createdAt: "desc"
    }
  })



  return (
    <div className="space-y-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-dark">Promises</h1>
          <p className="text-base font-sans text-medium mt-sm">
            Manage all candidate promises and track fulfillment
          </p>
        </div>
        <Link href="/admin/promises/new">
          <Button variant="accent" icon={<Plus className="h-4 w-4" />}>
            Add Promise
          </Button>
        </Link>
      </div>

      {/* Promises List */}
      <TableContainer>
        <TableScroll>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Promise</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sources</TableHead>
                <TableHead align="right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promises.map((promise) => (
                <TableRow key={promise.id}>
                  <TableCell>
                    <div className="max-w-md">
                      <div className="text-sm font-sans font-medium text-dark line-clamp-2">{promise.text}</div>
                      <div className="text-xs font-sans text-muted mt-xs">
                        {promise.category} • {promise.type}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-sans text-dark">
                      {promise.candidate.name}
                      <div className="text-xs font-sans text-muted">
                        {promise.candidate.party.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-sans text-medium">
                    {promise.announcedDate ? new Date(promise.announcedDate).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={promise.status === 'KEPT' ? 'success' : promise.status === 'IN_PROGRESS' ? 'info' : promise.status === 'BROKEN' ? 'error' : promise.status === 'PARTIALLY_FULFILLED' ? 'warning' : 'default'}
                      size="sm"
                    >
                      {promise.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-xs">
                      {promise.sources.length > 0 ? (
                        <span className="px-sm py-xs bg-background border border-background-dark text-dark rounded text-xs font-sans font-medium">
                          {promise.sources.length} source{promise.sources.length > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-xs font-sans text-muted">No sources</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-sm">
                      <Link href={`/candidates/${promise.candidate.id}?tab=promises`}>
                        <Button variant="info" size="sm" icon={<Eye className="h-4 w-4" />} />
                      </Link>
                      <Link href={`/admin/promises/${promise.id}/edit`}>
                        <Button variant="accent" size="sm" icon={<Edit className="h-4 w-4" />} />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableScroll>
        {promises.length === 0 && (
          <TableEmpty icon={<Plus className="h-8 w-8" />}>
            No promises found. Add your first promise to get started.
          </TableEmpty>
        )}
      </TableContainer>
    </div>
  )
}
