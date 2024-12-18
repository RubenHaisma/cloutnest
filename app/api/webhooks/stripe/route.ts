import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Enable dynamic route handling
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get("stripe-signature")!

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (!session?.metadata?.userId) {
          throw new Error("No user ID in session metadata")
        }

        await prisma.user.update({
          where: { id: session.metadata.userId },
          data: {
            stripeSubscriptionId: session.subscription as string,
          },
        })
        break
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        
        // Find user by Stripe Customer ID
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: subscription.customer as string },
        })

        if (!user) {
          throw new Error("No user found with Stripe Customer ID")
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeSubscriptionId: subscription.id,
          },
        })
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        
        // Find user by Stripe Customer ID
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: subscription.customer as string },
        })

        if (!user) {
          throw new Error("No user found with Stripe Customer ID")
        }

        // Remove user's subscription
        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeSubscriptionId: null,
          },
        })
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
          const user = await prisma.user.findFirst({
            where: { stripeCustomerId: invoice.customer as string },
          })

          if (user) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                stripeSubscriptionId: subscription.id,
              },
            })
          }
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: invoice.customer as string },
        })

        if (user) {
          // You might want to send an email to the user here
          console.error(`Payment failed for user ${user.id}`)
        }
        break
      }

      case "account.updated": {
        const account = event.data.object as Stripe.Account
        
        await prisma.user.updateMany({
          where: { stripeAccountId: account.id },
          data: {
            stripeAccountStatus: account.charges_enabled ? "active" : "pending",
          },
        })
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    )
  }
}