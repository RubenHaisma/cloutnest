import { prisma } from "@/lib/prisma"
import { Playlist, Track } from "@prisma/client"
import { pusherServer } from "@/lib/pusher"

export async function notifyPlaylistCurator(
  curatorId: string,
  track: Track,
  playlist: Playlist,
  matchScore: number
) {
  const notification = await prisma.notification.create({
    data: {
      userId: curatorId,
      type: "new_track",
      title: "New Track Match",
      message: `New track "${track.title}" matches your playlist "${playlist.name}"`,
      metadata: {
        trackId: track.id,
        playlistId: playlist.id,
        matchScore,
      },
    },
  })

  // Send real-time notification
  await pusherServer.trigger(`user-${curatorId}`, "notification", notification)

  return notification
}