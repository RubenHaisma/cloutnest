export interface OnboardingData {
  role: 'artist' | 'curator'
  name: string
  bio: string
  genres: string[]
  spotifyProfile?: string
}

export interface OnboardingFormState {
  step: number
  data: Partial<OnboardingData>
}

export type EarningsTimeframe = 'week' | 'month' | 'year'

export interface EarningsData {
  date: string
  earnings: number
  tracks: number
}