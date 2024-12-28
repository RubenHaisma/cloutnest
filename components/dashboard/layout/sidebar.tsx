"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  Briefcase,
  Layout,
  MessageSquare,
  Settings,
  Users,
  ShoppingBag,
  Trophy,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const creatorNavItems = [
  { title: "Overview", href: "/dashboard/creator", icon: Layout },
  { title: "Opportunities", href: "/dashboard/creator/opportunities", icon: Briefcase },
  { title: "Projects", href: "/dashboard/creator/projects", icon: Users },
  { title: "Marketplace", href: "/dashboard/creator/marketplace", icon: ShoppingBag },
  { title: "Analytics", href: "/dashboard/creator/analytics", icon: BarChart2 },
  { title: "Messages", href: "/dashboard/creator/messages", icon: MessageSquare },
  { title: "Leaderboard", href: "/dashboard/creator/leaderboard", icon: Trophy },
  { title: "Notifications", href: "/dashboard/creator/notifications", icon: Bell },
  { title: "Settings", href: "/dashboard/creator/settings", icon: Settings },
];

const companyNavItems = [
  { title: "Overview", href: "/dashboard/company", icon: Layout },
  { title: "Campaigns", href: "/dashboard/company/campaigns", icon: Briefcase },
  { title: "Creators", href: "/dashboard/company/creators", icon: Users },
  { title: "Marketplace", href: "/dashboard/company/marketplace", icon: ShoppingBag },
  { title: "Analytics", href: "/dashboard/company/analytics", icon: BarChart2 },
  { title: "Messages", href: "/dashboard/company/messages", icon: MessageSquare },
  { title: "Notifications", href: "/dashboard/company/notifications", icon: Bell },
  { title: "Settings", href: "/dashboard/company/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const navItems = session?.user?.role === "CREATOR" ? creatorNavItems : companyNavItems;

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-card border-r">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
          <span className="text-xl font-bold">CloutNest</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", {
                "bg-accent": pathname === item.href,
              })}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}