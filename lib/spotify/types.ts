export interface SpotifyTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
  scope: string
}

export interface SpotifyError {
  error: string
  error_description?: string
}

export interface SpotifyProfile {
  id: string
  display_name: string
  email: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  product: string
  type: string
  uri: string
}

export interface SpotifyPlaylist {
  id: string
  name: string
  description: string | null
  public: boolean
  collaborative: boolean
  images: Array<{
    url: string
    height: number | null
    width: number | null
  }>
  owner: {
    id: string
    display_name: string
  }
  tracks: {
    total: number
  }
  followers: {
    total: number
  }
}

export interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{
    id: string
    name: string
  }>
  album: {
    id: string
    name: string
    images: Array<{
      url: string
      height: number
      width: number
    }>
  }
  duration_ms: number
  popularity: number
  preview_url: string | null
  external_urls: {
    spotify: string
  }
}

export interface SpotifyAudioFeatures {
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
  duration_ms: number
  time_signature: number
}