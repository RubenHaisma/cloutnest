import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth-options";
import { z } from "zod";

const preferencesSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  marketingEmails: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = preferencesSchema.parse(await req.json());

    await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        preferences: data,
        onboardingComplete: true,
      },
      create: {
        userId: session.user.id,
        preferences: data,
        onboardingComplete: true,
      },
    });

    return NextResponse.json({ message: "Preferences updated successfully" });
  } catch (error) {
    console.error("Preferences update error:", error);
    return NextResponse.json(
      { error: "Failed to update preferences" },
      { status: 500 }
    );
  }
}