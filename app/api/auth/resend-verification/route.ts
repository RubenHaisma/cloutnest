import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    console.log("Looking up user with email:", email);
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("User found:", user ? "yes" : "no");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      console.log("Email already verified for user:", email);
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 }
      );
    }

    // Delete any existing verification tokens using raw SQL
    await prisma.$executeRaw`
      DELETE FROM "VerificationToken"
      WHERE "userId" = ${user.id}
    `;

    // Create new verification token using raw SQL
    const token = crypto.randomBytes(32).toString("hex");
    const verificationToken = await prisma.$queryRaw`
      INSERT INTO "VerificationToken" (id, token, expires, "userId", "createdAt")
      VALUES (
        gen_random_uuid(),
        ${token},
        ${new Date(Date.now() + 24 * 60 * 60 * 1000)},
        ${user.id},
        NOW()
      )
      RETURNING id, token;
    `;

    // Send verification email
    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;
    
    console.log("Sending verification email to:", email);
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "Verify your email address",
      html: `
        <h1>Welcome to PlaylistPro!</h1>
        <p>Click the button below to verify your email address:</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #0891b2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
          Verify Email
        </a>
        <p>Or copy and paste this link into your browser:</p>
        <p>${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    return NextResponse.json({
      message: "Verification email sent",
      success: true,
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Failed to resend verification email" },
      { status: 500 }
    );
  }
}
