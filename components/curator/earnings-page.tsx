"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Download,
  Music,
  TrendingUp,
  Users,
} from "lucide-react"
import { EarningsChart } from "@/components/curator/earnings-chart"
import { PayoutHistory } from "@/components/curator/payout-history"
import { motion } from "framer-motion"
import { TimeframeSelect } from "@/components/curator/timeframe-select"
import { EarningsTimeframe } from "@/lib/types"
import { EarningsWithRelations } from "@/types/earnings"

interface EarningsPageProps {
  stats: {
    totalEarnings: string
    tracksReviewed: string
    acceptanceRate: string
    playlistGrowth: string
    monthlyChange: string
  }
  earnings: EarningsWithRelations[]
}

export function EarningsPage({ stats, earnings }: EarningsPageProps) {
  const [timeframe, setTimeframe] = useState<EarningsTimeframe>("month")

  useEffect(() => {
    console.log("EarningsPage component rendered with stats:", stats);
    console.log("EarningsPage component rendered with earnings:", earnings);
  }, [stats, earnings]);

  const statCards = [
    {
      title: "Total Earnings",
      value: `$${stats.totalEarnings}`,
      change: stats.monthlyChange,
      icon: DollarSign,
    },
    {
      title: "Tracks Reviewed",
      value: stats.tracksReviewed,
      change: "+8.2%",
      icon: Music,
    },
    {
      title: "Acceptance Rate",
      value: stats.acceptanceRate,
      change: "+3.1%",
      icon: TrendingUp,
    },
    {
      title: "Playlist Growth",
      value: stats.playlistGrowth,
      change: "+15.3%",
      icon: Users,
    },
  ]

  console.log("Stat cards prepared:", statCards);

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Earnings Dashboard</h1>
        <p className="text-muted-foreground">
          Track your earnings and performance metrics
        </p>
      </div>

      {stats.totalEarnings === "0.00" ? (
        <div className="text-center my-12">
          <h2 className="text-2xl font-bold mb-4">No Earnings Yet? No Problem!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            It looks like you haven&apos;t earned anything yet, but don&apos;t get discouraged! 
            Keep reviewing tracks, managing playlists, and engaging with new content. 
            Your hard work will pay off soon!
          </p>
            <Button className="mt-4" onClick={() => {
            window.location.href = "/dashboard/curator/tracks";
            }}>
            Explore New Opportunities
            </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center">
                    <stat.icon className="h-8 w-8 text-muted-foreground mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">{stat.title}</h3>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-500">{stat.change}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Add earnings history */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Earnings</h2>
            <div className="space-y-4">
              {earnings.map(earning => (
                <Card key={earning.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{earning.track.title}</p>
                      <p className="text-sm text-muted-foreground">
                        by {earning.track.artist}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${earning.amount.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {earning.paidOut ? 'Paid' : 'Pending'}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
