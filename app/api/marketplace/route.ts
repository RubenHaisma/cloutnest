import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const marketplaceItemSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
  type: z.enum(["image", "video", "template"]),
  price: z.number().min(1),
  categories: z.array(z.string()).min(1),
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const priceRange = searchParams.get("priceRange");

    const where: any = {};

    if (type && type !== "all") {
      where.type = type;
    }

    if (category) {
      where.categories = {
        has: category,
      };
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-");
      where.price = {
        gte: parseInt(min),
        ...(max !== "+" ? { lte: parseInt(max) } : {}),
      };
    }

    const items = await prisma.marketplaceContent.findMany({
      where,
      include: {
        creator: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      price: parseFloat(formData.get("price") as string),
      categories: JSON.parse(formData.get("categories") as string),
    };

    const validatedData = marketplaceItemSchema.parse(data);

    const item = await prisma.marketplaceContent.create({
      data: {
        ...validatedData,
        fileUrl: "placeholder-url", // Replace with actual file upload
        previewUrl: "placeholder-url", // Replace with actual preview
        creatorId: session.user.id,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating marketplace item:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}