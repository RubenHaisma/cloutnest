"use client"

import { PlayCircle } from "lucide-react"

export function PageFooter() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex items-center space-x-2">
          <PlayCircle className="h-6 w-6 text-cyan-500" />
          <span className="text-xl font-bold">PlaylistPro</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2024 PlaylistPro. All rights reserved.
        </p>
      </div>
    </footer>
  )
}