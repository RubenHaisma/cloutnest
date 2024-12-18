import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getSpotifyAuthUrl } from "@/lib/spotify/auth"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

export async function GET(req: Request) {
  console.log("🎯 Starting Spotify connection process")
  
  try {
    console.log("📍 Getting server session...")
    const session = await getServerSession(authOptions)
    console.log("📦 Session data:", JSON.stringify({
      exists: !!session,
      user: session?.user ? {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role
      } : null
    }, null, 2))
    
    if (!session?.user?.id) {
      console.error("❌ No valid session or user ID")
      return NextResponse.json(
        { error: "Unauthorized - No valid session" },
        { status: 401 }
      )
    }

    console.log("🔍 Looking up user in database with ID:", session.user.id)
    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        role: true,
        spotifyState: true
      }
    })

    console.log("👤 User lookup result:", JSON.stringify(user, null, 2))

    if (!user) {
      console.error("❌ User not found in database")
      return NextResponse.json(
        { 
          error: "User not found",
          details: `No user found with ID: ${session.user.id}`
        },
        { status: 404 }
      )
    }

    // Generate a unique state parameter
    console.log("🎲 Generating Spotify state token")
    const state = crypto.randomUUID()
    console.log("📝 Generated state:", state)

    // Store state in database for verification
    console.log("💾 Updating user with Spotify state")
    const updatedUser = await prisma.user.update({
      where: { 
        id: user.id,
      },
      data: { 
        spotifyState: state,
      },
      select: {
        id: true,
        spotifyState: true
      }
    })
    console.log("✅ User updated with state:", JSON.stringify(updatedUser, null, 2))

    // Get Spotify auth URL
    console.log("🎵 Getting Spotify auth URL")
    const authUrl = await getSpotifyAuthUrl(state)
    console.log("🔗 Generated Spotify auth URL (first 100 chars):", authUrl.substring(0, 100) + "...")

    console.log("✨ Successfully completed Spotify connection setup")
    return NextResponse.json({ url: authUrl })
  } catch (error) {
    console.error("❌ Failed to initiate Spotify connection:", {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error
    })
    return NextResponse.json(
      { 
        error: "Failed to connect Spotify",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}