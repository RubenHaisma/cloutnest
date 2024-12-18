import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { SpotifyTokens, SpotifyProfile } from "@/types/spotify"
import { cookies } from "next/headers"
import { Prisma } from "@prisma/client"

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const REDIRECT_URI = process.env.NEXTAUTH_URL + "/api/curator/spotify/callback"
const BASE_URL = process.env.NEXTAUTH_URL!

async function getSpotifyTokens(code: string): Promise<SpotifyTokens & { expires_in: number }> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to get Spotify tokens")
  }

  return response.json()
}

async function getSpotifyProfile(accessToken: string): Promise<SpotifyProfile> {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to get Spotify profile")
  }

  return response.json()
}

// Enable dynamic route handling
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.redirect(new URL("/login", BASE_URL))
    }

    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const cookieStore = cookies()
    const storedState = cookieStore.get("spotify_auth_state")?.value

    if (!code) {
      return NextResponse.redirect(
        new URL("/dashboard/curator/playlists?error=no_code", BASE_URL)
      )
    }

    if (!state || !storedState || state !== storedState) {
      return NextResponse.redirect(
        new URL("/dashboard/curator/playlists?error=invalid_state", BASE_URL)
      )
    }

    // Exchange code for tokens
    const tokens = await getSpotifyTokens(code)
    console.log("[SPOTIFY_CALLBACK] Received tokens:", {
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token,
      expiresIn: tokens.expires_in,
    })

    // Get Spotify profile
    const profile = await getSpotifyProfile(tokens.access_token)
    console.log("[SPOTIFY_CALLBACK] Received profile:", {
      id: profile.id,
      email: profile.email,
    })

    // Store tokens and profile in database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        spotifyTokens: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: Math.floor(Date.now() / 1000) + tokens.expires_in,
        } as unknown as Prisma.InputJsonValue,
        spotifyProfile: JSON.stringify(profile),
      },
    })

    console.log("[SPOTIFY_AUTH] Updated user:", {
      id: updatedUser.id,
      hasSpotifyProfile: !!updatedUser.spotifyProfile,
    })

    // Clear state cookie and redirect
    const response = NextResponse.redirect(
      new URL("/dashboard/curator/playlists", BASE_URL)
    )
    cookieStore.delete("spotify_auth_state")

    return response
  } catch (error) {
    console.error("[SPOTIFY_CALLBACK_ERROR]", error)
    return NextResponse.redirect(
      new URL("/dashboard/curator/playlists?error=spotify_connection_failed", BASE_URL)
    )
  }
}
