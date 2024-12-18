import { getSpotifyApi } from "./spotify"

interface TrackAnalysis {
  audioFeatures: {
    danceability: number
    energy: number
    key: number
    loudness: number
    mode: number
    speechiness: number
    acousticness: number
    instrumentalness: number
    liveness: number
    valence: number
    tempo: number
  }
  moodTags: string[]
}

export async function analyzeTrack(spotifyUrl: string): Promise<TrackAnalysis> {
  const spotify = await getSpotifyApi()
  const trackId = spotifyUrl.split("/").pop()

  if (!trackId) {
    throw new Error('Invalid Spotify URL')
  }

  // Get audio features from Spotify API
  const audioFeatures = await spotify.getAudioFeatures(trackId)

  // Determine mood tags based on audio features
  const moodTags = determineMoodTags(audioFeatures)

  return {
    audioFeatures,
    moodTags,
  }
}

function determineMoodTags(audioFeatures: any): string[] {
  const tags: string[] = []

  if (audioFeatures.valence > 0.7) tags.push("Happy")
  if (audioFeatures.valence < 0.3) tags.push("Melancholic")
  if (audioFeatures.energy > 0.7) tags.push("Energetic")
  if (audioFeatures.energy < 0.3) tags.push("Calm")
  if (audioFeatures.danceability > 0.7) tags.push("Danceable")
  if (audioFeatures.acousticness > 0.7) tags.push("Acoustic")
  if (audioFeatures.instrumentalness > 0.7) tags.push("Instrumental")

  return tags
}