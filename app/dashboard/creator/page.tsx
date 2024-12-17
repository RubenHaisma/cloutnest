"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, DollarSign, Users, Star } from "lucide-react";
import { SocialConnect } from "@/components/dashboard/social-connect";

export default function CreatorDashboard() {
  const { data: session } = useSession();

  const stats = [
    {
      title: "Total Earnings",
      value: "$2,450",
      icon: DollarSign,
      change: "+12.5%",
    },
    {
      title: "Active Campaigns",
      value: "4",
      icon: BarChart2,
      change: "+2.1%",
    },
    {
      title: "Total Followers",
      value: "125.8K",
      icon: Users,
      change: "+8.2%",
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: Star,
      change: "+0.3",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name}
        </h2>
        <p className="text-muted-foreground">
          Here's what's happening with your creator account
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add opportunity items here */}
              <Button className="w-full">View All Opportunities</Button>
            </div>
          </CardContent>
        </Card>

        <SocialConnect />
      </div>
    </div>
  );
}
