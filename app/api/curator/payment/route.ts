import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount, trackId } = await req.json()

    // Create a transfer to the curator's connected Stripe account
    const transfer = await stripe.transfers.create({
      amount: amount * 100, // Convert to cents
      currency: "usd",
      destination: session.user.stripeAccountId!, // Curator's connected account ID
      metadata: {
        trackId,
        curatorId: session.user.id,
      },
    })

    return NextResponse.json({ success: true, transfer })
  } catch (error) {
    console.error("Payment failed:", error)
    return NextResponse.json(
      { error: "Payment processing failed" },
      { status: 500 }
    )
  }
}