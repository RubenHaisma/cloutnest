import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // In a real app, fetch analytics data from your database
    const analyticsData = {
      totalEarnings: 1234.50,
      tracksReviewed: 156,
      acceptanceRate: 68,
      playlistGrowth: 2300,
      recentActivity: [
        {
          id: 1,
          type: "track_review",
          title: "Summer Vibes",
          artist: "John Doe",
          timestamp: new Date().toISOString(),
        },
        // More activity items...
      ],
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error("Failed to fetch analytics:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}