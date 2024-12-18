"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { EarningsTimeframe } from "@/lib/types"

interface EarningsChartProps {
  timeframe: EarningsTimeframe
}

const mockData = {
  week: [
    { date: "Mon", earnings: 45, tracks: 8 },
    { date: "Tue", earnings: 52, tracks: 10 },
    { date: "Wed", earnings: 38, tracks: 7 },
    { date: "Thu", earnings: 65, tracks: 12 },
    { date: "Fri", earnings: 48, tracks: 9 },
    { date: "Sat", earnings: 55, tracks: 11 },
    { date: "Sun", earnings: 42, tracks: 8 },
  ],
  month: [
    { date: "Week 1", earnings: 280, tracks: 56 },
    { date: "Week 2", earnings: 320, tracks: 64 },
    { date: "Week 3", earnings: 350, tracks: 70 },
    { date: "Week 4", earnings: 290, tracks: 58 },
  ],
  year: [
    { date: "Jan", earnings: 1200, tracks: 240 },
    { date: "Feb", earnings: 1350, tracks: 270 },
    { date: "Mar", earnings: 1480, tracks: 296 },
    { date: "Apr", earnings: 1620, tracks: 324 },
    { date: "May", earnings: 1750, tracks: 350 },
    { date: "Jun", earnings: 1890, tracks: 378 },
  ],
}

export function EarningsChart({ timeframe }: EarningsChartProps) {
  const data = mockData[timeframe]

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="earnings"
            stroke="hsl(var(--cyan-500))"
            name="Earnings ($)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="tracks"
            stroke="hsl(var(--primary))"
            name="Tracks Reviewed"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}