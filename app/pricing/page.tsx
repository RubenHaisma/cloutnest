"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { loadStripe } from "@stripe/stripe-js";

// Smart Pricing System
const CLOUTNEST_PLANS = {
  basic: {
    id: "plan_basic",
    name: "Basic",
    price: 19,
    features: [
      "Profile listing in the CloutNest directory",
      "Access to basic analytics",
      "2 connections per month",
    ],
  },
  pro: {
    id: "plan_pro",
    name: "Pro",
    price: 49,
    features: [
      "Enhanced visibility in the directory",
      "Unlimited connections per month",
      "Detailed analytics & insights",
      "Dedicated support for campaigns",
    ],
  },
  premium: {
    id: "plan_premium",
    name: "Premium",
    price: 99,
    features: [
      "Priority visibility for your profile",
      "Unlimited connections and collaborations",
      "Advanced campaign management tools",
      "Exclusive access to premium brands/influencers",
      "Personal account manager",
    ],
  },
};

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubscribe = async (priceId: string) => {
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Flexible Pricing for Everyone
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you&apos;re a small business or a top-tier influencer, we have a plan tailored for your growth.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {Object.entries(CLOUTNEST_PLANS).map(([key, plan]) => (
            <Card key={key} className="relative p-6">
              {key === "pro" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-emerald-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-8 w-full ${key === "pro" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
                onClick={() => handleSubscribe(plan.id)}
              >
                Subscribe Now
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Not sure which plan suits you?{" "}
            <Link href="/contact" className="text-emerald-500 hover:underline">
              Contact our support team
            </Link>{" "}
            for a personalized recommendation.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
