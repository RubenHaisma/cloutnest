import { prisma } from "@/lib/prisma"
import { CuratorEarnings, User } from "@prisma/client"

interface CuratorAnalytics {
  totalEarnings: number
  reviewMetrics: {
    totalReviews: number
    acceptanceRate: number
    averageResponseTime: string
  }
  playlistGrowth: {
    followers: number
    period: string
  }
  recentActivity: any[] // Type this properly based on your activity structure
}

export async function getCuratorAnalytics(curatorId: string): Promise<CuratorAnalytics> {
  const curator = await prisma.user.findUnique({
    where: { id: curatorId },
    include: {
      playlists: {
        include: {
          tracks: true,
        },
      },
      earnings: true,
    },
  })

  if (!curator) {
    throw new Error("Curator not found")
  }

  return {
    totalEarnings: calculateTotalEarnings(curator.earnings),
    reviewMetrics: {
      totalReviews: calculateTotalReviews(curator),
      acceptanceRate: calculateAcceptanceRate(curator),
      averageResponseTime: calculateAverageResponseTime(),
    },
    playlistGrowth: calculatePlaylistGrowth(),
    recentActivity: getRecentActivity(),
  }
}

function calculateTotalEarnings(earnings: CuratorEarnings[]): number {
  return earnings.reduce((sum, e) => sum + e.amount, 0)
}

function calculateTotalReviews(curator: User & { playlists: any[] }): number {
  return curator.playlists.reduce(
    (sum: any, playlist: { tracks: string | any[] }) => sum + playlist.tracks.length,
    0
  )
}

function calculateAcceptanceRate(curator: User & { playlists: any[] }): number {
  const totalReviews = calculateTotalReviews(curator)
  if (totalReviews === 0) return 0
  
  const acceptedTracks = curator.playlists.reduce(
    (sum: any, playlist: { tracks: { filter: (arg0: (t: any) => boolean) => { (): any; new(): any; length: any } } }) => sum + playlist.tracks.filter((t: any) => t.status === "approved").length,
    0
  )
  
  return (acceptedTracks / totalReviews) * 100
}

function calculateAverageResponseTime(): string {
  // Implement response time calculation
  return "24h"
}

function calculatePlaylistGrowth() {
  // Implement playlist growth calculation
  return {
    followers: 0,
    period: '30d',
  }
}

function getRecentActivity(): any[] {
  // Implement recent activity retrieval
  return []
}