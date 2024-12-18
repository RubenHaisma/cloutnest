"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ConnectStripeButton } from "@/components/curator/connect-stripe-button"
import { RequestPayoutButton } from "@/components/curator/request-payout-button"
import { useSession } from "next-auth/react"
import { DollarSign, AlertCircle } from "lucide-react"

export default function CuratorSettingsPage() {
  const { data: session } = useSession()
  const [availableBalance, setAvailableBalance] = useState(0)

  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Curator Settings</h1>
        <p className="text-muted-foreground">
          Manage your curator account and payment settings
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">Payment Settings</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Connect your Stripe account to receive payments for track reviews
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10">
            <DollarSign className="h-6 w-6 text-cyan-500" />
          </div>
        </div>

        <div className="mt-6">
          {session?.user?.stripeAccountId ? (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Available for payout</p>
                    <p className="text-2xl font-bold">${availableBalance.toFixed(2)}</p>
                  </div>
                  <RequestPayoutButton availableAmount={availableBalance} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your Stripe account is connected. You can request payouts at any time.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
                <div className="flex items-center space-x-2 text-yellow-500">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm font-medium">
                    Connect your Stripe account to receive payments
                  </p>
                </div>
              </div>
              <ConnectStripeButton />
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold">Payout Schedule</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Payouts are processed automatically every week for balances over $50
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="text-sm">Minimum payout amount</span>
            <span className="font-medium">$50.00</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="text-sm">Payout frequency</span>
            <span className="font-medium">Weekly</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="text-sm">Payment method</span>
            <span className="font-medium">Bank transfer</span>
          </div>
        </div>
      </Card>
    </div>
  )
}