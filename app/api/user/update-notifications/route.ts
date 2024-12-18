import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import * as z from "zod";

const updateNotificationsSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  newPlaylistAlerts: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedFields = updateNotificationsSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const { emailNotifications, marketingEmails, newPlaylistAlerts } = validatedFields.data;

    // // Update user notification preferences in your database
    // // You might need to add these fields to your User model in schema.prisma
    // await prisma.user.update({
    //   where: { email: session.user.email },
    //   data: {
    //     // Store these preferences in your preferred way
    //     // For now, we'll store them in a JSON field if it exists
    //     notificationPreferences: {
    //       emailNotifications,
    //       marketingEmails,
    //       newPlaylistAlerts,
    //     },
    //   },
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating notifications:", error);
    return NextResponse.json(
      { error: "Failed to update notification preferences" },
      { status: 500 }
    );
  }
}
