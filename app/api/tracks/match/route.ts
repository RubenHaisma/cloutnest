import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { findMatchingPlaylists } from "@/lib/matching/playlist-matcher"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { trackId } = await req.json()

    const track = await prisma.track.findUnique({
      where: { id: trackId },
      include: { audioFeatures: true },
    })

    if (!track) {
      return NextResponse.json(
        { error: "Track not found" },
        { status: 404 }
      )
    }

    const matches = await findMatchingPlaylists(track)

    // Create playlist matches in database
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

    return NextResponse.json({ matches })
  } catch (error) {
    console.error("Playlist matching failed:", error)
    return NextResponse.json(
      { error: "Failed to find matching playlists" },
      { status: 500 }
    )
  }
}