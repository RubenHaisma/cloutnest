"use client"

import { useCuratorPlaylists } from "@/hooks/use-curator-playlists"
import { Loader2 } from "lucide-react"

export function PlaylistList() {
  const { playlists, isLoading, error } = useCuratorPlaylists()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>Failed to load playlists</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (!playlists || playlists.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>No playlists found</p>
        <p className="text-sm">Create a playlist in Spotify to get started</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {playlists.map((playlist) => {
        const imageUrl = playlist?.images?.[0]?.url;
        const name = playlist?.name || 'Untitled Playlist';
        const tracksCount = playlist?.tracks?.total || 0;
        const owner = playlist?.owner?.display_name || 'Unknown';
  
        return (
          <div
            key={playlist.id}
            className="group relative rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="h-16 w-16 rounded-md object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
                  <span className="text-2xl">🎵</span>
                </div>
              )}
              <div className="flex-1 space-y-1 overflow-hidden">
                <h3 className="font-medium leading-none truncate">{name}</h3>
                <p className="text-sm text-muted-foreground">
                  By {owner}
                </p>
                <p className="text-xs text-muted-foreground">
                  {tracksCount} {tracksCount === 1 ? 'track' : 'tracks'}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}