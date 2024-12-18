import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create a Stripe Connect account for the curator
    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: session.user?.email!,
      capabilities: {
        transfers: { requested: true },
      },
      business_type: "individual",
      metadata: {
        userId: session.user.id,
      },
    })

    // Update user with Stripe account ID
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        stripeAccountId: account.id,
        stripeAccountStatus: "pending",
      },
    })

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXTAUTH_URL}/dashboard/curator/settings`,
      return_url: `${process.env.NEXTAUTH_URL}/dashboard/curator/settings`,
      type: "account_onboarding",
    })

    return NextResponse.json({ url: accountLink.url })
  } catch (error) {
    console.error("Failed to create Stripe account:", error)
    return NextResponse.json(
      { error: "Failed to create Stripe account" },
      { status: 500 }
    )
  }
}