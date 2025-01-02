"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface CampaignsPreviewProps {
  type: "creator" | "company";
}

export function CampaignsPreview({ type }: CampaignsPreviewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const campaigns = type === "creator" ? [
    {
      id: "1",
      title: "Summer Fashion Collection",
      company: "StyleCo",
      budget: 2500,
      status: "Active",
      description: "Create authentic content showcasing our summer collection",
      dueDate: "2024-01-15",
      progress: 65,
    },
    {
      id: "2",
      title: "Tech Product Launch",
      company: "TechGear",
      budget: 3000,
      status: "Active",
      description: "Review and demonstrate our new smart home devices",
      dueDate: "2024-01-20",
      progress: 40,
    },
  ] : [
    {
      id: "1",
      title: "Influencer Marketing Campaign",
      creators: 5,
      budget: 5000,
      status: "Active",
      description: "Multi-channel campaign for product launch",
      dueDate: "2024-01-25",
      progress: 75,
    },
    {
      id: "2",
      title: "Brand Awareness Drive",
      creators: 3,
      budget: 3500,
      status: "Active",
      description: "Increase brand visibility across social media",
      dueDate: "2024-02-01",
      progress: 30,
    },
  ];

  const filteredCampaigns = campaigns
    .filter(campaign => 
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === "all" || campaign.status.toLowerCase() === statusFilter)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "budget":
          return b.budget - a.budget;
        case "progress":
          return b.progress - a.progress;
        case "date":
        default:
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Due Date</SelectItem>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{campaign.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">
                      {"company" in campaign ? campaign.company : `${campaign.creators} Creators`}
                    </Badge>
                    <Badge>{campaign.status}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {formatCurrency(campaign.budget)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Due {new Date(campaign.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {campaign.description}
              </p>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{campaign.progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">View Details</Button>
                <Button>
                  {type === "creator" ? "Submit Work" : "Review Progress"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}