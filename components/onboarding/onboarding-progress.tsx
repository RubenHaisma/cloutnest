"use client";

import { useOnboardingStore } from "@/hooks/use-onboarding-store";

export function OnboardingProgress() {
  const step = useOnboardingStore((state) => state.step);
  const totalSteps = 4;

  return (
    <div className="w-full">
      {/* Step Information */}
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-400">
          Step {step} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-300">
          {Math.round((step / totalSteps) * 100)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-300 ease-in-out"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}
