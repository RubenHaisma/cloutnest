"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export function useCuratorBalance() {
  const { data: session } = useSession()
  const [balance, setBalance] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBalance = async () => {
      if (!session) return

      try {
        const response = await fetch("/api/curator/balance")
        if (!response.ok) throw new Error("Failed to fetch balance")
        
        const data = await response.json()
        setBalance(data.balance)
      } catch (error) {
        console.error("Error fetching balance:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBalance()
  }, [session])

  return { balance, isLoading }
}