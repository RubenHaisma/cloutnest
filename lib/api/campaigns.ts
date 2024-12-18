import { prisma } from "@/lib/prisma"

export async function getCampaign(id: string) {
  return await prisma.campaign.findUnique({
    where: { id },
    include: {
      tracks: {
        include: {
          track: true,
        },
      },
    },
  })
}

export async function createCampaign(data: {
  title: string
  description?: string
  budget: number
  targetRegion?: string
  startDate: Date
  endDate: Date
  userId: string
}) {
  return await prisma.campaign.create({
    data,
  })
}

export async function updateCampaign(id: string, data: {
  title?: string
  description?: string
  status?: string
  budget?: number
  spent?: number
  targetRegion?: string
  startDate?: Date
  endDate?: Date
}) {
  return await prisma.campaign.update({
    where: { id },
    data,
  })
}

export async function deleteCampaign(id: string) {
  return await prisma.campaign.delete({
    where: { id },
  })
}

export async function getUserCampaigns(userId: string, status?: string) {
  return await prisma.campaign.findMany({
    where: {
      userId,
      ...(status && { status }),
    },
    include: {
      tracks: {
        include: {
          track: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}