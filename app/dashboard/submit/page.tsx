import { TrackUploadForm } from "@/components/track-upload/upload-form"
import { Card } from "@/components/ui/card"

export default function SubmitTrackPage() {
  return (
    <div className="container mx-auto max-w-2xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Submit Your Track</h1>
        <p className="text-muted-foreground">
          Submit your track to our network of verified playlist curators
        </p>
      </div>

      <TrackUploadForm />
    </div>
  )
}