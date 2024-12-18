"use client"

import { useSession, signIn } from "next-auth/react"
import { Loader2, RefreshCcw, Music, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function SpotifyAccountInfo() {
  const { data: session, update: updateSession } = useSession()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)

  const spotifyProfile = session?.user?.spotifyProfile

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch("/api/curator/playlists", {
        method: "POST",
      })
      
      if (!response.ok) {
        throw new Error("Failed to refresh playlists")
      }

      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh playlists",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const response = await fetch("/api/curator/spotify/connect")
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
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    setIsDisconnecting(true)
    try {
      const response = await fetch("/api/curator/spotify/disconnect", {
        method: "POST",
      })
      if (!response.ok) {
        throw new Error("Failed to disconnect Spotify")
      }
      await updateSession()
      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect Spotify account",
        variant: "destructive",
      })
    } finally {
      setIsDisconnecting(false)
    }
  }

  // If connected, only show the refresh and disconnect buttons
  if (spotifyProfile) {
    return (
      <div className="flex items-center gap-4">
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
        >
          {isRefreshing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="mr-2 h-4 w-4" />
          )}
          Refresh Playlists
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect Spotify
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Disconnect Spotify</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to disconnect your Spotify account? You will need to reconnect to manage your playlists.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDisconnect}
                disabled={isDisconnecting}
              >
                {isDisconnecting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Disconnect"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }

  // If not connected, show the connect button
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <Music className="h-12 w-12 text-muted-foreground" />
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Connect Spotify Account</h3>
          <p className="text-sm text-muted-foreground">
            Connect your Spotify account to manage your playlists and start accepting submissions.
          </p>
        </div>
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full sm:w-auto"
        >
          {isConnecting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span>Connect Spotify</span>
          )}
        </Button>
      </div>
    </div>
  )
}
