"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Music, PlayCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { useLoadingState } from "@/hooks/use-loading-state"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { trackEvent, Events } from "@/lib/analytics/track-events"

interface Track {
  id: string
  title: string
  artist: string
  genre: string
  spotifyUrl: string
  previewUrl?: string
  submittedAt: string
}

interface TrackQueueProps {
  playlistId?: string
}

export function TrackQueue({ playlistId }: TrackQueueProps) {
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const { toast } = useToast()
  const {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setLoadingError
  } = useLoadingState(true)

  useEffect(() => {
    fetchTracks()
    return () => {
      if (audio) {
        audio.pause()
        audio.src = ""
      }
    }
  }, [playlistId])

  const fetchTracks = async () => {
    try {
      startLoading()
      const response = await fetch(`/api/curator/tracks${playlistId ? `?playlistId=${playlistId}` : ''}`)
      if (!response.ok) throw new Error("Failed to fetch tracks")
      const data = await response.json()
      setTracks(data.tracks)
      if (data.tracks.length > 0) {
        setCurrentTrack(data.tracks[0])
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load tracks"
      setLoadingError(new Error(message))
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    } finally {
      stopLoading()
    }
  }

  const handlePlayPreview = (track: Track) => {
    if (!track.previewUrl) {
      toast({
        title: "Preview Unavailable",
        description: "No preview available for this track",
        variant: "destructive",
      })
      return
    }

    if (audio) {
      audio.pause()
    }

    const newAudio = new Audio(track.previewUrl)
    newAudio.addEventListener('ended', () => setIsPlaying(false))
    newAudio.play()
    setAudio(newAudio)
    setIsPlaying(true)
  }

  const handleStopPreview = () => {
    if (audio) {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const handleReview = async (accepted: boolean) => {
    if (!currentTrack) return

    try {
      startLoading()
      const response = await fetch("/api/curator/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackId: currentTrack.id,
          playlistId,
          action: accepted ? "accept" : "reject",
        }),
      })

      if (!response.ok) throw new Error("Failed to process review")

      // Track analytics event
      await trackEvent({
        event: Events.TRACK_REVIEWED,
        properties: {
          trackId: currentTrack.id,
          playlistId,
          action: accepted ? "accept" : "reject",
        },
      })

      // Stop audio if playing
      handleStopPreview()

      toast({
        title: accepted ? "Track Accepted" : "Track Rejected",
        description: accepted 
          ? `${currentTrack.title} has been added to your playlist`
          : `${currentTrack.title} has been rejected`,
      })

      // Move to next track
      const nextTrack = tracks[tracks.indexOf(currentTrack) + 1] || null
      setCurrentTrack(nextTrack)
      setTracks(tracks.filter(t => t.id !== currentTrack.id))
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to process review"
      setLoadingError(new Error(message))
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    } finally {
      stopLoading()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load tracks"
        message={error.message}
        className="m-8"
      />
    )
  }

  if (!currentTrack) {
    return (
      <Card className="p-8 text-center">
        <Music className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No tracks to review</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          All tracks have been reviewed. Check back later for new submissions.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{currentTrack.title}</h3>
            <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
          </div>
          <Badge>{currentTrack.genre}</Badge>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => isPlaying ? handleStopPreview() : handlePlayPreview(currentTrack)}
            >
              {isPlaying ? (
                <span className="h-4 w-4 bg-primary rounded-sm" />
              ) : (
                <PlayCircle className="h-4 w-4" />
              )}
            </Button>
            <span className="text-sm text-muted-foreground">
              Submitted {formatDistanceToNow(new Date(currentTrack.submittedAt), { addSuffix: true })}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10"
              onClick={() => handleReview(false)}
              disabled={isLoading}
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              className="bg-cyan-500 hover:bg-cyan-600"
              onClick={() => handleReview(true)}
              disabled={isLoading}
            >
              <Check className="mr-2 h-4 w-4" />
              Accept
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between px-2">
        <span className="text-sm text-muted-foreground">
          {tracks.length} tracks remaining
        </span>
        <Button variant="ghost" size="sm" onClick={fetchTracks}>
          <Loader2 className="mr-2 h-4 w-4" />
          Refresh Queue
        </Button>
      </div>
    </div>
  )
}