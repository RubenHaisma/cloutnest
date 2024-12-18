import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { SpotifyApi, Track } from "@spotify/web-api-ts-sdk"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get curator's playlists with pending tracks
    const tracks = await prisma.track.findMany({
      where: {
        status: "pending",
        playlists: {
          some: {
            playlist: {
              curatorId: session.user.id
            }
          }
        }
      },
      include: {
        user: true,
        playlists: {
          include: {
            playlist: true
          }
        }
      }
    })

    if (tracks.length === 0) {
      return NextResponse.json({ tracks: [] })
    }

    // Get Spotify IDs from track URLs
    const spotifyIds = tracks
      .map(track => {
        const match = track.spotifyUrl.match(/track\/([a-zA-Z0-9]+)/)
        return match?.[1]
      })
      .filter((id): id is string => id !== undefined)

    // Get curator's Spotify access token
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: "spotify"
      }
    })

    if (!account?.access_token) {
      return new NextResponse("Spotify account not connected", { status: 400 })
    }

    // Initialize Spotify API client
    const spotify = SpotifyApi.withAccessToken(
      process.env.SPOTIFY_CLIENT_ID!,
      {
        access_token: account.access_token,
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: account.refresh_token ?? ""
      }
    )

    // Fetch tracks in batches of 50 (Spotify API limit)
    const batchSize = 50
    const trackBatches: string[][] = []
    
    for (let i = 0; i < spotifyIds.length; i += batchSize) {
      const batch = spotifyIds.slice(i, i + batchSize)
      trackBatches.push(batch)
    }

    const spotifyTracks: Track[] = []
    for (const batch of trackBatches) {
      const response = await spotify.tracks.get(batch)
      spotifyTracks.push(...response)
    }

    // Combine database and Spotify data
    const tracksWithDetails = tracks.map((track, index) => ({
      ...track,
      spotifyData: spotifyTracks[index],
      submittedAt: track.createdAt,
      artist: track.user.name,
      playlists: track.playlists.map(pt => ({
        id: pt.playlist.id,
        name: pt.playlist.name
      }))
    }))

    return NextResponse.json({ tracks: tracksWithDetails })

  } catch (error) {
    console.error("[CURATOR_TRACKS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}