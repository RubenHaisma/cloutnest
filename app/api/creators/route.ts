import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth-options";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const platform = searchParams.get("platform");
    const niche = searchParams.get("niche");
    const minFollowers = searchParams.get("minFollowers");
    const location = searchParams.get("location");

    const creators = await prisma.user.findMany({
      where: {
        role: "CREATOR",
        profile: {
          ...(platform ? {
            socialLinks: {
              path: ["$.*.platform"],
              string_contains: platform,
            },
          } : {}),
          ...(niche ? {
            categories: {
              has: niche,
            },
          } : {}),
          ...(minFollowers ? {
            socialLinks: {
              path: ["$.*.followers"],
              gte: parseInt(minFollowers),
            },
          } : {}),
          ...(location ? {
            location: {
              contains: location,
              mode: "insensitive",
            },
          } : {}),
        },
      },
      include: {
        profile: true,
      },
      take: 50,
    });

    const formattedCreators = creators.map((creator) => ({
      id: creator.id,
      name: creator.name,
      image: creator.image,
      bio: creator.profile?.bio,
      location: creator.profile?.location,
      followers: Object.values(creator.profile?.socialLinks || {}).reduce(
        (sum: number, account: any) => sum + (account.followers || 0),
        0
      ),
      engagementRate: Object.values(creator.profile?.socialLinks || {}).reduce(
        (sum: number, account: any) => sum + (account.engagementRate || 0),
        0
      ) / Object.keys(creator.profile?.socialLinks || {}).length || 0,
      platforms: Object.values(creator.profile?.socialLinks || {}).map(
        (account: any) => account.platform
      ),
      categories: creator.profile?.categories || [],
    }));

    return NextResponse.json(formattedCreators);
  } catch (error) {
    console.error("Error fetching creators:", error);
    return NextResponse.json(
      { error: "Failed to fetch creators" },
      { status: 500 }
    );
  }
}