"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, Users, Music, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PlaylistCardProps {
  playlist: {
    id: string
    name: string
    description: string
    followers: number
    trackCount: number
    imageUrl: string
  }
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        {playlist.imageUrl ? (
          <Image
            src={playlist.imageUrl}
            alt={playlist.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <PlayCircle className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold truncate">{playlist.name}</h3>
        {playlist.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {playlist.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              {playlist.followers.toLocaleString()}
            </div>
            <div className="flex items-center">
              <Music className="mr-1 h-4 w-4" />
              {playlist.trackCount} tracks
            </div>
          </div>
          
          <Link href={`/dashboard/curator/playlists/${playlist.id}`}>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Manage
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}