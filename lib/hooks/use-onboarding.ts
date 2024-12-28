"use client";

import { create } from "zustand";
import { OnboardingState } from "../types/onboarding";

type OnboardingStore = OnboardingState & {
  setCurrentStep: (step: string) => void;
  completeStep: (stepId: string) => void;
  resetOnboarding: () => void;
};

const initialState: OnboardingState = {
  currentStep: "profile",
  steps: [
    {
      id: "profile",
      title: "Complete Your Profile",
      description: "Tell us about yourself",
      isComplete: false,
    },
    {
      id: "social",
      title: "Connect Social Accounts",
      description: "Link your social media profiles",
      isComplete: false,
    },
    {
      id: "preferences",
      title: "Set Your Preferences",
      description: "Customize your experience",
      isComplete: false,
    },
  ],
  isComplete: false,
};

export const useOnboarding = create<OnboardingStore>((set) => ({
  ...initialState,
  setCurrentStep: (step) => set({ currentStep: step }),
  completeStep: (stepId) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === stepId ? { ...step, isComplete: true } : step
      ),
      isComplete: state.steps.every((step) => 
        step.id === stepId ? true : step.isComplete
      ),
    })),
  resetOnboarding: () => set(initialState),
}));