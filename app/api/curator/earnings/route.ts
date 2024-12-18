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

    // Get curator's earnings data
    const earnings = await prisma.curatorEarnings.findMany({
      where: {
        curatorId: session.user.id,
      },
      include: {
        track: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Calculate total and pending earnings
    const totalEarnings = earnings.reduce((sum: any, e: { amount: any }) => sum + e.amount, 0)
    const pendingEarnings = earnings
      .filter((e: { paidOut: any }) => !e.paidOut)
      .reduce((sum: any, e: { amount: any }) => sum + e.amount, 0)

    return NextResponse.json({
      earnings,
      totalEarnings,
      pendingEarnings,
    })
  } catch (error) {
    console.error("Failed to fetch earnings:", error)
    return NextResponse.json(
      { error: "Failed to fetch earnings" },
      { status: 500 }
    )
  }
}