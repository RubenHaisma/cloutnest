import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth-options";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const priceRange = searchParams.get("priceRange");

    let priceFilter = {};
    if (priceRange) {
      const [min, max] = priceRange.split("-");
      priceFilter = {
        price: {
          gte: parseInt(min),
          ...(max !== "+" ? { lte: parseInt(max) } : {}),
        },
      };
    }

    const content = await prisma.marketplaceContent.findMany({
      where: {
        ...(type !== "all" ? { type } : {}),
        ...(category ? {
          categories: {
            has: category,
          },
        } : {}),
        ...priceFilter,
      },
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

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching marketplace content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}