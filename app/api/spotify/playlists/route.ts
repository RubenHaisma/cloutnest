import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getSpotifyApi } from "@/lib/spotify"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const spotify = await getSpotifyApi()
    const playlists = await spotify.getUserPlaylists()

    return NextResponse.json({ playlists: playlists.items })
  } catch (error) {
    console.error("Failed to fetch playlists:", error)
    return NextResponse.json(
      { error: "Failed to fetch playlists" },
      { status: 500 }
    )
  }
}