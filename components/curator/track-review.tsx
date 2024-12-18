"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Music, Check, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Track {
  id: string
  title: string
  artist: string
  genre: string
  spotifyUri: string
  payment: number
}

interface TrackReviewProps {
  track: Track
  playlists: { id: string; name: string }[]
  onReview: (trackId: string, accepted: boolean, playlistId?: string) => Promise<void>
}

export function TrackReview({ track, playlists, onReview }: TrackReviewProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleReview = async (accepted: boolean) => {
    try {
      setIsLoading(true)
      if (accepted && !selectedPlaylist) {
        toast({
          title: "Please select a playlist",
          description: "You must select a playlist to accept this track",
          variant: "destructive",
        })
        return
      }
      await onReview(track.id, accepted, selectedPlaylist)
      toast({
        title: accepted ? "Track accepted" : "Track rejected",
        description: accepted
          ? `Track will be added to playlist and you'll receive $${track.payment}`
          : "Track has been rejected",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process review",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10">
            <Music className="h-6 w-6 text-cyan-500" />
          </div>
          <div>
            <h3 className="font-semibold">{track.title}</h3>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">${track.payment}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center space-x-4">
        <Select
          value={selectedPlaylist}
          onValueChange={setSelectedPlaylist}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select playlist" />
          </SelectTrigger>
          <SelectContent>
            {playlists.map((playlist) => (
              <SelectItem key={playlist.id} value={playlist.id}>
                {playlist.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
    </Card>
  )
}