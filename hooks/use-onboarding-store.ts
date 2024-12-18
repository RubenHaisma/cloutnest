"use client"

import { create } from "zustand"
import { OnboardingData, OnboardingFormState } from "@/lib/types"

interface OnboardingStore extends OnboardingFormState {
  setStep: (step: number) => void
  updateData: (data: Partial<OnboardingData>) => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 1,
  data: {},
  setStep: (step) => set({ step }),
  updateData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  reset: () => set({ step: 1, data: {} }),
}))