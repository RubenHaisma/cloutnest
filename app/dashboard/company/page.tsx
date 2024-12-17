"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, DollarSign, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function CompanyDashboard() {
  const { data: session } = useSession();

  const stats = [
    {
      title: "Active Campaigns",
      value: "8",
      icon: BarChart2,
      change: "+2.1%",
    },
    {
      title: "Total Reach",
      value: "284.5K",
      icon: Users,
      change: "+14.2%",
    },
    {
      title: "Campaign Budget",
      value: "$12,423",
      icon: DollarSign,
      change: "+5.4%",
    },
    {
      title: "Engagement Rate",
      value: "4.3%",
      icon: TrendingUp,
      change: "+1.2%",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {session?.user?.name}
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your campaigns
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add campaign items here */}
              <Button className="w-full">View All Campaigns</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Creators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add creator items here */}
              <Button className="w-full">Find Creators</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
