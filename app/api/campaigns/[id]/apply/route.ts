import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth-options";
import { z } from "zod";

const applicationSchema = z.object({
  proposal: z.string().min(50).max(1000),
  price: z.number().min(1),
  deliverables: z.array(z.object({
    type: z.string(),
    quantity: z.number().min(1),
    description: z.string(),
  })),
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions) as (Session & { user: { id: string; role: string } }) | null;
    if (!session || !session.user || session.user.role !== "CREATOR") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = applicationSchema.parse(await req.json());

    // Check if already applied
    const existingApplication = await prisma.campaignCreator.findUnique({
      where: {
        campaignId_creatorId: {
          campaignId: params.id,
          creatorId: session.user.id,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "Already applied to this campaign" },
        { status: 400 }
      );
    }

    const application = await prisma.campaignCreator.create({
      data: {
        campaignId: params.id,
        creatorId: session.user.id,
        proposal: data.proposal,
        price: data.price,
        deliverables: data.deliverables,
        status: "PENDING",
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Campaign application error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to apply to campaign" },
      { status: 500 }
    );
  }
}