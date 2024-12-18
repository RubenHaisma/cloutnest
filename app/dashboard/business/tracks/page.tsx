import { TrackQueue } from "@/components/curator/track-queue"
import { Card } from "@/components/ui/card"

export default function ReviewTracksPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Review Tracks</h1>
        <p className="text-muted-foreground">
          Review and manage track submissions for your playlists
        </p>
      </div>

      <Card className="p-6">
        <TrackQueue />
      </Card>
    </div>
  )
}