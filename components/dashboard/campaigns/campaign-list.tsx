"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: string;
  requirements: {
    platforms: string[];
    niche: string[];
  };
  createdAt: string;
}

interface CampaignListProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

export function CampaignList({ campaigns, isLoading }: CampaignListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
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
          <p className="text-muted-foreground">No campaigns found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Card key={campaign.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{campaign.title}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge
                    variant={
                      campaign.status === "ACTIVE"
                        ? "default"
                        : campaign.status === "COMPLETED"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {campaign.status.toLowerCase()}
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
                  {formatCurrency(campaign.budget)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(campaign.createdAt)}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {campaign.description}
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline">View Details</Button>
              <Button>Find Creators</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}