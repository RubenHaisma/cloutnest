import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { validateSpotifyState } from "@/lib/spotify/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    const { searchParams } = new URL(req.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    if (error) {
      console.error("Spotify auth error:", error)
      return NextResponse.redirect(new URL("/error", req.url))
    }

    if (!code || !state) {
      return NextResponse.redirect(new URL("/error", req.url))
    }

    // Verify state parameter
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { spotifyState: true },
    })

    if (!user?.spotifyState || !await validateSpotifyState(state, user.spotifyState)) {
      return NextResponse.redirect(new URL("/error", req.url))
    }

    // Exchange code for tokens
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/spotify/callback`,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to exchange code for tokens")
    }

    const tokens = await response.json()

    // Get user profile
    const profileResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    if (!profileResponse.ok) {
      throw new Error("Failed to fetch Spotify profile")
    }

    const profile = await profileResponse.json()

    // Store tokens and profile
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        spotifyState: null,
        spotifyProfile: profile.id,
        accounts: {
          upsert: {
            where: {
              provider_providerAccountId: {
                provider: "spotify",
                providerAccountId: profile.id,
              },
            },
            create: {
              type: "oauth",
              provider: "spotify",
              providerAccountId: profile.id,
              access_token: tokens.access_token,
              refresh_token: tokens.refresh_token,
              expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
              token_type: "Bearer",
              scope: tokens.scope,
            },
            update: {
              access_token: tokens.access_token,
              refresh_token: tokens.refresh_token,
              expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            },
          },
        },
      },
    })

    // Redirect back to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url))
  } catch (error) {
    console.error("Spotify callback error:", error)
    return NextResponse.redirect(new URL("/error", req.url))
  }
}