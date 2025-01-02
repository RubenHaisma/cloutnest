import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/prisma";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  // Check if user has completed onboarding
  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
  });

  if (profile?.onboardingComplete) {
    redirect(session.user.role === "CREATOR" ? "/dashboard/creator" : "/dashboard/company");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="w-full max-w-3xl px-4">{children}</div>
    </div>
  );
}