import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth-options";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || session.user.role;

    if (type === "CREATOR") {
      const profile = await prisma.profile.findUnique({
        where: { userId: session.user.id },
      });

      const campaigns = await prisma.campaignCreator.count({
        where: {
          creatorId: session.user.id,
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

      return NextResponse.json({
        activeProjects: campaigns,
        totalEarnings: earnings,
        totalFollowers: followers,
        engagementRate,
      });
    }

    // Company metrics
    const activeCampaigns = await prisma.campaign.count({
      where: {
        companyId: session.user.id,
        status: "ACTIVE",
      },
    });

    const campaigns = await prisma.campaign.findMany({
      where: {
        companyId: session.user.id,
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

    return NextResponse.json({
      activeCampaigns,
      totalReach,
      totalSpent,
      averageEngagement: 4.3, // This would be calculated from actual engagement metrics
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}