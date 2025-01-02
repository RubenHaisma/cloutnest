import { prisma } from "@/lib/prisma";
import { SocialAccount } from "@/lib/types/social";

export async function getSocialAccounts(userId: string) {
  return prisma.socialAccount.findMany({
    where: { userId },
  });
}


export async function updateSocialAccount(
  userId: string,
  platform: string,
  data: Partial<SocialAccount>
) {
  return prisma.socialAccount.update({
    where: {
      userId_platform: {
        userId,
        platform,
      },
    },
    data,
  });
}

export async function deleteSocialAccount(userId: string, platform: string) {
  return prisma.socialAccount.delete({
    where: {
      userId_platform: {
        userId,
        platform,
      },
    },
  });
}