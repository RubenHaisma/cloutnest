"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BarChart2,
  Briefcase,
  CreditCard,
  Layout,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

const brandNavItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: Layout,
  },
  {
    title: 'Campaigns',
    href: '/dashboard/campaigns',
    icon: Briefcase,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart2,
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    title: 'Payments',
    href: '/dashboard/payments',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

const influencerNavItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: Layout,
  },
  {
    title: 'Opportunities',
    href: '/dashboard/opportunities',
    icon: Users,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart2,
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    title: 'Earnings',
    href: '/dashboard/earnings',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function SideNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const navItems = user?.role === 'brand' ? brandNavItems : influencerNavItems;

  return (
    <nav className="w-64 border-r bg-card px-3 py-4">
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn('w-full justify-start', {
                  'bg-accent text-accent-foreground': pathname === item.href,
                })}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}