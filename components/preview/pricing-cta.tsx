import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PricingCTA() {
  const plans = [
    {
      name: "Starter",
      price: 49,
      description: "Perfect for small brands and growing creators",
      features: [
        "Up to 5 active campaigns",
        "Basic analytics",
        "Email support",
        "Campaign templates",
      ],
    },
    {
      name: "Professional",
      price: 99,
      description: "For established creators and growing brands",
      features: [
        "Unlimited campaigns",
        "Advanced analytics",
        "Priority support",
        "Custom contracts",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground mt-2">
          Start free, upgrade when you need to
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="p-6 rounded-lg bg-card border hover:border-primary/50 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold mb-4">
              ${plan.price}
              <span className="text-base font-normal text-muted-foreground">
                /month
              </span>
            </div>
            <p className="text-muted-foreground mb-6">{plan.description}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    className="h-4 w-4 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button asChild className="w-full">
              <Link href="/register">Start Free Trial</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}