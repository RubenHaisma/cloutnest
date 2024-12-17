"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "@/lib/stripe/client";

const tiers = [
  {
    name: "Starter",
    price: 49,
    priceId: "price_starter",
    description: "Perfect for small brands starting their influencer marketing journey",
    features: [
      "Up to 5 active campaigns",
      "Basic analytics",
      "Email support",
      "1 team member",
      "Campaign templates",
    ],
  },
  {
    name: "Growth",
    price: 99,
    priceId: "price_growth",
    description: "For growing brands looking to scale their influencer partnerships",
    features: [
      "Up to 20 active campaigns",
      "Advanced analytics",
      "Priority support",
      "5 team members",
      "Custom campaign templates",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: 299,
    priceId: "price_enterprise",
    description: "For large brands requiring advanced features and support",
    features: [
      "Unlimited campaigns",
      "Custom analytics",
      "24/7 phone support",
      "Unlimited team members",
      "Custom integrations",
      "Dedicated account manager",
      "Custom contracts",
    ],
  },
];

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe = async (priceId: string) => {
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const { url } = await createCheckoutSession(priceId);
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose the perfect plan for your business
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`relative ${
              selectedTier === tier.name
                ? "border-primary shadow-lg"
                : "hover:border-primary/50"
            }`}
          >
            <CardHeader>
              <CardTitle>
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardTitle>
              <p className="text-muted-foreground">{tier.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-8"
                onClick={() => handleSubscribe(tier.priceId)}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </div>
  );
}