import { prisma } from "@/lib/prisma";

export async function getActiveCampaigns(userId: string, role: string) {
  if (role === "CREATOR") {
    return prisma.campaignCreator.findMany({
      where: {
        creatorId: userId,
        status: "ACCEPTED",
        campaign: {
          status: "ACTIVE",
        },
      },
      include: {
        campaign: {
          include: {
            company: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
  }

  return prisma.campaign.findMany({
    where: {
      companyId: userId,
      status: "ACTIVE",
    },
    include: {
      creators: {
        include: {
          creator: {
            select: {
              name: true,
              image: true,
              profile: true,
            },
          },
        },
      },
    },
  });
}

export async function getRecentApplications(campaignId: string) {
  return prisma.campaignCreator.findMany({
    where: {
      campaignId,
      status: "PENDING",
    },
    include: {
      creator: {
        select: {
          name: true,
          image: true,
          profile: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
}