"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function PageHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-emerald-500" />
          <span className="text-xl font-bold">CloutNest</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link href="/how-it-works">
            <Button variant="ghost">How It Works</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          <Link href="/blog">
            <Button variant="ghost">Blog</Button>
          </Link>
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-emerald-500 hover:bg-emerald-600">Sign up</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
