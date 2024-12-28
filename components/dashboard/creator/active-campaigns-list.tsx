"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Campaign {
  id: string;
  campaign: {
    title: string;
    description: string;
    budget: number;
    status: string;
    company: {
      name: string;
      image: string;
    };
  };
  createdAt: string;
}

interface ActiveCampaignsListProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

export function ActiveCampaignsList({ campaigns, isLoading }: ActiveCampaignsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Active Campaigns</h2>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-10 w-20" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-4" />
              <div className="flex justify-end">
                <Skeleton className="h-9 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-40">
          <p className="text-muted-foreground">No active campaigns</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/creator/opportunities">Find Opportunities</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Active Campaigns</h2>
      {campaigns.map((campaign) => (
        <Card key={campaign.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{campaign.campaign.title}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">
                    {campaign.campaign.company.name}
                  </Badge>
                  <Badge>{campaign.campaign.status.toLowerCase()}</Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">
                  {formatCurrency(campaign.campaign.budget)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(campaign.createdAt)}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {campaign.campaign.description}
            </p>
            <div className="flex justify-end">
              <Button>View Details</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}