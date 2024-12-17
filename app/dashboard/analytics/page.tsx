"use client"

import { useAuth } from '@/lib/auth';
import { MetricsCard } from '@/components/dashboard/analytics/metrics-card';
import { EngagementChart } from '@/components/dashboard/analytics/engagement-chart';
import { BarChart2, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function AnalyticsPage() {
  const { user } = useAuth();

  const metrics = [
    {
      title: user?.role === 'brand' ? 'Campaign Reach' : 'Total Followers',
      value: '284.5K',
      change: 12.5,
      icon: Users,
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: 2.1,
      icon: TrendingUp,
    },
    {
      title: user?.role === 'brand' ? 'Total Spend' : 'Total Earnings',
      value: '$12,423',
      change: 8.2,
      icon: DollarSign,
    },
    {
      title: 'Active Campaigns',
      value: '8',
      change: -1.5,
      icon: BarChart2,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Track your performance and growth</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>

      <EngagementChart />
    </div>
  );
}