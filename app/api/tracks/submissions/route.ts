import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const submissions = await prisma.track.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        playlists: {
          include: {
            playlist: {
              select: {
                followers: true,
              },
            },
          },
        },
      },
    })

    // Transform data for the frontend
    const transformedSubmissions = submissions.map((submission: any) => ({
      id: submission.id,
      title: submission.title,
      artist: submission.artist,
      genre: submission.genre,
      status: submission.status,
      submittedAt: submission.createdAt,
      playlistAdds: submission.playlists.length,
      totalReach: submission.playlists.reduce(
        (sum: number, p: any) => sum + Number(p.playlist.followers || 0),
        0
      ),
    }))

    return NextResponse.json({ submissions: transformedSubmissions })
  } catch (error) {
    console.error("Failed to fetch submissions:", error)
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    )
  }
}