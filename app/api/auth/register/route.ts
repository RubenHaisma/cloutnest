import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  console.log('🚀 Starting registration process');
  
  try {
    const body = await req.json();
    console.log('📦 Request body:', JSON.stringify(body, null, 2));
    
    const { email, password } = body;

    if (!email || !password) {
      console.error('❌ Missing required fields:', { email: !!email, password: !!password });
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    console.log('🔍 Checking if user exists:', email);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error('❌ User already exists:', email);
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    console.log('🔒 Hashing password');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('👤 Creating new user');
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "artist",
        totalEarnings: 0,
        stripeAccountStatus: "pending",
        acceptanceRate: 0,
        increment: 0,
        genres: []
      }
    });

    console.log('✅ User created successfully:', user.id);

    console.log('🔑 Creating verification token');
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

    console.log('✅ Verification token created:', (verificationToken as any)[0].id);

    console.log('📧 Sending verification email');
    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;
    
    console.log('📨 Email configuration:', {
      from: process.env.EMAIL_FROM,
      to: email,
      url: verificationUrl
    });

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

    console.log('✅ Registration process completed successfully');
    return NextResponse.json({
      message: "Verification email sent",
      success: true,
    });
  } catch (error: unknown) {
    console.error("❌ Registration error:", {
      name: error instanceof Error ? error.name : "unknown",
      message: error instanceof Error ? error.message : "unknown",
      stack: error instanceof Error ? error.stack : "unknown",
    });
    return NextResponse.json(
      { error: "Failed to create account", details: error instanceof Error ? error.message : "unknown" },
      { status: 500 }
    );
  }
}
