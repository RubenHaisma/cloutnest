import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get total unpaid earnings
    const earnings = await prisma.curatorEarnings.aggregate({
      where: {
        curatorId: session.user.id,
        paidOut: false,
      },
      _sum: {
        amount: true,
      },
    })

    // Get total earnings history
    const totalEarnings = await prisma.curatorEarnings.aggregate({
      where: {
        curatorId: session.user.id,
      },
      _sum: {
        amount: true,
      },
    })

    // Get recent transactions
    const recentTransactions = await prisma.curatorEarnings.findMany({
      where: {
        curatorId: session.user.id,
      },
      include: {
        track: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    })

    return NextResponse.json({
      availableBalance: earnings._sum.amount || 0,
      totalEarnings: totalEarnings._sum.amount || 0,
      recentTransactions,
    })
  } catch (error) {
    console.error("Failed to fetch balance:", error)
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 }
    )
  }
}