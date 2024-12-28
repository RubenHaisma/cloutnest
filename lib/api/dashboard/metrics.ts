import { prisma } from "@/lib/prisma";

export async function getCreatorMetrics(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  const campaigns = await prisma.campaignCreator.count({
    where: {
      creatorId: userId,
      status: "ACCEPTED",
    },
  });

  const earnings = profile?.totalEarnings || 0;
  const followers = profile?.socialLinks ? 
    Object.values(profile.socialLinks as any).reduce(
      (sum: number, account: any) => sum + (account.followers || 0), 
      0
    ) : 0;
  const engagementRate = profile?.socialLinks ?
    Object.values(profile.socialLinks as any).reduce(
      (sum: number, account: any) => sum + (account.engagementRate || 0),
      0
    ) / Object.keys(profile.socialLinks).length : 0;

  return {
    activeProjects: campaigns,
    totalEarnings: earnings,
    totalFollowers: followers,
    engagementRate,
  };
}

export async function getCompanyMetrics(userId: string) {
  const activeCampaigns = await prisma.campaign.count({
    where: {
      companyId: userId,
      status: "ACTIVE",
    },
  });

  const campaigns = await prisma.campaign.findMany({
    where: {
      companyId: userId,
      status: "ACTIVE",
    },
    include: {
      creators: {
        include: {
          creator: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
  });

  const totalReach = campaigns.reduce((sum, campaign) => {
    return sum + campaign.creators.reduce((creatorSum, { creator }) => {
      const socialLinks = creator.profile?.socialLinks as any;
      return creatorSum + Object.values(socialLinks || {}).reduce(
        (followersSum: number, account: any) => followersSum + (account.followers || 0),
        0
      );
    }, 0);
  }, 0);

  const totalSpent = campaigns.reduce(
    (sum, campaign) => sum + campaign.budget,
    0
  );

  return {
    activeCampaigns,
    totalReach,
    totalSpent,
    averageEngagement: 4.3, // This would be calculated from actual engagement metrics
  };
}