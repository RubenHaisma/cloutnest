import { Account } from "@prisma/client"
import { getSpotifyApi } from "./auth"

interface TrackDetails {
  id: string
  title: string
  artist: string
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
}

export async function getTrackDetails(trackUrl: string, account: Account): Promise<TrackDetails> {
  const spotify = await getSpotifyApi(account)
  const trackId = extractTrackId(trackUrl)

  const [track, audioFeatures] = await Promise.all([
    spotify.tracks.get(trackId),
    spotify.tracks.audioFeatures(trackId),
  ])

  return {
    id: track.id,
    title: track.name,
    artist: track.artists[0].name,
    audioFeatures: {
      danceability: audioFeatures.danceability,
      energy: audioFeatures.energy,
      key: audioFeatures.key,
      loudness: audioFeatures.loudness,
      mode: audioFeatures.mode,
      speechiness: audioFeatures.speechiness,
      acousticness: audioFeatures.acousticness,
      instrumentalness: audioFeatures.instrumentalness,
      liveness: audioFeatures.liveness,
      valence: audioFeatures.valence,
      tempo: audioFeatures.tempo,
    },
  }
}

export async function analyzeTrackGenre(trackId: string, account: Account) {
  const spotify = await getSpotifyApi(account)
  const track = await spotify.tracks.get(trackId)
  const artist = await spotify.artists.get(track.artists[0].id)

  return {
    genres: artist.genres,
    popularity: track.popularity,
    artistFollowers: artist.followers.total,
  }
}

function extractTrackId(url: string): string {
  const match = url.match(/track\/([a-zA-Z0-9]+)/)
  if (!match) {
    throw new Error("Invalid Spotify track URL")
  }
  return match[1]
}