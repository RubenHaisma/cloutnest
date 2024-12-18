"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  TrendingUp,
  Users,
  Music2,
  Globe2,
  Clock,
} from "lucide-react"

// Mock data - in a real app, this would be fetched from an API
const insights = [
  {
    type: "performance",
    title: "Strong Performance in Electronic Genre",
    description: "Your track is performing exceptionally well among electronic music playlists, with a 45% higher engagement rate than average.",
    recommendation: "Consider targeting more electronic music playlists for maximum impact.",
    metrics: ["45% higher engagement", "Electronic genre"],
  },
  {
    type: "audience",
    title: "Growing European Audience",
    description: "There's significant growth in listener engagement from European countries, particularly in Germany and France.",
    recommendation: "Allocate more budget to European promotion to capitalize on this trend.",
    metrics: ["32% European listeners", "Growing market"],
  },
  {
    type: "timing",
    title: "Peak Listening Times",
    description: "Your track receives the most plays during evening hours (6 PM - 10 PM) across time zones.",
    recommendation: "Schedule social media promotion during these peak hours.",
    metrics: ["Evening peak", "Cross-timezone"],
  },
]

interface AiInsightsProps {
  campaignId: string
}

export function AiInsights({ campaignId }: AiInsightsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "performance":
        return TrendingUp
      case "audience":
        return Users
      case "timing":
        return Clock
      default:
        return Brain
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {insights.map((insight, index) => {
          const Icon = getIcon(insight.type)
          return (
            <Card key={index} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex space-x-2">
                    {insight.metrics.map((metric, i) => (
                      <Badge key={i} variant="secondary">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{insight.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">AI Recommendation</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {insight.recommendation}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}