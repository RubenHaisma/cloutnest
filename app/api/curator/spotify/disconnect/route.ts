import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Delete the Spotify account connection
    await prisma.account.deleteMany({
      where: {
        userId: session.user.id,
        provider: "spotify",
      },
    })

    // Clear Spotify profile from user
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        spotifyProfile: null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[SPOTIFY_DISCONNECT_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
