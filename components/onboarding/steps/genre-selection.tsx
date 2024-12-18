"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useOnboardingStore } from "@/hooks/use-onboarding-store"
import { cn } from "@/lib/utils"
import { useState } from "react"

const GENRES = [
  "Pop", "Hip Hop", "R&B", "Rock", "Electronic", "Jazz",
  "Classical", "Country", "Folk", "Latin", "Metal",
  "Blues", "Reggae", "World", "Alternative", "Indie"
]

export function GenreSelection() {
  const { updateData, setStep } = useOnboardingStore()
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  const handleContinue = () => {
    updateData({ genres: selectedGenres })
    setStep(4)
  }

  return (
    <div className="grid gap-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Select your genres</h1>
        <p className="text-muted-foreground">
          Choose the genres that best match your music or curation style
        </p>
      </div>
      <ScrollArea className="h-[320px] rounded-md border p-4">
        <div className="grid grid-cols-2 gap-2 pr-4 sm:grid-cols-3">
          {GENRES.map((genre) => (
            <Badge
              key={genre}
              variant="outline"
              className={cn(
                "cursor-pointer text-center",
                selectedGenres.includes(genre) ? "bg-primary text-primary-foreground" : ""
              )}
              onClick={() => toggleGenre(genre)}
            >
              {genre}
            </Badge>
          ))}
        </div>
      </ScrollArea>
      <Button
        onClick={handleContinue}
        disabled={selectedGenres.length === 0}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  )
}