import { prisma } from "@/lib/prisma";

export async function getConversations(userId: string) {
  return prisma.conversation.findMany({
    where: {
      OR: [
        { creatorId: userId },
        { companyId: userId },
      ],
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      company: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getMessages(conversationId: string) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function createMessage(data: {
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
}) {
  const [message] = await prisma.$transaction([
    prisma.message.create({
      data: {
        ...data,
        read: false,
      },
    }),
    prisma.conversation.update({
      where: { id: data.conversationId },
      data: { updatedAt: new Date() },
    }),
  ]);

  return message;
}