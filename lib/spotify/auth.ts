import { Account } from "@prisma/client"
import { SpotifyApi } from "@spotify/web-api-ts-sdk"
import { prisma } from "@/lib/prisma"

interface SpotifyTokens {
  access_token: string
  refresh_token: string
  expires_at: number
}

let spotifyApi: SpotifyApi | null = null

export async function getSpotifyApi(account?: Account) {
  if (!spotifyApi) {
    // Initialize with client credentials if no account provided
    spotifyApi = SpotifyApi.withClientCredentials(
      process.env.SPOTIFY_CLIENT_ID!,
      process.env.SPOTIFY_CLIENT_SECRET!
    )
  }

  if (account) {
    // Check if token needs refresh
    const now = Date.now()
    if (now >= account.expires_at!) {
      const tokens = await refreshAccessToken(account)
      
      // Update account with new tokens
      await prisma.account.update({
        where: { id: account.id },
        data: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: tokens.expires_at,
        },
      })

      // Reinitialize API with new token
      spotifyApi = SpotifyApi.withAccessToken(
        process.env.SPOTIFY_CLIENT_ID!,
        {
          access_token: tokens.access_token,
          expires_in: Math.floor((tokens.expires_at - now) / 1000),
          token_type: "Bearer",
          refresh_token: ""
        }
      )
    } else {
      // Initialize with existing token
      spotifyApi = SpotifyApi.withAccessToken(
        process.env.SPOTIFY_CLIENT_ID!,
        {
          access_token: account.access_token!,
          expires_in: Math.floor((Number(account.expires_at!) - now) / 1000),
          token_type: "Bearer",
          refresh_token: ""
        }
      )
    }
  }

  return spotifyApi
}

async function refreshAccessToken(account: Account): Promise<SpotifyTokens> {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: account.refresh_token!,
      }),
    })

    const tokens = await response.json()

    if (!response.ok) {
      throw new Error(tokens.error_description || "Failed to refresh token")
    }

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token ?? account.refresh_token!,
      expires_at: Date.now() + tokens.expires_in * 1000,
    }
  } catch (error) {
    console.error("Error refreshing Spotify access token:", error)
    throw new Error("Failed to refresh Spotify access token")
  }
}

export async function getSpotifyAuthUrl(state: string) {
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    response_type: "code",
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/spotify/callback`,
    scope: [
      "playlist-read-private",
      "playlist-modify-public",
      "playlist-modify-private",
      "user-read-private",
      "user-read-email",
    ].join(" "),
    state,
  })

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

export async function validateSpotifyState(state: string, storedState: string) {
  return state === storedState
}