"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import { CampaignList } from "@/components/campaigns/campaign-list"
import { NewCampaignDialog } from "@/components/campaigns/new-campaign-dialog"
import { useState } from "react"

export default function CampaignsPage() {
  const [showNewCampaign, setShowNewCampaign] = useState(false)

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your playlist promotion campaigns
          </p>
        </div>
        <Button onClick={() => setShowNewCampaign(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <CampaignList status="active" />
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <CampaignList status="pending" />
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <CampaignList status="completed" />
        </TabsContent>
      </Tabs>

      <NewCampaignDialog 
        open={showNewCampaign} 
        onOpenChange={setShowNewCampaign} 
      />
    </div>
  )
}