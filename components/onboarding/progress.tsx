"use client";

import { useOnboarding } from "@/lib/hooks/use-onboarding";
import { Check } from "lucide-react";

export function OnboardingProgress() {
  const { steps, currentStep } = useOnboarding();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step.isComplete
                  ? "bg-primary border-primary text-primary-foreground"
                  : step.id === currentStep
                  ? "border-primary text-primary"
                  : "border-muted-foreground text-muted-foreground"
              }`}
            >
              {step.isComplete ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-full h-0.5 mx-2 ${
                  step.isComplete ? "bg-primary" : "bg-muted-foreground"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          {steps.find((s) => s.id === currentStep)?.title}
        </h2>
        <p className="text-muted-foreground">
          {steps.find((s) => s.id === currentStep)?.description}
        </p>
      </div>
    </div>
  );
}