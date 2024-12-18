export interface SpotifyTokens {
  access_token: string
  refresh_token: string
  expires_at: number
}

export interface SpotifyProfile {
  id: string
  email: string
  display_name?: string
  images?: { url: string }[]
  country?: string
  product?: string
  type: "user"
}
