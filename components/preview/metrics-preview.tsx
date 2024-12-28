import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, DollarSign, Users, TrendingUp } from "lucide-react";

interface MetricsPreviewProps {
  type: "creator" | "company";
}

export function MetricsPreview({ type }: MetricsPreviewProps) {
  const metrics = type === "creator" ? [
    {
      title: "Active Projects",
      value: "5",
      icon: BarChart2,
      change: "+3.1%",
    },
    {
      title: "Total Earnings",
      value: "$8,423",
      icon: DollarSign,
      change: "+12.2%",
    },
    {
      title: "Total Followers",
      value: "124.5K",
      icon: Users,
      change: "+2.4%",
    },
    {
      title: "Engagement Rate",
      value: "5.2%",
      icon: TrendingUp,
      change: "+0.8%",
    },
  ] : [
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">{metric.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}