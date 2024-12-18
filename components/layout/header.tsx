"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSession } from "next-auth/react"
import { LogoutButton } from "@/components/auth/logout-button"
import { useState } from "react"

export function Header() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <PlayCircle className="h-6 w-6 text-cyan-500" />
          <span className="text-xl font-bold">PlaylistPro</span>
        </Link>

        {/* Theme Toggle */}
        <div className="flex items-center lg:hidden ml-auto">
        <ThemeToggle />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4">
          <Link href="/how-it-works">
            <Button variant="ghost">How it works</Button>
          </Link>
          <Link href="/blog">
            <Button variant="ghost">Blog</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          <ThemeToggle />
          {session ? (
            <>
              <Link href="/dashboard">
                <Button className="bg-cyan-500 hover:bg-cyan-600">Dashboard</Button>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-cyan-500 hover:bg-cyan-600">Sign up</Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
          <nav className="flex flex-col space-y-2 p-4">
            <Link href="/how-it-works" onClick={toggleMobileMenu}>
              <Button variant="ghost" className="w-full text-left">
                How it works
              </Button>
            </Link>
            <Link href="/blog" onClick={toggleMobileMenu}>
              <Button variant="ghost" className="w-full text-left">
                Blog
              </Button>
            </Link>
            <Link href="/pricing" onClick={toggleMobileMenu}>
              <Button variant="ghost" className="w-full text-left">
                Pricing
              </Button>
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" onClick={toggleMobileMenu}>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 w-full text-left">
                    Dashboard
                  </Button>
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/login" onClick={toggleMobileMenu}>
                  <Button variant="ghost" className="w-full text-left">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" onClick={toggleMobileMenu}>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 w-full text-left">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
