"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationBell } from "@/components/notifications/notification-bell"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      // Redirect to role-specific dashboard if on generic /dashboard
      if (pathname === "/dashboard") {
        if (session.user.role === "artist") {
          router.push("/dashboard/artist")
        } else if (session.user.role === "curator") {
          router.push("/dashboard/curator")
        }
      }
    }
  }, [status, session, router, pathname])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-end space-x-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <NotificationBell />
          <ThemeToggle />
        </header>
        <main className="container mx-auto max-w-7xl p-8">
          {children}
        </main>
      </div>
    </div>
  )
}