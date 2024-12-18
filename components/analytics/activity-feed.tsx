"use client"

import { Card } from "@/components/ui/card"
import { format } from "date-fns"
import { Music, PlayCircle, DollarSign } from "lucide-react"

interface Activity {
  id: number
  type: string
  title: string
  artist: string
  timestamp: string
}

interface ActivityFeedProps {
  activities: Activity[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "track_review":
        return Music
      case "playlist_add":
        return PlayCircle
      case "payment":
        return DollarSign
      default:
        return Music
    }
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type)
          return (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10">
                <Icon className="h-4 w-4 text-cyan-500" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {activity.title} - {activity.artist}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(activity.timestamp), "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}