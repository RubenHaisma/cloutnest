import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { SpotifyApi } from "@spotify/web-api-ts-sdk"
import { SpotifyTokens } from "@/types/spotify"
import { Prisma } from "@prisma/client"

// Enable dynamic route handling
export const dynamic = "force-dynamic"

async function refreshSpotifyToken(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      spotifyTokens: true
    }
  })

  const tokens = user?.spotifyTokens as SpotifyTokens | null

  if (!tokens?.refresh_token) {
    console.log("[SPOTIFY] No refresh token found")
    return null
  }

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
        refresh_token: tokens.refresh_token,
      }),
    })

    if (!response.ok) {
      console.error("[SPOTIFY] Failed to refresh token:", response.status)
      return null
    }

    const tokensResponse = await response.json()
    console.log("[SPOTIFY] Token refreshed successfully")

    const newTokens: SpotifyTokens = {
      access_token: tokensResponse.access_token,
      refresh_token: tokensResponse.refresh_token ?? tokens.refresh_token,
      expires_at: Math.floor(Date.now() / 1000) + tokensResponse.expires_in,
    }

    // Update tokens in database
    await prisma.user.update({
      where: { id: userId },
      data: {
        spotifyTokens: newTokens as unknown as Prisma.JsonObject
      },
    })

    return newTokens.access_token
  } catch (error) {
    console.error("[SPOTIFY] Error refreshing token:", error)
    return null
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      console.log("[PLAYLISTS] No session found")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    console.log("[PLAYLISTS] Fetching for user:", session.user.id)

    // Get user with Spotify tokens and profile
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        spotifyTokens: true,
        spotifyProfile: true
      }
    })

    const tokens = user?.spotifyTokens as SpotifyTokens | null

    if (!tokens?.access_token) {
      console.log("[PLAYLISTS] No Spotify tokens found")
      return NextResponse.json({ playlists: [], connected: false })
    }

    // Check if token needs refresh
    if (
      tokens.expires_at &&
      tokens.expires_at < Math.floor(Date.now() / 1000)
    ) {
      console.log("[PLAYLISTS] Token expired, refreshing")
      const newAccessToken = await refreshSpotifyToken(session.user.id)
      if (!newAccessToken) {
        console.log("[PLAYLISTS] Failed to refresh token")
        return NextResponse.json({ error: "Failed to refresh token" }, { status: 401 })
      }
      tokens.access_token = newAccessToken
    }

    // Initialize Spotify client
    const spotify = SpotifyApi.withAccessToken(process.env.SPOTIFY_CLIENT_ID!, {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_at
        ? tokens.expires_at - Math.floor(Date.now() / 1000)
        : 3600,
      token_type: "Bearer",
    })

    try {
      // First get the user's profile to ensure we have the correct ID
      const profile = await spotify.currentUser.profile()
      console.log("[PLAYLISTS] Got user profile:", { id: profile.id })

      // Add delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Fetch playlists with proper error handling
      const response = await spotify.currentUser.playlists.playlists(undefined, 0)

      console.log("[PLAYLISTS] Fetched playlists:", {
        total: response.total,
        items: response.items.length,
      })

      // Add detailed logging for each playlist
      response.items.forEach((playlist, index) => {
        console.log(`[PLAYLISTS] Playlist ${index}:`, {
          id: playlist?.id,
          name: playlist?.name,
          tracks: playlist?.tracks,
          owner: playlist?.owner,
          images: playlist?.images,
        })
      })

      // Transform playlists to match our interface
      const transformedPlaylists = response.items.filter(playlist => playlist !== null).map(playlist => {
        if (!playlist) {
          console.log("[PLAYLISTS] Found null playlist item")
          return null
        }
        
        console.log("[PLAYLISTS] Transforming playlist:", playlist.id)
        
        return {
          id: playlist.id || 'unknown',
          name: playlist.name || 'Untitled Playlist',
          tracks: {
            total: playlist.tracks?.total || 0,
          },
          owner: {
            display_name: playlist.owner?.display_name || 'Unknown',
          },
          images: playlist.images || [],
        }
      }).filter(Boolean)

      console.log("[PLAYLISTS] Transformed playlists:", transformedPlaylists.length)

      return NextResponse.json({
        playlists: transformedPlaylists,
        total: response.total,
        connected: true,
      })
    } catch (error) {
      console.error("[PLAYLISTS] Error fetching playlists:", error)
      return NextResponse.json(
        { error: "Failed to fetch playlists" },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("[PLAYLISTS] Unexpected error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Add POST endpoint for refreshing playlists
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Force refresh token
    const newAccessToken = await refreshSpotifyToken(session.user.id)
    
    if (!newAccessToken) {
      return new NextResponse("Failed to refresh token", { status: 401 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[REFRESH_PLAYLISTS_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}