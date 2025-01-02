import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Campaign } from "@/lib/types/campaign"; // Import the Campaign type

interface ActiveCampaignsListProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

const ActiveCampaignsList: React.FC<ActiveCampaignsListProps> = ({ campaigns, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        campaigns.map((campaign) => (
          <Card key={campaign.id} className="mb-4">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{campaign.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">
                      {campaign.company?.name}
                    </Badge>
                    <Badge>{campaign.status.toLowerCase()}</Badge>
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
              <div className="flex justify-end">
                <Button>View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ActiveCampaignsList;