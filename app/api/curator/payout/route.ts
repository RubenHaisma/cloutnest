import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount } = await req.json()

    // Verify curator has enough unpaid earnings
    const earnings = await prisma.curatorEarnings.aggregate({
      where: {
        curatorId: session.user.id,
        paidOut: false,
      },
      _sum: {
        amount: true,
      },
    })

    if (!earnings._sum.amount || earnings._sum.amount < amount) {
      return NextResponse.json(
        { error: "Insufficient unpaid earnings" },
        { status: 400 }
      )
    }

    // Create a transfer to the curator's connected account
    const transfer = await stripe.transfers.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      destination: session.user.stripeAccountId!,
      metadata: {
        curatorId: session.user.id,
      },
    })

    // Mark earnings as pending payout
    await prisma.curatorEarnings.updateMany({
      where: {
        curatorId: session.user.id,
        paidOut: false,
      },
      data: {
        transferId: transfer.id,
      },
    })

    return NextResponse.json({ success: true, transfer })
  } catch (error) {
    console.error("Payout failed:", error)
    return NextResponse.json(
      { error: "Payout processing failed" },
      { status: 500 }
    )
  }
}