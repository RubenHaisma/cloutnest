import { CuratorEarnings, Track, User } from "@prisma/client"

export type EarningsWithRelations = CuratorEarnings & {
  track: Track
  curator: User
  paidOut: boolean
} 