import { User } from "@prisma/client"

export const devUsers: Record<string, Partial<User>> = {
  curator: {
    id: "curator-test",
    name: "Test Curator",
    email: "curator@test.com",
    role: "curator",
    stripeAccountId: "acct_test_curator",
    stripeAccountStatus: "active",
    emailVerified: new Date(),
    totalEarnings: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    genres: [],
    increment: BigInt(0),
  },
  artist: {
    id: "artist-test",
    name: "Test Artist",
    email: "artist@test.com",
    role: "artist",
    stripeCustomerId: "cus_test_artist",
    emailVerified: new Date(),
    totalEarnings: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    genres: [],
    increment: BigInt(0),
  },
}