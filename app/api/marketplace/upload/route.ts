import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth-options";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const type = formData.get("type") as string;
    const categories = JSON.parse(formData.get("categories") as string);
    const file = formData.get("file") as File;

    // Here you would handle file upload to your storage service
    // For now, we'll just use a placeholder URL
    const fileUrl = "https://placeholder.com/image.jpg";

    const content = await prisma.marketplaceContent.create({
      data: {
        title,
        description,
        price,
        type,
        categories,
        fileUrl,
        previewUrl: fileUrl,
        creatorId: session.user.id,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error uploading content:", error);
    return NextResponse.json(
      { error: "Failed to upload content" },
      { status: 500 }
    );
  }
}