"use client"

import { PlaylistList } from "@/components/curator/playlist-list"
import { SpotifyAccountInfo } from "@/components/curator/spotify-account-info"
import { useSpotify } from "@/hooks/use-spotify"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { SpotifyConnectButton } from "@/components/spotify/connect-button"

export default function CuratorPlaylistsPage() {
  const { spotify, isLoading, error } = useSpotify()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!spotify) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Connect Your Spotify Account</h2>
          <p className="mt-2 text-muted-foreground">
            Connect your Spotify account to manage your playlists and review tracks
          </p>
          <SpotifyConnectButton className="mt-6" />
        </div>
      </Card>
    )
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Playlists</h1>
      
      {/* Show connected Spotify account info */}
      <SpotifyAccountInfo />
      
      {/* Playlist list */}
      <PlaylistList />
    </div>
  )
}