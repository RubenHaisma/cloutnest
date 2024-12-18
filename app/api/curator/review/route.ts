import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { addTrackToPlaylist } from "@/lib/spotify/playlists"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { trackId, playlistId, action } = await req.json()

    if (action === "accept") {
      // Get track details
      const track = await prisma.track.findUnique({
        where: { id: trackId },
      })

      if (!track) {
        return NextResponse.json(
          { error: "Track not found" },
          { status: 404 }
        )
      }

      // Get curator's Spotify account
      const account = await prisma.account.findFirst({
        where: {
          userId: session.user.id,
          provider: "spotify",
        },
      })

      if (!account) {
        return NextResponse.json(
          { error: "Spotify account not connected" },
          { status: 400 }
        )
      }

      // Add track to playlist
      await addTrackToPlaylist(playlistId, track.spotifyUrl, account)

      // Create curator earnings record
      await prisma.curatorEarnings.create({
        data: {
          curatorId: session.user.id,
          trackId,
          amount: 5.00, // $5 per accepted track
        },
      })

      // Update track status
      await prisma.track.update({
        where: { id: trackId },
        data: { status: "approved" },
      })
    } else {
      // Update track status to rejected
      await prisma.track.update({
        where: { id: trackId },
        data: { status: "rejected" },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Review failed:", error)
    return NextResponse.json(
      { error: "Failed to process review" },
      { status: 500 }
    )
  }
}