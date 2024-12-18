import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { randomBytes } from "crypto"

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const REDIRECT_URI = process.env.NEXTAUTH_URL + "/api/curator/spotify/callback"

const SCOPES = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-email",
  "user-read-private",
].join(" ")

// Mark route as dynamic
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Generate a secure random state
    const state = randomBytes(32).toString("hex")
    
    // Build the Spotify authorization URL
    const spotifyUrl = new URL("https://accounts.spotify.com/authorize")
    spotifyUrl.searchParams.append("client_id", SPOTIFY_CLIENT_ID)
    spotifyUrl.searchParams.append("response_type", "code")
    spotifyUrl.searchParams.append("redirect_uri", REDIRECT_URI)
    spotifyUrl.searchParams.append("state", state)
    spotifyUrl.searchParams.append("scope", SCOPES)
    spotifyUrl.searchParams.append("show_dialog", "true") // Force showing the Spotify login dialog

    console.log("[SPOTIFY_CONNECT] Redirecting to Spotify:", {
      redirectUri: REDIRECT_URI,
      scopes: SCOPES,
      hasState: !!state,
    })

    // Create response with redirect
    const response = NextResponse.redirect(spotifyUrl.toString(), {
      status: 302,
    })

    // Set secure state cookie
    response.cookies.set("spotify_auth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 3600, // 1 hour
    })

    return response
  } catch (error) {
    console.error("[SPOTIFY_CONNECT_ERROR]", error)
    return NextResponse.redirect("/dashboard/curator/playlists?error=connect_failed")
  }
}
