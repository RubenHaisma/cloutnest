"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

const mockPayouts = [
  {
    id: "1",
    amount: 345.50,
    tracks: 69,
    date: new Date("2024-03-15"),
    status: "completed",
  },
  {
    id: "2",
    amount: 282.00,
    tracks: 56,
    date: new Date("2024-03-01"),
    status: "completed",
  },
  {
    id: "3",
    amount: 157.50,
    tracks: 31,
    date: new Date("2024-02-15"),
    status: "completed",
  },
  {
    id: "4",
    amount: 125.00,
    tracks: 25,
    date: new Date(),
    status: "pending",
  },
]

export function PayoutHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Tracks</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockPayouts.map((payout) => (
          <TableRow key={payout.id}>
            <TableCell>{format(payout.date, "MMM d, yyyy")}</TableCell>
            <TableCell>${payout.amount.toFixed(2)}</TableCell>
            <TableCell>{payout.tracks} tracks</TableCell>
            <TableCell>
              <Badge
                variant={payout.status === "completed" ? "default" : "secondary"}
              >
                {payout.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}