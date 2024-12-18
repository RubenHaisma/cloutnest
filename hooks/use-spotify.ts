"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { SpotifyApi } from "@spotify/web-api-ts-sdk"

export function useSpotify() {
  const { data: session } = useSession()
  const [spotify, setSpotify] = useState<SpotifyApi | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initSpotify = async () => {
      try {
        // Get Spotify token
        const response = await fetch("/api/spotify/token")
        if (!response.ok) throw new Error("Failed to get Spotify token")
        
        const { access_token, expires_in } = await response.json()

        const api = SpotifyApi.withAccessToken(
          process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
          {
            access_token,
            expires_in,
            token_type: "Bearer",
            refresh_token: ""
          }
        )

        setSpotify(api)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to initialize Spotify"))
      } finally {
        setIsLoading(false)
      }
    }

    if (session?.user) {
      initSpotify()
    } else {
      setIsLoading(false)
    }
  }, [session])

  return { spotify, isLoading, error }
}