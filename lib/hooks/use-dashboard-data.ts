"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface DashboardMetrics {
  activeCampaigns?: number;
  activeProjects?: number;
  totalReach?: number;
  totalFollowers?: number;
  totalSpent?: number;
  totalEarnings?: number;
  engagementRate?: number;
  averageEngagement?: number;
}

interface Campaign {
  requirements: {
    minFollowers: number; platforms: never[]; niche: never[]; 
};
  id: string;
  title: string;
  description: string;
  budget: number;
  status: string;
  createdAt: string;
  company?: {
    name: string;
    image: string;
  };
  creators?: Array<{
    creator: {
      name: string;
      image: string;
    };
  }>;
}

export function useDashboardData() {
  const { data: session } = useSession();
  const [metrics, setMetrics] = useState<DashboardMetrics>({});
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!session?.user) return;

      try {
        const [metricsRes, campaignsRes] = await Promise.all([
          fetch("/api/dashboard/metrics"),
          fetch("/api/dashboard/campaigns"),
        ]);

        if (!metricsRes.ok || !campaignsRes.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const [metricsData, campaignsData] = await Promise.all([
          metricsRes.json(),
          campaignsRes.json(),
        ]);

        setMetrics(metricsData);
        setCampaigns(campaignsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, [session]);

  return {
    metrics,
    campaigns,
    isLoading,
    error,
  };
}