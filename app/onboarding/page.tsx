"use client";

import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { RoleSelection } from "@/components/onboarding/steps/role-selection";
import { ProfileSetup } from "@/components/onboarding/steps/profile-setup";
import { NicheSelection } from "@/components/onboarding/steps/niche-selection";
import { SocialConnect } from "@/components/onboarding/steps/socials-connect";
import { Globe } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  const step = useOnboardingStore((state) => state.step);

  return (
    <div className="flex min-h-screen flex-col bg-background text-gray-100">
      {/* Header */}
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-emerald-500" />
          <span className="text-xl font-bold">CloutNest</span>
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 container max-w-lg mx-auto px-4 py-8">
        <OnboardingProgress />
        <div className="mt-8">
          {step === 1 && <RoleSelection />}
          {step === 2 && <ProfileSetup />}
          {step === 3 && <NicheSelection />}
          {step === 4 && <SocialConnect />}
        </div>
      </main>
    </div>
  );
}
