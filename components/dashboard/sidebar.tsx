"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { LogoutButton } from "@/components/auth/logout-button"
import {
  BarChart3,
  DollarSign,
  Music,
  PlayCircle,
  Settings,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const routes = session?.user?.role === "artist" 
    ? [
        {
          title: "Dashboard",
          icon: BarChart3,
          href: "/dashboard/artist",
        },
        {
          title: "Submit Track",
          icon: Music,
          href: "/dashboard/submit",
        },
        {
          title: "Analytics",
          icon: BarChart3,
          href: "/dashboard/analytics",
        },
      ]
    : [
        {
          title: "Dashboard",
          icon: BarChart3,
          href: "/dashboard/curator",
        },
        {
          title: "Review Tracks",
          icon: Music,
          href: "/dashboard/curator/tracks",
        },
        {
          title: "Playlists",
          icon: PlayCircle,
          href: "/dashboard/curator/playlists",
        },
        {
          title: "Earnings",
          icon: DollarSign,
          href: "/dashboard/curator/earnings",
        },
      ]

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center space-x-2">
          <PlayCircle className="h-6 w-6 text-cyan-500" />
          <span className="text-xl font-bold">PlaylistPro</span>
        </Link>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent",
              pathname === route.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            <route.icon className="h-4 w-4" />
            <span>{route.title}</span>
          </Link>
        ))}
      </div>
      <div className="border-t p-4 space-y-2">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent",
            pathname === "/dashboard/settings"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
        <LogoutButton className="w-full justify-start text-sm font-medium" />
      </div>
    </div>
  )
}