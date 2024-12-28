import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth-options";
import { z } from "zod";

const messageSchema = z.object({
  conversationId: z.string(),
  content: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = messageSchema.parse(await req.json());

    const conversation = await prisma.conversation.findUnique({
      where: { id: data.conversationId },
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

    const receiverId =
      conversation.creatorId === session.user.id
        ? conversation.companyId
        : conversation.creatorId;

    const message = await prisma.message.create({
      data: {
        content: data.content,
        conversationId: data.conversationId,
        senderId: session.user.id,
        receiverId,
      },
    });

    // Update conversation's updatedAt
    await prisma.conversation.update({
      where: { id: data.conversationId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid message data" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}