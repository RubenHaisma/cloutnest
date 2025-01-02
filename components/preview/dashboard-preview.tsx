"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsPreview } from "./metrics-preview";
import { CampaignsPreview } from "./campaigns-preview";
import { AnalyticsPreview } from "./analytics-preview";

interface DashboardPreviewProps {
  type: "creator" | "company";
}

export function DashboardPreview({ type }: DashboardPreviewProps) {
  return (
    <div className="space-y-8">
      <div className="relative">
        <Badge className="absolute -top-6 left-0">
          Live Preview
        </Badge>
        <Card className="p-6 backdrop-blur bg-background/95">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <MetricsPreview type={type} />
            </TabsContent>

            <TabsContent value="campaigns">
              <CampaignsPreview type={type} />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsPreview type={type} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}