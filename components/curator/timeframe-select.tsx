"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EarningsTimeframe } from "@/lib/types"

interface TimeframeSelectProps {
  value: EarningsTimeframe
  onValueChange: (value: EarningsTimeframe) => void
}

export function TimeframeSelect({ value, onValueChange }: TimeframeSelectProps) {
  // Cast the onValueChange function to accept string type
  // This is safe because we only allow valid EarningsTimeframe values
  const handleValueChange = (newValue: string) => {
    onValueChange(newValue as EarningsTimeframe)
  }

  return (
    <Tabs value={value} onValueChange={handleValueChange}>
      <TabsList>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}