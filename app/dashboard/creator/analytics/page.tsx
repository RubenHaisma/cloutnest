// filepath: /Users/rubenhaisma/Documents/GitHub/cloutnest/app/dashboard/creator/analytics/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInstagramInsights } from "@/lib/api/social/instagram";
import { getTikTokAnalytics } from "@/lib/api/social/tiktok";
import { useSession } from "next-auth/react";

export default function CreatorAnalyticsPage() {
  const { data: session } = useSession();
  interface Insights {
    instagram: { followers_count: number } | null;
    tiktok: { followers_count: number } | null;
  }

  const [insights, setInsights] = useState<Insights>({
    instagram: null,
    tiktok: null,
  });

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // Fetch insights for connected platforms
        const [igInsights, ttInsights] = await Promise.all([
          getInstagramInsights(session?.accessToken || ""),
          getTikTokAnalytics(session?.accessToken || ""),
        ]);

        setInsights({
          instagram: igInsights,
          tiktok: ttInsights,
        });
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };

    if (session?.accessToken) {
      fetchInsights();
    }
  }, [session]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Track your performance across platforms
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="tiktok">TikTok</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Followers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(insights.instagram?.followers_count || 0) +
                    (insights.tiktok?.followers_count || 0)}
                </div>
              </CardContent>
            </Card>
            {/* Add more overview metrics */}
          </div>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instagram" className="space-y-4">
          {/* Instagram specific analytics */}
        </TabsContent>

        <TabsContent value="tiktok" className="space-y-4">
          {/* TikTok specific analytics */}
        </TabsContent>
      </Tabs>
    </div>
  );
}