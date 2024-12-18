"use client"

import { SpotifyApi } from "@spotify/web-api-ts-sdk"

let spotifyClient: SpotifyApi | null = null

export function getSpotifyClient() {
  if (!spotifyClient) {
    spotifyClient = SpotifyApi.withClientCredentials(
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
      process.env.SPOTIFY_CLIENT_SECRET!
    )
  }
  return spotifyClient
}