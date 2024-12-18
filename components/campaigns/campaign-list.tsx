"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BarChart2, 
  Calendar, 
  Music2, 
  PlayCircle, 
  Users 
} from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from an API
const mockCampaigns = {
  active: [
    {
      id: 1,
      title: "Summer Vibes Promotion",
      track: "Summer Nights",
      budget: 500,
      spent: 324,
      playlists: 12,
      reach: "45.2K",
      startDate: "2024-03-01",
      endDate: "2024-04-01",
      progress: 65,
    },
    {
      id: 2,
      title: "New Release Push",
      track: "Midnight Dreams",
      budget: 750,
      spent: 210,
      playlists: 8,
      reach: "28.7K",
      startDate: "2024-03-15",
      endDate: "2024-04-15",
      progress: 28,
    },
  ],
  pending: [
    {
      id: 3,
      title: "Genre Expansion",
      track: "Urban Lights",
      budget: 300,
      spent: 0,
      playlists: 0,
      reach: "0",
      startDate: "2024-04-01",
      endDate: "2024-05-01",
      progress: 0,
    },
  ],
  completed: [
    {
      id: 4,
      title: "Winter Release",
      track: "Snow Falls",
      budget: 600,
      spent: 600,
      playlists: 18,
      reach: "72.1K",
      startDate: "2024-01-01",
      endDate: "2024-02-01",
      progress: 100,
    },
  ],
}

interface CampaignListProps {
  status: 'active' | 'pending' | 'completed'
}

export function CampaignList({ status }: CampaignListProps) {
  const campaigns = mockCampaigns[status]

  if (campaigns.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-lg font-semibold">No {status} campaigns</h3>
        <p className="text-muted-foreground mt-2">
          {status === 'active' 
            ? "Your active campaigns will appear here" 
            : status === 'pending'
            ? "Campaigns pending approval will appear here"
            : "Your completed campaigns will appear here"}
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">{campaign.title}</h3>
                  <Badge variant={status === 'completed' ? "secondary" : "default"}>
                    {status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                  <Music2 className="h-4 w-4" />
                  <span>{campaign.track}</span>
                  <span>•</span>
                  <Calendar className="h-4 w-4" />
                  <span>{campaign.startDate} - {campaign.endDate}</span>
                </div>
              </div>
              <Link href={`/dashboard/campaigns/${campaign.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="flex items-center space-x-2">
                <PlayCircle className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{campaign.playlists}</p>
                  <p className="text-sm text-muted-foreground">Playlists</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{campaign.reach}</p>
                  <p className="text-sm text-muted-foreground">Total Reach</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">${campaign.spent} / ${campaign.budget}</p>
                  <p className="text-sm text-muted-foreground">Budget Spent</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{campaign.progress}%</span>
                </div>
                <Progress value={campaign.progress} />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}