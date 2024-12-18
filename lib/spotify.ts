import { getSession } from "next-auth/react"
import { getSpotifyAccount } from "./spotify/session"

const SPOTIFY_API = 'https://api.spotify.com/v1'

export async function getSpotifyApi() {
  const session = await getSession()
  if (!session) {
    throw new Error('Not authenticated')
  }

  const account = await getSpotifyAccount(session)
  
  return {
    async getUserPlaylists() {
      const res = await fetch(`${SPOTIFY_API}/me/playlists`, {
        headers: {
          Authorization: `Bearer ${account.access_token}`,
        },
      })
      if (!res.ok) throw new Error('Failed to fetch playlists')
      return res.json()
    },

    async addTrackToPlaylist(playlistId: string, trackUri: string) {
      const res = await fetch(`${SPOTIFY_API}/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${account.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [trackUri],
        }),
      })
      if (!res.ok) throw new Error('Failed to add track')
      return res.json()
    },

    async getTrack(trackId: string) {
      const res = await fetch(`${SPOTIFY_API}/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${account.access_token}`,
        },
      })
      if (!res.ok) throw new Error('Failed to fetch track')
      return res.json()
    },

    async getAudioFeatures(trackId: string) {
      const res = await fetch(`${SPOTIFY_API}/audio-features/${trackId}`, {
        headers: {
          Authorization: `Bearer ${account.access_token}`,
        },
      })
      if (!res.ok) throw new Error('Failed to fetch audio features')
      return res.json()
    },
  }
}