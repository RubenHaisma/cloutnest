import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth-options";
import { z } from "zod";

const campaignSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
  budget: z.number().min(100),
  requirements: z.object({
    minFollowers: z.number().min(1000),
    platforms: z.array(z.string()).min(1),
    niche: z.array(z.string()).min(1),
  }),
  deliverables: z.array(z.string()).min(1),
  timeline: z.number().min(1).max(90),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as (Session & { user: { id: string, role: string } }) | null;
    if (!session || !session.user || session.user.role !== "COMPANY") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = campaignSchema.parse(await req.json());

    const campaign = await prisma.campaign.create({
      data: {
        title: data.title,
        description: data.description,
        budget: data.budget,
        requirements: data.requirements,
        deliverables: data.deliverables,
        timeline: data.timeline,
        status: "DRAFT",
        companyId: session.user.id,
        startDate: new Date(),
        endDate: new Date(Date.now() + data.timeline * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("Campaign creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}