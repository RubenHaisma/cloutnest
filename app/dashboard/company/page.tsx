"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, DollarSign, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useDashboardData } from "@/lib/hooks/use-dashboard-data";
import { MetricsCard } from "@/components/dashboard/metrics-card";
import { CampaignList } from "@/components/dashboard/campaigns/campaign-list";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function CompanyDashboard() {
  const { metrics, campaigns, isLoading, error } = useDashboardData();

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Error loading dashboard data: {error}</p>
      </div>
    );
  }

  const stats = [
    {
      title: "Active Campaigns",
      value: metrics.activeCampaigns || 0,
      icon: BarChart2,
      change: 2.1,
    },
    {
      title: "Total Reach",
      value: formatNumber(metrics.totalReach || 0),
      icon: Users,
      change: 14.2,
    },
    {
      title: "Campaign Budget",
      value: formatCurrency(metrics.totalSpent || 0),
      icon: DollarSign,
      change: 5.4,
    },
    {
      title: "Engagement Rate",
      value: `${metrics.averageEngagement || 0}%`,
      icon: TrendingUp,
      change: 1.2,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor your campaign performance and creator collaborations
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/company/campaigns/create">
            Create Campaign
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <MetricsCard
            key={stat.title}
            {...stat}
            isLoading={isLoading}
          />
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Active Campaigns</h3>
        <CampaignList campaigns={campaigns} isLoading={isLoading} />
      </div>
    </div>
  );
}