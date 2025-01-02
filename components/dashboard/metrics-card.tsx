"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  isLoading?: boolean;
}

export function MetricsCard({ title, value, change, icon: Icon, isLoading }: MetricsCardProps) {
  const isPositive = change > 0;

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
          <div className="h-4 w-32 bg-muted animate-pulse rounded mt-2" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs">
          {isPositive ? (
            <ArrowUp className="h-4 w-4 text-emerald-500" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500" />
          )}
          <span className={isPositive ? "text-emerald-500" : "text-red-500"}>
            {Math.abs(change)}%
          </span>
          <span className="text-muted-foreground ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}