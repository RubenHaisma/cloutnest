"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface AnalyticsPreviewProps {
  type: "creator" | "company";
}

export function AnalyticsPreview({ type }: AnalyticsPreviewProps) {
  const [chartType, setChartType] = useState("line");
  const [timeRange, setTimeRange] = useState("6m");

  const data = type === "creator" ? [
    { name: "Jan", earnings: 2400, followers: 15000, engagement: 4.5 },
    { name: "Feb", earnings: 3600, followers: 18000, engagement: 4.8 },
    { name: "Mar", earnings: 3200, followers: 20000, engagement: 5.0 },
    { name: "Apr", earnings: 4500, followers: 22000, engagement: 5.2 },
    { name: "May", earnings: 4200, followers: 25000, engagement: 5.5 },
    { name: "Jun", earnings: 5800, followers: 28000, engagement: 5.8 },
  ] : [
    { name: "Jan", reach: 15000, spend: 5000, engagement: 4.2 },
    { name: "Feb", reach: 18000, spend: 6000, engagement: 4.5 },
    { name: "Mar", reach: 22000, spend: 7500, engagement: 4.8 },
    { name: "Apr", reach: 25000, spend: 8000, engagement: 4.6 },
    { name: "May", reach: 28000, spend: 9000, engagement: 4.9 },
    { name: "Jun", reach: 32000, spend: 10000, engagement: 5.1 },
  ];

  const renderChart = () => {
    const ChartComponent: React.ElementType = {
      line: LineChart,
      bar: BarChart,
      area: AreaChart,
    }[chartType] || LineChart;

    const primaryMetric = type === "creator" ? "earnings" : "reach";
    const secondaryMetric = type === "creator" ? "followers" : "spend";

    return (
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
            }}
          />
          <Legend />
          {chartType === "line" && (
            <>
              <Line yAxisId="left" type="monotone" dataKey={primaryMetric} stroke="hsl(var(--primary))" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey={secondaryMetric} stroke="hsl(var(--secondary))" strokeWidth={2} />
            </>
          )}
          {chartType === "bar" && (
            <>
              <Bar yAxisId="left" dataKey={primaryMetric} fill="hsl(var(--primary))" />
              <Bar yAxisId="right" dataKey={secondaryMetric} fill="hsl(var(--secondary))" />
            </>
          )}
          {chartType === "area" && (
            <>
              <Area yAxisId="left" type="monotone" dataKey={primaryMetric} fill="hsl(var(--primary))" fillOpacity={0.2} stroke="hsl(var(--primary))" />
              <Area yAxisId="right" type="monotone" dataKey={secondaryMetric} fill="hsl(var(--secondary))" fillOpacity={0.2} stroke="hsl(var(--secondary))" />
            </>
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {type === "creator" ? "Performance Analytics" : "Campaign Analytics"}
        </CardTitle>
        <div className="flex gap-2">
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
}