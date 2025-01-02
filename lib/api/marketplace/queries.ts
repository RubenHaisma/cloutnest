import { prisma } from "@/lib/prisma";
import { MarketplaceFilters } from "./types";

export async function getMarketplaceItems(filters: MarketplaceFilters) {
  const where: any = {};

  if (filters.type && filters.type !== "all") {
    where.type = filters.type;
  }

  if (filters.category) {
    where.categories = {
      has: filters.category,
    };
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split("-");
    where.price = {
      gte: parseInt(min),
      ...(max !== "+" ? { lte: parseInt(max) } : {}),
    };
  }

  return prisma.marketplaceContent.findMany({
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
}

export async function createMarketplaceItem(data: any, creatorId: string) {
  return prisma.marketplaceContent.create({
    data: {
      ...data,
      creatorId,
    },
  });
}