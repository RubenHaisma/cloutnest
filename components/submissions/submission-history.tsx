"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { Music, PlayCircle, ExternalLink } from "lucide-react"

interface Submission {
  id: string
  title: string
  artist: string
  genre: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  playlistAdds: number
  totalReach: number
}

export function SubmissionHistory() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("/api/tracks/submissions")
        if (!response.ok) throw new Error("Failed to fetch submissions")
        const data = await response.json()
        setSubmissions(data.submissions)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load submission history",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubmissions()
  }, [toast])

  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <p>Loading submission history...</p>
      </Card>
    )
  }

  if (submissions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Music className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No submissions yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your track submissions will appear here
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <Card key={submission.id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{submission.title}</h3>
                <Badge
                  variant={
                    submission.status === "approved"
                      ? "default"
                      : submission.status === "rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {submission.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {submission.artist} • {submission.genre}
              </p>
              <p className="text-xs text-muted-foreground">
                Submitted on {format(new Date(submission.submittedAt), "PPP")}
              </p>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Spotify
            </Button>
          </div>

          {submission.status === "approved" && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 rounded-lg border p-3">
                <PlayCircle className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{submission.playlistAdds}</p>
                  <p className="text-xs text-muted-foreground">Playlist Adds</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-3">
                <Music className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{submission.totalReach}</p>
                  <p className="text-xs text-muted-foreground">Total Reach</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}