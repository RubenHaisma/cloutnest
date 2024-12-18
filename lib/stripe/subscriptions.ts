import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function createSubscription(userId: string, priceId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user?.stripeCustomerId) {
    throw new Error("No Stripe customer ID found")
  }

  const subscription = await stripe.subscriptions.create({
    customer: user.stripeCustomerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    expand: ["latest_invoice.payment_intent"],
  })

  await prisma.user.update({
    where: { id: userId },
    data: {
      stripeSubscriptionId: subscription.id,
    },
  })

  return subscription
}

export async function cancelSubscription(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user?.stripeSubscriptionId) {
    throw new Error("No active subscription found")
  }

  // Use cancel instead of del
  const subscription = await stripe.subscriptions.cancel(user.stripeSubscriptionId)

  await prisma.user.update({
    where: { id: userId },
    data: {
      stripeSubscriptionId: null,
    },
  })

  return subscription
}

export async function updateSubscription(userId: string, newPriceId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user?.stripeSubscriptionId) {
    throw new Error("No active subscription found")
  }

  const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId)
  
  await stripe.subscriptions.update(subscription.id, {
    items: [{
      id: subscription.items.data[0].id,
      price: newPriceId,
    }],
  })

  return subscription
}

export async function getSubscriptionDetails(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user?.stripeSubscriptionId) {
    return null
  }

  try {
    const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId)
    return {
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      priceId: subscription.items.data[0].price.id,
      interval: subscription.items.data[0].price.recurring?.interval,
      amount: subscription.items.data[0].price.unit_amount,
      currency: subscription.items.data[0].price.currency,
    }
  } catch (error) {
    console.error("Error retrieving subscription:", error)
    return null
  }
}

export async function resumeSubscription(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user?.stripeSubscriptionId) {
    throw new Error("No subscription found")
  }

  const subscription = await stripe.subscriptions.update(user.stripeSubscriptionId, {
    cancel_at_period_end: false,
  })

  return subscription
}

export async function handleSubscriptionChange(event: Stripe.Event) {
  if (event.type === "customer.subscription.deleted") {
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
  }
}