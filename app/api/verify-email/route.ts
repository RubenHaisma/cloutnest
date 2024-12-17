import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };

    await prisma.user.update({
      where: { email: decoded.email },
      data: { emailVerified: new Date() },
    });

    return NextResponse.redirect(new URL("/login", req.url));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 400 }
    );
  }
}