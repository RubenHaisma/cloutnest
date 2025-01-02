"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/hooks/use-onboarding";
import { OnboardingProgress } from "@/components/onboarding/progress";
import { ProfileForm } from "@/components/onboarding/profile-form";
import { SocialForm } from "@/components/onboarding/social-form";
import { PreferencesForm } from "@/components/onboarding/preferences-form";

export default function OnboardingPage() {
  const router = useRouter();
  const { currentStep, isComplete } = useOnboarding();

  useEffect(() => {
    if (isComplete) {
      router.push("/dashboard");
    }
  }, [isComplete, router]);

  return (
    <div className="space-y-8 py-10">
      <OnboardingProgress />
      
      {currentStep === "profile" && <ProfileForm />}
      {currentStep === "social" && <SocialForm />}
      {currentStep === "preferences" && <PreferencesForm />}
    </div>
  );
}