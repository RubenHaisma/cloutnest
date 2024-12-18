import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const REVIEW_REWARD = 0.50 // $0.50 per review

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get pending submissions for curator
    const submissions = await prisma.trackSubmission.findMany({
      where: {
        curatorId: session.user.id,
        status: "pending"
      },
      include: {
        track: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error("[SUBMISSIONS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const { submissionId, status, feedback } = json;

    // Start a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update submission
      const submission = await tx.trackSubmission.update({
        where: { id: submissionId },
        data: {
          status,
          feedback,
          reviewedAt: new Date(),
        },
      });

      // Create earnings record if approved
      if (status === "approved") {
        await tx.curatorEarnings.create({
          data: {
            submissionId: submission.id,
            curatorId: session.user.id,
            amount: REVIEW_REWARD,
            status: "pending",
            trackId: submission.trackId,
          },
        });

        // Update curator's total earnings
        await tx.user.update({
          where: { id: session.user.id },
          data: {
            totalEarnings: {
              increment: REVIEW_REWARD,
            },
          },
        });                
      }

      return submission;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[SUBMISSIONS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
