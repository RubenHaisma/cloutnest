"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Globe,
  TrendingUp,
  Users,
  Loader2,
  BarChart3,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export default function BusinessDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching data for the dashboard
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Mock API call (replace with your actual API)
        const data = {
          activeCampaigns: 5,
          totalReach: 125000,
          collaborations: 18,
          totalSpend: "$12,345",
        };
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Business Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your campaigns, collaborations, and insights to grow your brand.
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Campaigns</p>
              <h3 className="text-2xl font-bold">{dashboardData?.activeCampaigns}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Reach</p>
              <h3 className="text-2xl font-bold">
                {dashboardData?.totalReach.toLocaleString()}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Collaborations</p>
              <h3 className="text-2xl font-bold">{dashboardData?.collaborations}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spend</p>
              <h3 className="text-2xl font-bold">{dashboardData?.totalSpend}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent Campaigns</h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Loading recent campaigns...</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Performance Insights</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Loading performance data...</p>
          </div>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="flex justify-center space-x-4">
        <Link href="/dashboard/business/campaigns">
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
            <Briefcase className="mr-2 h-4 w-4" />
            Manage Campaigns
          </Button>
        </Link>
        <Link href="/dashboard/business/collaborations">
          <Button size="lg" variant="outline">
            <Users className="mr-2 h-4 w-4" />
            View Collaborations
          </Button>
        </Link>
      </div>
    </div>
  );
}
