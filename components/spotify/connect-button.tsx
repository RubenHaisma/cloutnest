"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Music } from "lucide-react"
import { useState } from "react"

interface SpotifyConnectButtonProps {
  onSuccess?: () => void
  className?: string
}

export function SpotifyConnectButton({ onSuccess, className }: SpotifyConnectButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/spotify/connect")
      
      if (!response.ok) {
        throw new Error("Failed to connect Spotify")
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect Spotify account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isLoading}
      className={`bg-[#1DB954] hover:bg-[#1ed760] text-white ${className}`}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Music className="mr-2 h-4 w-4" />
      )}
      Connect Spotify
    </Button>
  )
}