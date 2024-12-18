"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, PlayCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { STRIPE_PLANS } from "@/lib/stripe/config";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { loadStripe } from "@stripe/stripe-js";

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubscribe = async (priceId: string) => {
    console.log("Selected priceId for subscription:", priceId);
  
    if (!session) {
      console.warn("User not logged in, redirecting to login...");
      router.push("/login");
      return;
    }
  
    try {
      const payload = JSON.stringify({ priceId });
      console.log("Payload sent to API:", payload);
  
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed response from API:", errorText);
        throw new Error("Failed to create checkout session");
      }
  
      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }
  
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error during subscription:", error);
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
            Choose Your Plan
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start growing your audience with our professional promotion tools.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {Object.entries(STRIPE_PLANS).map(([key, plan]) => (
            <Card key={key} className="relative p-6">
              {key === "pro" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-cyan-500 px-3 py-1 text-sm font-medium text-white">
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
                    <Check className="mr-2 h-4 w-4 text-cyan-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-8 w-full ${key === "pro" ? "bg-cyan-500 hover:bg-cyan-600" : ""}`}
                onClick={() => handleSubscribe(plan.id)}
              >
                Subscribe Now
              </Button>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
