"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// Mock data - in a real app, this would be fetched from an API
const data = [
  { date: "03/01", plays: 240, followers: 120, saves: 45 },
  { date: "03/05", plays: 300, followers: 150, saves: 60 },
  { date: "03/10", plays: 450, followers: 200, saves: 90 },
  { date: "03/15", plays: 550, followers: 250, saves: 110 },
  { date: "03/20", plays: 700, followers: 320, saves: 150 },
  { date: "03/25", plays: 850, followers: 400, saves: 200 },
  { date: "03/30", plays: 1000, followers: 500, saves: 250 },
]

interface CampaignMetricsProps {
  campaignId: string
}

export function CampaignMetrics({ campaignId }: CampaignMetricsProps) {
  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Performance Overview</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="plays"
                stroke="hsl(var(--chart-1))"
                name="Plays"
              />
              <Line
                type="monotone"
                dataKey="followers"
                stroke="hsl(var(--chart-2))"
                name="New Followers"
              />
              <Line
                type="monotone"
                dataKey="saves"
                stroke="hsl(var(--chart-3))"
                name="Track Saves"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}