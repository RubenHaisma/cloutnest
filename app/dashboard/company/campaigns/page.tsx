"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { Campaign } from "@prisma/client";
import Link from "next/link";

export default function CompanyCampaignsPage() {
  const { data: session } = useSession();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/api/campaigns");
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
          <p className="text-muted-foreground">
            Manage your influencer marketing campaigns
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/company/campaigns/create">
            Create Campaign
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{campaign.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      variant={
                        campaign.status === "active"
                          ? "default"
                          : campaign.status === "completed"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {campaign.status}
                    </Badge>
                    {campaign.requirements.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    ${campaign.budget.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Budget</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{campaign.description}</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline">View Details</Button>
                <Button>Find Creators</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
