import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get Spotify account
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: "spotify",
      },
    })

    if (!account) {
      return NextResponse.json(
        { error: "No Spotify account connected" },
        { status: 404 }
      )
    }

    // Check if token needs refresh
    const now = Date.now()
    if (now >= (Number(account.expires_at) || 0) * 1000) {
      // Refresh token
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

      if (!response.ok) {
        throw new Error("Failed to refresh token")
      }

      const tokens = await response.json()

      // Update account with new tokens
      await prisma.account.update({
        where: { id: account.id },
        data: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token ?? account.refresh_token,
          expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
        },
      })

      return NextResponse.json({
        access_token: tokens.access_token,
        expires_in: tokens.expires_in,
      })
    }

    return NextResponse.json({
      access_token: account.access_token,
      expires_in: Math.floor((Number(account.expires_at!) * 1000 - now) / 1000),
    })
  } catch (error) {
    console.error("Failed to get Spotify token:", error)
    return NextResponse.json(
      { error: "Failed to get Spotify token" },
      { status: 500 }
    )
  }
}