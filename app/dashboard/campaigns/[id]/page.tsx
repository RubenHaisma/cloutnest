"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BarChart2,
  Calendar,
  Globe2,
  Music2,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { CampaignMetrics } from "@/components/campaigns/campaign-metrics"
import { PlaylistMatches } from "@/components/campaigns/playlist-matches"
import { AiInsights } from "@/components/campaigns/ai-insights"
import { useToast } from "@/hooks/use-toast"

interface CampaignData {
  id: string
  title: string
  track: string
  status: string
  budget: number
  spent: number
  playlists: number
  reach: string
  startDate: string
  endDate: string
  progress: number
  targetRegion: string
  description: string
}

interface PageProps {
  params: { id: string }
}

export default function CampaignDetailsPage({ params }: PageProps) {
  const [campaign, setCampaign] = useState<CampaignData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`/api/campaigns/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch campaign")
        const data = await response.json()
        setCampaign(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load campaign details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaign()
  }, [params.id, toast])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!campaign) {
    return <div>Campaign not found</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/campaigns">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{campaign.title}</h1>
          <div className="flex items-center space-x-2 mt-1">
            <Music2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{campaign.track}</span>
            <Badge>{campaign.status}</Badge>
          </div>
        </div>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">30 Days</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Globe2 className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Target Region</p>
              <p className="font-medium">{campaign.targetRegion}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Budget Spent</p>
              <p className="font-medium">${campaign.spent} / ${campaign.budget}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{campaign.progress}%</span>
            </div>
            <Progress value={campaign.progress} className="bg-cyan-500/20" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <CampaignMetrics campaignId={params.id} />
        </TabsContent>
        <TabsContent value="playlists">
          <PlaylistMatches campaignId={params.id} />
        </TabsContent>
        <TabsContent value="insights">
          <AiInsights campaignId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}