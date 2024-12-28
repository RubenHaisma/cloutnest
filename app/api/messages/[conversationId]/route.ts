import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth-options";

export async function GET(
  req: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: params.conversationId },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Verify user is part of the conversation
    if (
      conversation.creatorId !== session.user.id &&
      conversation.companyId !== session.user.id
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Mark unread messages as read
    await prisma.message.updateMany({
      where: {
        conversationId: params.conversationId,
        receiverId: session.user.id,
        read: false,
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json(conversation.messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}