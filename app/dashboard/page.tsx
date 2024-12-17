"use client"

import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, DollarSign, Users, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = user?.role === 'brand' 
    ? [
        {
          title: 'Active Campaigns',
          value: '12',
          icon: BarChart2,
          change: '+2.1%',
        },
        {
          title: 'Total Reach',
          value: '284.5K',
          icon: Users,
          change: '+14.2%',
        },
        {
          title: 'Campaign Budget',
          value: '$12,423',
          icon: DollarSign,
          change: '+5.4%',
        },
        {
          title: 'Engagement Rate',
          value: '4.3%',
          icon: TrendingUp,
          change: '+1.2%',
        },
      ]
    : [
        {
          title: 'Active Gigs',
          value: '8',
          icon: BarChart2,
          change: '+3.1%',
        },
        {
          title: 'Total Earnings',
          value: '$8,423',
          icon: DollarSign,
          change: '+12.2%',
        },
        {
          title: 'Followers',
          value: '124.5K',
          icon: Users,
          change: '+2.4%',
        },
        {
          title: 'Engagement Rate',
          value: '5.2%',
          icon: TrendingUp,
          change: '+0.8%',
        },
      ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's what's happening with your account.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}