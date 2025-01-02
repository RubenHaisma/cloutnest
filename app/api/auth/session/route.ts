import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/auth-options";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    return NextResponse.json(session);
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(null);
  }
}