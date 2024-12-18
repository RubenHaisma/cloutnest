import { EarningsPage as EarningsPageClient } from "@/components/curator/earnings-page"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function EarningsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    console.log("User is not logged in, redirecting to /login");
    redirect("/login")
  }

  // Get earnings data
  const earnings = await prisma.curatorEarnings.findMany({
    where: { 
      curatorId: session.user.id 
    },
    include: {
      track: true,
      curator: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  console.log("Earnings data fetched:", earnings);

  // Calculate stats
  const totalEarned = earnings.reduce((sum, e) => sum + e.amount, 0)
  console.log("Total earnings calculated:", totalEarned);

  const tracksReviewed = earnings.length
  console.log("Total tracks reviewed:", tracksReviewed);

  const pendingPayouts = earnings.filter(e => !e.paidOut).length
  console.log("Pending payouts calculated:", pendingPayouts);

  const acceptanceRate = tracksReviewed > 0 
    ? ((pendingPayouts / tracksReviewed) * 100).toFixed(1)
    : "0"
  console.log("Acceptance rate calculated:", acceptanceRate);

  // Get playlist growth
  const playlists = await prisma.playlist.findMany({
    where: { curatorId: session.user.id }
  })
  console.log("Playlists fetched:", playlists);

  const totalFollowers = playlists.reduce((sum, p) => sum + Number(p.followers), 0)
  console.log("Total followers calculated:", totalFollowers);

  // Calculate month-over-month changes
  const lastMonth = new Date()
  lastMonth.setMonth(lastMonth.getMonth() - 1)
  
  const lastMonthEarnings = await prisma.curatorEarnings.aggregate({
    where: {
      curatorId: session.user.id,
      createdAt: { gte: lastMonth }
    },
    _sum: { amount: true }
  })

  console.log("Last month's earnings:", lastMonthEarnings);

  const monthlyChange = lastMonthEarnings._sum.amount ?? 0
  console.log("Monthly change calculated:", monthlyChange);

  const stats = {
    totalEarnings: totalEarned.toFixed(2),
    tracksReviewed: tracksReviewed.toString(),
    acceptanceRate: `${acceptanceRate}%`,
    playlistGrowth: `${(totalFollowers / 1000 || 0).toFixed(1)}K`,
    monthlyChange: monthlyChange > 0 ? `+${monthlyChange.toFixed(1)}%` : "0%"
  }

  console.log("Final stats calculated:", stats);

  return <EarningsPageClient stats={stats} earnings={earnings} />
}
