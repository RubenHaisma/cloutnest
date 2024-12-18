import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getTrackDetails, analyzeTrackGenre } from "@/lib/spotify/tracks"
import { getSpotifyAccount } from "@/lib/spotify/session"
import { findMatchingPlaylists } from "@/lib/matching/playlist-matcher"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, artist, genre, spotifyUrl } = await req.json()

    // Get Spotify account
    const spotifyAccount = await getSpotifyAccount(session)

    // Get track details from Spotify
    const trackDetails = await getTrackDetails(spotifyUrl, spotifyAccount)
    const genreAnalysis = await analyzeTrackGenre(trackDetails.id, spotifyAccount)

    // Create track in database
    const track = await prisma.track.create({
      data: {
        title,
        artist,
        genre,
        spotifyUrl,
        userId: session.user.id,
        status: "pending",
        audioFeatures: {
          create: trackDetails.audioFeatures,
        },
      },
      include: {
        audioFeatures: true,
      },
    })

    // Find matching playlists
    const matches = await findMatchingPlaylists(track)

    // Create playlist matches
    await Promise.all(
      matches.map(match =>
        prisma.playlistTrack.create({
          data: {
            trackId: track.id,
            playlistId: match.playlist.id,
            matchScore: match.score,
            matchReasons: match.reasons,
          },
        })
      )
    )

    return NextResponse.json({
      success: true,
      track,
      matchingPlaylists: matches.length,
    })
  } catch (error) {
    console.error("Track submission failed:", error)
    return NextResponse.json(
      { error: "Failed to submit track" },
      { status: 500 }
    )
  }
}