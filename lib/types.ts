export interface OnboardingData {
  role: 'influencer' | 'business'; // Updated to reflect CloutNest roles
  name: string; // Name or brand name
  bio: string; // About the influencer or business
  industries: string[]; // Changed from "genres" to "industries" to match the business/influencer focus
  instagramProfile?: string; // Added Instagram profile connection
  tiktokProfile?: string; // Added TikTok profile connection
}

export interface OnboardingFormState {
  step: number; // Current step in the onboarding process
  data: Partial<OnboardingData>; // Partial onboarding data as the user progresses
}

export type EarningsTimeframe = 'week' | 'month' | 'year';

export interface EarningsData {
  date: string; // Date of earnings data
  earnings: number; // Total earnings for the timeframe
  campaigns: number; // Updated to represent campaigns instead of tracks
}
