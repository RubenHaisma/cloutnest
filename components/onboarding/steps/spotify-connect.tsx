"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useOnboardingStore } from "@/hooks/use-onboarding-store"
import { Music2, SparklesIcon, PlayCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function SpotifyConnect() {
  const { data, updateData } = useOnboardingStore()
  const router = useRouter()

  const handleSpotifyConnect = async () => {
    // In a real implementation, this would initiate the Spotify OAuth flow
    updateData({ spotifyProfile: "connected" })
    router.push("/dashboard")
  }

  const skipConnection = () => {
    router.push("/dashboard")
  }

  return (
    <div className="grid gap-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Connect with Spotify</h1>
        <p className="text-muted-foreground">
          {data.role === "artist"
            ? "Link your Spotify artist profile to get started"
            : "Connect your Spotify account to manage your playlists"}
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <Music2 className="h-12 w-12 text-spotify" />
            <SparklesIcon className="h-6 w-6 text-primary" />
            <PlayCircle className="h-12 w-12 text-primary" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">Enhance Your Experience</h3>
            <p className="text-sm text-muted-foreground">
              {data.role === "artist"
                ? "Get insights about your music and reach the right playlists"
                : "Manage your playlists and discover perfect tracks for your audience"}
            </p>
          </div>
        </div>
      </Card>

      <div className="flex flex-col space-y-2">
        <Button onClick={handleSpotifyConnect} className="w-full">
          Connect Spotify
        </Button>
        <Button variant="ghost" onClick={skipConnection} className="w-full">
          Skip for now
        </Button>
      </div>
    </div>
  )
}