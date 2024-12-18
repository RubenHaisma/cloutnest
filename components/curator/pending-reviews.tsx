import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

interface PendingReview {
  id: string
  track: {
    title: string
    artist: string
    spotifyUrl: string
  }
  playlist: {
    name: string
  }
  createdAt: string
}

export function PendingReviews() {
  const [reviews, setReviews] = useState<PendingReview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  async function fetchReviews() {
    try {
      const response = await fetch("/api/curator/submissions")
      if (!response.ok) throw new Error("Failed to fetch reviews")
      const data = await response.json()
      setReviews(data.submissions)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load pending reviews",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleReview(submissionId: string, status: "approved" | "rejected", feedback: string) {
    try {
      const response = await fetch("/api/curator/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, status, feedback })
      })

      if (!response.ok) throw new Error("Failed to submit review")

      toast({
        title: "Success",
        description: `Track ${status}. You earned $0.50 for this review!`,
      })

      // Refresh reviews
      fetchReviews()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      })
    }
  }

  // ... render pending reviews
} 