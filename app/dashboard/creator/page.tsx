"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Film,
  Camera,
  Users,
  TrendingUp,
  Loader2,
} from "lucide-react";
import Link from "next/link";

export default function ContentCreatorDashboardPage() {
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
          totalViews: 125000,
          collaborations: 12,
          growthRate: "+18%",
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
        <h1 className="text-3xl font-bold">Content Creator Dashboard</h1>
        <p className="text-muted-foreground">
          Track your campaigns, collaborations, and growth as a content creator.
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Camera className="h-6 w-6 text-primary" />
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
              <Film className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Views</p>
              <h3 className="text-2xl font-bold">{dashboardData?.totalViews.toLocaleString()}</h3>
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
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Growth Rate</p>
              <h3 className="text-2xl font-bold">{dashboardData?.growthRate}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent Activity</h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Loading recent activity...</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Top Performing Content</h3>
            <Film className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Loading top-performing content...</p>
          </div>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="flex justify-center">
        <Link href="/dashboard/submit">
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
            <Camera className="mr-2 h-4 w-4" />
            Start New Campaign
          </Button>
        </Link>
      </div>
    </div>
  );
}
