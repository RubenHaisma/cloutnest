import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPlanById } from "@/lib/stripe/config";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    // Ensure the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    let body;
    try {
      const rawBody = await req.text();
      console.log("Raw Body:", rawBody); // Debug raw body
      body = JSON.parse(rawBody || "{}");
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    console.log("Parsed Body:", body);
    const { priceId } = body;

    // Validate priceId
    if (!priceId) {
      console.error("Missing priceId in request body");
      return NextResponse.json({ error: "priceId is required" }, { status: 400 });
    }
    console.log("Received priceId:", priceId);

    // Validate price ID exists in the configuration
    const plan = getPlanById(priceId);
    if (!plan) {
      console.error("Invalid price ID:", priceId);
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

    // Create or retrieve Stripe customer
    let customerId = session.user.stripeCustomerId;
    if (!customerId) {
      try {
        const customer = await stripe.customers.create({
          email: session.user.email!,
          metadata: {
            userId: session.user.id,
          },
        });
        customerId = customer.id;

        // Save customer ID to the database
        await prisma.user.update({
          where: { id: session.user.id },
          data: { stripeCustomerId: customerId },
        });
      } catch (customerError) {
        console.error("Error creating Stripe customer:", customerError);
        return NextResponse.json(
          { error: "Failed to create customer" },
          { status: 500 }
        );
      }
    }

    // Create a checkout session
    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXTAUTH_URL}/error`,
        metadata: {
          userId: session.user.id,
          planName: plan.name,
        },
      });

      return NextResponse.json({ sessionId: checkoutSession.id });
    } catch (checkoutError) {
      console.error("Error creating checkout session:", checkoutError);
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
