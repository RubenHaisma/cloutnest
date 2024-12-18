import { Playlist, Track, TrackAudioFeatures } from "@prisma/client"
import { prisma } from "@/lib/prisma"

interface PlaylistAverageFeatures {
  danceability: number
  energy: number
  valence: number
  tempo: number
  instrumentalness: number
}

export async function calculateMatchScore(track: Track, playlist: Playlist): Promise<number> {
  let score = 0

  // Genre match (30 points)
  if (playlist.genre === track.genre) {
    score += 30
  } else if (playlist.subGenres.includes(track.genre)) {
    score += 20
  }

  // Audio features match (40 points)
  const audioFeatures = await prisma.trackAudioFeatures.findUnique({
    where: { trackId: track.id },
  })

  if (audioFeatures && playlist.averageFeatures) {
    const averageFeatures = playlist.averageFeatures as unknown as PlaylistAverageFeatures
    score += calculateAudioFeatureScore(audioFeatures, averageFeatures)
  }

  // Playlist quality (30 points)
  score += calculatePlaylistQualityScore(playlist)

  return Math.min(Math.round(score), 100)
}

function calculateAudioFeatureScore(
  trackFeatures: TrackAudioFeatures,
  playlistFeatures: PlaylistAverageFeatures
): number {
  const features = [
    'danceability',
    'energy',
    'valence',
    'tempo',
    'instrumentalness',
  ] as const

  return features.reduce((score, feature) => {
    const trackValue = trackFeatures[feature]
    const playlistValue = playlistFeatures[feature]
    
    if (typeof trackValue === 'number' && typeof playlistValue === 'number') {
      const diff = Math.abs(trackValue - playlistValue)
      return score + (1 - diff) * (40 / features.length)
    }
    return score
  }, 0)
}

function calculatePlaylistQualityScore(playlist: Playlist): number {
  // Base score on followers and activity
  const followerScore = Math.min((Number(playlist.followers) / 10000) * 15, 15)
  const activityScore = 15 // This could be based on playlist update frequency

  return followerScore + activityScore
}