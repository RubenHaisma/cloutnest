"use client"

import { useOnboardingStore } from "@/hooks/use-onboarding-store"
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress"
import { RoleSelection } from "@/components/onboarding/steps/role-selection"
import { ProfileSetup } from "@/components/onboarding/steps/profile-setup"
import { GenreSelection } from "@/components/onboarding/steps/genre-selection"
import { SpotifyConnect } from "@/components/onboarding/steps/spotify-connect"
import { PlayCircle } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  const step = useOnboardingStore((state) => state.step)

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <PlayCircle className="h-6 w-6 text-cyan-500" />
          <span className="text-xl font-bold">PlaylistPro</span>
        </Link>
      </div>
      <main className="flex-1 container max-w-lg mx-auto px-4 py-8">
        <OnboardingProgress />
        <div className="mt-8">
          {step === 1 && <RoleSelection />}
          {step === 2 && <ProfileSetup />}
          {step === 3 && <GenreSelection />}
          {step === 4 && <SpotifyConnect />}
        </div>
      </main>
    </div>
  )
}