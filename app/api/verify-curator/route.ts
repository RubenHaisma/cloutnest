import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { verifyCurator } from "@/lib/curator-verification"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const verification = await verifyCurator()
    
    return NextResponse.json(verification)
  } catch (error) {
    console.error("Curator verification failed:", error)
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    )
  }
}