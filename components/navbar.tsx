"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { Menu, X, Rocket, Users } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center gap-2">
              <Rocket className="h-6 w-6" />
              <span className="font-bold text-xl">CloutNest</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/preview" className="text-foreground/60 hover:text-foreground">
              Preview
            </Link>
            <Link href="/pricing" className="text-foreground/60 hover:text-foreground">
              Pricing
            </Link>
            <Link href="/about" className="text-foreground/60 hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="text-foreground/60 hover:text-foreground">
              Contact
            </Link>
            <ModeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 ml-4"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/preview"
              className="block px-3 py-2 text-foreground/60 hover:text-foreground"
            >
              Preview
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 text-foreground/60 hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-foreground/60 hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-foreground/60 hover:text-foreground"
            >
              Contact
            </Link>
            <div className="space-y-2 pt-4">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
