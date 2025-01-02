"use client";

import { Button } from "@/components/ui/button";
import { BarChart2, DollarSign, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useDashboardData } from "@/lib/hooks/use-dashboard-data";
import { MetricsCard } from "@/components/dashboard/metrics-card";
import ActiveCampaignsList from "@/components/dashboard/creator/active-campaigns-list";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Campaign } from "@/lib/types/campaign"; // Import the Campaign type

export default function CreatorDashboard() {
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
      title: "Active Projects",
      value: metrics.activeProjects || 0,
      icon: BarChart2,
      change: 3.1,
    },
    {
      title: "Total Earnings",
      value: formatCurrency(metrics.totalEarnings || 0),
      icon: DollarSign,
      change: 12.2,
    },
    {
      title: "Total Followers",
      value: formatNumber(metrics.totalFollowers || 0),
      icon: Users,
      change: 2.4,
    },
    {
      title: "Engagement Rate",
      value: `${metrics.engagementRate?.toFixed(1) || 0}%`,
      icon: TrendingUp,
      change: 0.8,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Track your performance across platforms
        </p>
      </div>
      <Button asChild>
        <Link href="/dashboard/creator/opportunities">
          Find Opportunities
        </Link>
      </Button>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <MetricsCard key={stat.title} {...stat} isLoading={isLoading} />
        ))}
      </div>
      <ActiveCampaignsList campaigns={campaigns} isLoading={isLoading} />
    </div>
  );
}