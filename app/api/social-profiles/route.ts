import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth-options";
import { z } from "zod";

const socialSchema = z.object({
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  twitter: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = socialSchema.parse(await req.json());

    await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        socialLinks: data,
      },
      create: {
        userId: session.user.id,
        socialLinks: data,
      },
    });

    return NextResponse.json({ message: "Social profiles updated successfully" });
  } catch (error) {
    console.error("Social profiles update error:", error);
    return NextResponse.json(
      { error: "Failed to update social profiles" },
      { status: 500 }
    );
  }
}