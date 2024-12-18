"use client"

import { Card } from "@/components/ui/card"
import { EarningsWithRelations } from "@/types/earnings"

interface EarningsClientProps {
  earnings: EarningsWithRelations[]
}

export function EarningsClient({ earnings }: EarningsClientProps) {
  const totalEarned = earnings.reduce((sum, e) => sum + e.amount, 0)
  const pendingPayout = earnings
    .filter(e => !e.paidOut)
    .reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Earnings Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Total Earned</h2>
          <p className="text-3xl font-bold">${totalEarned.toFixed(2)}</p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Pending Payout</h2>
          <p className="text-3xl font-bold">${pendingPayout.toFixed(2)}</p>
        </Card>
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
                    by {earning.curator.name}
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
    </div>
  )
} 