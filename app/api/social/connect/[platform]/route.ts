import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth-options";
import { InstagramBasicDisplayApi } from "@/lib/services/instagram";
import { TikTokApi } from "@/lib/services/tiktok";

export async function POST(
  req: Request,
  { params }: { params: { platform: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { code } = await req.json();
    const { platform } = params;

    let profileData;
    let accessToken;
    let platformId;

    switch (platform) {
      case "instagram":
        // Exchange code for access token
        const igResponse = await fetch(
          "https://api.instagram.com/oauth/access_token",
          {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.INSTAGRAM_CLIENT_ID!,
              client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
              grant_type: "authorization_code",
              redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
              code,
            }),
          }
        );

        const igData = await igResponse.json();
        accessToken = igData.access_token;
        platformId = igData.user_id;

        // Get profile data
        const igApi = new InstagramBasicDisplayApi(accessToken);
        profileData = await igApi.getProfile();
        break;

      case "tiktok":
        // Exchange code for access token
        const ttResponse = await fetch(
          "https://open-api.tiktok.com/oauth/access_token/",
          {
            method: "POST",
            body: new URLSearchParams({
              client_key: process.env.TIKTOK_CLIENT_KEY!,
              client_secret: process.env.TIKTOK_CLIENT_SECRET!,
              code,
              grant_type: "authorization_code",
            }),
          }
        );

        const ttData = await ttResponse.json();
        accessToken = ttData.access_token;
        platformId = ttData.open_id;

        // Get profile data
        const ttApi = new TikTokApi(accessToken);
        profileData = await ttApi.getProfile();
        break;

      default:
        return NextResponse.json(
          { error: "Unsupported platform" },
          { status: 400 }
        );
    }

    // Save or update social account
    const socialAccount = await prisma.socialAccount.upsert({
      where: {
        userId_platform: {
          userId: session.user.id,
          platform,
        },
      },
      update: {
        accessToken,
        platformId,
        username: profileData.username,
        followers: profileData.followers_count || 0,
        lastSync: new Date(),
      },
      create: {
        userId: session.user.id,
        platform,
        accessToken,
        platformId,
        username: profileData.username,
        followers: profileData.followers_count || 0,
      },
    });

    return NextResponse.json(socialAccount);
  } catch (error) {
    console.error("Error connecting social account:", error);
    return NextResponse.json(
      { error: "Failed to connect social account" },
      { status: 500 }
    );
  }
}
