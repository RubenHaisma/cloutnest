import { prisma } from "@/lib/prisma"
import { Playlist, Track, User } from "@prisma/client"
import { calculateMatchScore } from "./match-scoring"
import { notifyPlaylistCurator } from "../notifications"

interface PlaylistWithCurator extends Playlist {
  curator: Pick<User, "id" | "name" | "email">
}

interface MatchResult {
  playlist: PlaylistWithCurator
  score: number
  reasons: string[]
}

export async function findMatchingPlaylists(
  track: Track & { audioFeatures?: { id: string } | null }
): Promise<MatchResult[]> {
  // Verify track has audio features
  if (!track.audioFeatures) {
    throw new Error("Track must have audio features for matching")
  }

  const matchingPlaylists = await prisma.playlist.findMany({
    where: {
      OR: [
        { genre: track.genre },
        { subGenres: { has: track.genre } },
      ],
      curator: {
        stripeAccountStatus: "active",
      },
    },
    include: {
      curator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })

  const results = await Promise.all(
    matchingPlaylists.map(async (playlist) => {
      const score = await calculateMatchScore(track, playlist)
      const reasons = getMatchReasons(score, track, playlist)

      if (score > 80) {
        await notifyPlaylistCurator(playlist.curator.id, track, playlist, score)
      }

      return {
        playlist,
        score,
        reasons,
      }
    })
  )

  return results
    .filter((result) => result.score >= 70)
    .sort((a, b) => b.score - a.score)
}

function getMatchReasons(
  score: number,
  track: Track,
  playlist: Playlist
): string[] {
  const reasons: string[] = []

  if (playlist.genre === track.genre) {
    reasons.push("Perfect genre match")
  } else if (playlist.subGenres.includes(track.genre)) {
    reasons.push("Matching subgenre")
  }

  if (score > 90) {
    reasons.push("Exceptional audio feature match")
  } else if (score > 80) {
    reasons.push("Strong audio feature match")
  }

  return reasons
}