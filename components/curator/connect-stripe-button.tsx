"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function ConnectStripeButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/curator/connect-stripe", {
        method: "POST",
      })

      if (!response.ok) throw new Error("Failed to connect Stripe")

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect Stripe account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isLoading}
      className="bg-[#635BFF] hover:bg-[#524DFF]"
    >
      {isLoading ? "Connecting..." : "Connect Stripe Account"}
    </Button>
  )
}