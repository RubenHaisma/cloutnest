import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function PlaylistPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return notFound()

  const playlist = await prisma.playlist.findUnique({
    where: {
      id: params.id,
      curatorId: session.user.id
    },
    include: {
      tracks: {
        include: {
          track: true
        }
      }
    }
  })

  if (!playlist) return notFound()

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">{playlist.name}</h1>
      {/* Add playlist details and tracks here */}
    </div>
  )
}