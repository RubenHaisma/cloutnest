import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    role?: string | null
    name?: string | null
    image?: string | null
    stripeCustomerId?: string | null
    stripeAccountId?: string | null
    stripeAccountStatus?: string | null
    spotifyProfile?: any
  }

  interface Session extends DefaultSession {
    user: {
      id: string
      role: string  // Role is required in session
      stripeCustomerId?: string
      stripeAccountId?: string
      stripeAccountStatus?: string
      spotifyProfile?: any
    } & DefaultSession["user"]
  }

  interface JWT {
    role?: string
    stripeCustomerId?: string
    stripeAccountId?: string
    stripeAccountStatus?: string
    spotifyProfile?: any
  }
}