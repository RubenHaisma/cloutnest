"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { Campaign } from "@prisma/client";

export default function CreatorOpportunitiesPage() {
  const { data: session } = useSession();
  const [opportunities, setOpportunities] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch("/api/campaigns/opportunities");
        const data = await response.json();
        setOpportunities(data);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Opportunities</h2>
        <p className="text-muted-foreground">
          Find brands that match your niche and values
        </p>
      </div>

      <div className="grid gap-6">
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{opportunity.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    {opportunity.requirements.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    ${opportunity.budget.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Budget</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{opportunity.description}</p>
              <div className="flex justify-end">
                <Button>Apply Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
