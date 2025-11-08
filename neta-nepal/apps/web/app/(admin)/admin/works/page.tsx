import { PrismaClient } from "@prisma/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "HIGH":
        return "bg-green-100 text-green-800"
      case "MEDIUM":
        return "bg-blue-100 text-blue-800"
      case "LOW":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Works</h1>
          <p className="text-muted-foreground mt-2">
            Manage all candidate works and accomplishments
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/works/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Work
          </Link>
        </Button>
      </div>

      {/* Works List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-4 font-semibold">Work</th>
                <th className="p-4 font-semibold">Candidate</th>
                <th className="p-4 font-semibold">Period</th>
                <th className="p-4 font-semibold">Impact</th>
                <th className="p-4 font-semibold">Sources</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {works.map((work) => (
                <tr key={work.id} className="border-b last:border-0 hover:bg-secondary/50">
                  <td className="p-4">
                    <div className="max-w-md">
                      <div className="font-medium line-clamp-2">{work.title}</div>
                      {work.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1 mt-1">
                          {work.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      {work.candidate.name}
                      <div className="text-xs text-muted-foreground">
                        {work.candidate.party.name}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    <div>{new Date(work.startDate).toLocaleDateString()}</div>
                    {work.endDate && (
                      <div>to {new Date(work.endDate).toLocaleDateString()}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <Badge className={getImpactColor(work.impactLevel)}>
                      {work.impactLevel}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {work.sources.length > 0 ? (
                        <Badge variant="outline" className="text-xs">
                          {work.sources.length} source{work.sources.length > 1 ? 's' : ''}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">No sources</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/candidates/${work.candidate.id}?tab=works`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/works/${work.id}/edit`}>
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

        {works.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            No works found. Add your first work to get started.
          </div>
        )}
      </Card>
    </div>
  )
}
