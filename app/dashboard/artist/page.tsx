"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SpotifyConnectButton } from "@/components/spotify/connect-button"
import { useSpotify } from "@/hooks/use-spotify"
import {
  BarChart3,
  Music,
  PlayCircle,
  TrendingUp,
  Users,
  Loader2,
} from "lucide-react"
import Link from "next/link"

export default function ArtistDashboardPage() {
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
            Connect your Spotify account to start promoting your music
          </p>
          <SpotifyConnectButton className="mt-6" />
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Artist Dashboard</h1>
        <p className="text-muted-foreground">
          Track your music promotion and playlist placements
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Music className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Campaigns</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <PlayCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Playlist Adds</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Reach</p>
              <h3 className="text-2xl font-bold">125K</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Growth Rate</p>
              <h3 className="text-2xl font-bold">+15%</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent Activity</h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Loading activity...</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Top Performing Tracks</h3>
            <Music className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Loading tracks...</p>
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Link href="/dashboard/submit">
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
            <Music className="mr-2 h-4 w-4" />
            Submit New Track
          </Button>
        </Link>
      </div>
    </div>
  )
}