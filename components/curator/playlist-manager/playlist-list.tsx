"use client"

import { useEffect, useState } from "react"
import { useSpotify } from "@/hooks/use-spotify"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, Users, RefreshCw, Music } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import { PlaylistCard } from "./playlist-card"
import { useToast } from "@/hooks/use-toast"

interface Playlist {
  id: string
  name: string
  description: string
  followers: number
  trackCount: number
  lastUpdated: string
  imageUrl: string
}

export function PlaylistList() {
  const { spotify, isLoading: isSpotifyLoading } = useSpotify()
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchPlaylists = async () => {
    if (!spotify) return

    try {
      setIsLoading(true)
      const response = await spotify.currentUser.playlists.playlists()
      
      const formattedPlaylists = response.items.map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description || "",
        followers: playlist.followers?.total || 0,
        trackCount: playlist.tracks?.total || 0,
        lastUpdated: playlist.snapshot_id,
        imageUrl: playlist.images[0]?.url || "",
      }))

      setPlaylists(formattedPlaylists)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch playlists",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (spotify && !isSpotifyLoading) {
      fetchPlaylists()
    }
  }, [spotify, isSpotifyLoading])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Playlists</h2>
          <p className="text-muted-foreground">
            Manage your playlists and track submissions
          </p>
        </div>
        <Button onClick={fetchPlaylists} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  )
}