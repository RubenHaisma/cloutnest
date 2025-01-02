"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { CampaignList } from "@/components/dashboard/campaigns/campaign-list";
import { CampaignFilters } from "@/components/dashboard/campaigns/campaign-filters";
import { Campaign } from "@/lib/types/campaign";

export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    platform: "",
    niche: "",
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const searchParams = new URLSearchParams();
        if (filters.status !== "all") searchParams.set("status", filters.status);
        if (filters.platform) searchParams.set("platform", filters.platform);
        if (filters.niche) searchParams.set("niche", filters.niche);

        const response = await fetch(`/api/campaigns?${searchParams}`);
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [filters]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
          <p className="text-muted-foreground">
            Manage your influencer marketing campaigns
          </p>
        </div>
        <Button onClick={() => router.push("/dashboard/company/campaigns/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            className="pl-8"
            onChange={(e) => {
              // Add search functionality
            }}
          />
        </div>
        <CampaignFilters filters={filters} setFilters={setFilters} />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <CampaignList campaigns={campaigns} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <CampaignList
            campaigns={campaigns.filter((c) => c.status === "ACTIVE")}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <CampaignList
            campaigns={campaigns.filter((c) => c.status === "DRAFT")}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <CampaignList
            campaigns={campaigns.filter((c) => c.status === "COMPLETED")}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}