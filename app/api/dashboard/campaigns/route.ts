import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth-options";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions) as { user: { id: string, role: string, name?: string | null, email?: string | null, image?: string | null } };
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || (session.user as { id: string, role: string }).role;

    if (type === "CREATOR") {
      const campaigns = await prisma.campaignCreator.findMany({
        where: {
          creatorId: (session.user as { id: string }).id,
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
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json(campaigns);
    }

    // Company campaigns
    const campaigns = await prisma.campaign.findMany({
      where: {
        companyId: (session.user as { id: string }).id,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}