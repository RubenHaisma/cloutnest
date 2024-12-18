"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function PageHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <PlayCircle className="h-6 w-6 text-cyan-500" />
          <span className="text-xl font-bold">PlaylistPro</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-cyan-500 hover:bg-cyan-600">Sign up</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}