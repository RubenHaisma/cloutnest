import { getSpotifyApi } from "./spotify"

export interface CuratorVerification {
  isVerified: boolean
  totalFollowers: number
  playlists: {
    id: string
    name: string
    followers: number
    trackCount: number
  }[]
}

export async function verifyCurator(): Promise<CuratorVerification> {
  try {
    const spotify = await getSpotifyApi()
    const playlists = await spotify.getUserPlaylists()
    
    let totalFollowers = 0
    const verifiedPlaylists = playlists.items
      .filter((playlist: any) => playlist.followers.total >= 1000)
      .map((playlist: any) => ({
        id: playlist.id,
        name: playlist.name,
        followers: playlist.followers.total,
        trackCount: playlist.tracks.total,
      }))

    totalFollowers = verifiedPlaylists.reduce(
      (sum: number, playlist: any) => sum + playlist.followers,
      0
    )

    return {
      isVerified: totalFollowers >= 10000 && verifiedPlaylists.length >= 3,
      totalFollowers,
      playlists: verifiedPlaylists,
    }
  } catch (error) {
    console.error("Curator verification failed:", error)
    return {
      isVerified: false,
      totalFollowers: 0,
      playlists: [],
    }
  }
}