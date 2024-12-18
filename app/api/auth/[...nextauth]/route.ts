import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth"

// Enable dynamic API routes
export const dynamic = "force-dynamic"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }