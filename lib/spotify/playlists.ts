import { prisma } from "@/lib/prisma"
import { getSpotifyApi } from "./auth"
import { Account } from "@prisma/client"

export async function syncUserPlaylists(userId: string, account: Account) {
  try {
    const spotify = await getSpotifyApi(account)
    const playlists = await spotify.playlists.getUsersPlaylists(userId)

    // Process each playlist
    for (const playlist of playlists.items) {
      await prisma.playlist.upsert({
        where: { spotifyId: playlist.id },
        update: {
          name: playlist.name,
          followers: playlist.followers?.total || 0,
          curatorId: userId,
        },
        create: {
          spotifyId: playlist.id,
          name: playlist.name,
          genre: "unknown", // This would be determined by analyzing the playlist
          followers: playlist.followers?.total || 0,
          curatorId: userId,
        },
      })
    }

    return playlists.items
  } catch (error) {
    console.error("Failed to sync playlists:", error)
    throw error
  }
}

export async function addTrackToPlaylist(
  playlistId: string,
  trackUri: string,
  account: Account
) {
  try {
    const spotify = await getSpotifyApi(account)
    await spotify.playlists.addItemsToPlaylist(playlistId, [trackUri])

    // Record the addition in our database
    await prisma.playlistTrack.create({
      data: {
        playlistId,
        trackId: trackUri.split(":").pop()!,
      },
    })

    return true
  } catch (error) {
    console.error("Failed to add track to playlist:", error)
    throw error
  }
}