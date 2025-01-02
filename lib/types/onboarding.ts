export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
};

export type OnboardingState = {
  currentStep: string;
  steps: OnboardingStep[];
  isComplete: boolean;
};

export type ProfileFormData = {
  bio: string;
  location: string;
  website?: string;
  categories: string[];
  languages: string[];
};

export type SocialFormData = {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
};