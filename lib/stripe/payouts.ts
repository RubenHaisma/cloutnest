import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function processPayout(curatorId: string, amount: number) {
  const curator = await prisma.user.findUnique({
    where: { id: curatorId },
  })

  if (!curator?.stripeAccountId) {
    throw new Error("No Stripe account found")
  }

  const transfer = await stripe.transfers.create({
    amount: Math.round(amount * 100),
    currency: "usd",
    destination: curator.stripeAccountId,
  })

  await prisma.curatorEarnings.updateMany({
    where: {
      curatorId,
      paidOut: false,
    },
    data: {
      paidOut: true,
      transferId: transfer.id,
    },
  })

  return transfer
}

export async function getPayoutHistory(curatorId: string) {
  return await prisma.curatorEarnings.findMany({
    where: {
      curatorId,
      paidOut: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      track: true,
    },
  })
}

export async function getAvailableBalance(curatorId: string) {
  const result = await prisma.curatorEarnings.aggregate({
    where: {
      curatorId,
      paidOut: false,
    },
    _sum: {
      amount: true,
    },
  })

  return result._sum.amount || 0
}