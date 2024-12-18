"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Calendar,
  Download,
  Users,
  TrendingUp,
  PieChart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnalyticsChart } from "@/components/analytics/analytics-chart";
import { ActivityFeed } from "@/components/analytics/activity-feed";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("month");
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics");
        if (!response.ok) throw new Error("Failed to fetch analytics");
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load analytics data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <Card className="p-8 text-center">
          <p>Loading analytics...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">
          Insights and performance metrics to grow your influence and brand.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Campaign Earnings</p>
              <h3 className="mt-1 text-2xl font-bold">${analytics?.totalEarnings}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <BarChart className="h-6 w-6 text-emerald-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
            <span className="font-medium text-green-500">+15.2%</span>
            <span className="ml-1 text-gray-500">vs last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Collaborations Completed</p>
              <h3 className="mt-1 text-2xl font-bold">{analytics?.collaborationsCompleted}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
            <span className="font-medium text-green-500">+8.8%</span>
            <span className="ml-1 text-gray-500">vs last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Engagement Rate</p>
              <h3 className="mt-1 text-2xl font-bold">{analytics?.engagementRate}%</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <PieChart className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
            <span className="font-medium text-green-500">+5.3%</span>
            <span className="ml-1 text-gray-500">vs last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Followers Gained</p>
              <h3 className="mt-1 text-2xl font-bold">+{analytics?.newFollowers}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
              <Users className="h-6 w-6 text-indigo-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
            <span className="font-medium text-green-500">+12.4%</span>
            <span className="ml-1 text-gray-500">vs last month</span>
          </div>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="mt-8">
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Performance Overview</h3>
              <p className="text-sm text-gray-500">
                Visualize your campaign performance metrics over time.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
              <Tabs value={timeframe} onValueChange={setTimeframe}>
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <AnalyticsChart timeframe={timeframe} />
        </Card>
      </div>

      {/* Activity Feed and Reviews */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <ActivityFeed activities={analytics?.recentActivity || []} />

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Upcoming Reviews</h3>
          <div className="space-y-4">
            {analytics?.upcomingReviews?.map((review: any) => (
              <div
                key={review.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{review.title}</p>
                    <p className="text-sm text-gray-500">{review.collaborator}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
