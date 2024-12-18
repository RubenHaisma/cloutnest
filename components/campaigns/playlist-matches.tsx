"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Music2, PlayCircle, Sparkles } from "lucide-react"

// Mock data - in a real app, this would be fetched from an API
const playlists = [
  {
    id: 1,
    name: "Summer Hits 2024",
    curator: "Alex Thompson",
    followers: "245K",
    tracks: 125,
    status: "added",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    matchScore: 95,
  },
  {
    id: 2,
    name: "Indie Summer Vibes",
    curator: "Sarah Wilson",
    followers: "128K",
    tracks: 85,
    status: "pending",
    image: "https://images.unsplash.com/photo-1534854638093-bada1813ca19",
    matchScore: 88,
  },
  {
    id: 3,
    name: "Beach Party 2024",
    curator: "Mike Davis",
    followers: "182K",
    tracks: 150,
    status: "reviewing",
    image: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778",
    matchScore: 82,
  },
]

interface PlaylistMatchesProps {
  campaignId: string
}

export function PlaylistMatches({ campaignId }: PlaylistMatchesProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={playlist.image} alt={playlist.name} />
                <AvatarFallback>
                  <PlayCircle className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{playlist.name}</h3>
                  <Badge variant={playlist.status === "added" ? "default" : "secondary"}>
                    {playlist.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Curated by {playlist.curator}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {playlist.followers} followers
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Music2 className="mr-1 h-4 w-4" />
                    {playlist.tracks} tracks
                  </div>
                  <div className="flex items-center text-sm font-medium">
                    <Sparkles className="mr-1 h-4 w-4 text-primary" />
                    {playlist.matchScore}% match
                  </div>
                </div>
              </div>
              <Button variant="outline">View Playlist</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}