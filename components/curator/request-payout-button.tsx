"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface RequestPayoutButtonProps {
  availableAmount: number
}

export function RequestPayoutButton({ availableAmount }: RequestPayoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePayout = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/curator/payout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: availableAmount }),
      })

      if (!response.ok) throw new Error("Failed to process payout")

      toast({
        title: "Success",
        description: `Payout of $${availableAmount.toFixed(2)} initiated`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payout",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayout}
      disabled={isLoading || availableAmount <= 0}
      className="bg-cyan-500 hover:bg-cyan-600"
    >
      {isLoading ? "Processing..." : `Request Payout ($${availableAmount.toFixed(2)})`}
    </Button>
  )
}