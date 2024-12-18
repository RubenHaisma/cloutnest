"use client"

import { useOnboardingStore } from "@/hooks/use-onboarding-store"

export function OnboardingProgress() {
  const step = useOnboardingStore((state) => state.step)
  const totalSteps = 4

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
        <span className="text-sm font-medium">{Math.round((step / totalSteps) * 100)}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
}