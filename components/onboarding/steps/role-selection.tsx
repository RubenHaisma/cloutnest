"use client"

import { Button } from "@/components/ui/button"
import { Music, Users } from "lucide-react"
import { useOnboardingStore } from "@/hooks/use-onboarding-store"
import { Card } from "@/components/ui/card"
import { useState } from 'react'

export function RoleSelection() {
  const { updateData, setStep } = useOnboardingStore()
  const [isLoading, setIsLoading] = useState(false)

  const selectRole = async (role: 'artist' | 'curator') => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/user/update-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      })

      if (!response.ok) {
        throw new Error('Failed to update role')
      }

      updateData({ role })
      setStep(2)
    } catch (error) {
      console.error('Error updating role:', error)
      // You might want to add a toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Choose your role</h1>
        <p className="text-muted-foreground">
          Select how you want to use PlaylistPro
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card
          className={`relative flex flex-col items-center p-6 cursor-pointer hover:border-primary ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={() => selectRole('artist')}
        >
          <Music className="h-12 w-12 mb-4" />
          <h3 className="text-xl font-semibold">Artist</h3>
          <p className="text-sm text-center text-muted-foreground mt-2">
            Promote your music and connect with playlist curators
          </p>
        </Card>
        <Card
          className={`relative flex flex-col items-center p-6 cursor-pointer hover:border-primary ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={() => selectRole('curator')}
        >
          <Users className="h-12 w-12 mb-4" />
          <h3 className="text-xl font-semibold">Curator</h3>
          <p className="text-sm text-center text-muted-foreground mt-2">
            Discover new music and grow your playlists
          </p>
        </Card>
      </div>
    </div>
  )
}