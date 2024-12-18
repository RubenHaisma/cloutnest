export const STRIPE_PLANS = {
  basic: {
    name: "Basic",
    id: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID!,
    price: 49,
    features: [
      "Submit up to 3 tracks per month",
      "Basic playlist matching",
      "Standard support",
      "Monthly performance reports",
    ],
  },
  pro: {
    name: "Pro",
    id: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!,
    price: 99,
    features: [
      "Submit up to 10 tracks per month",
      "Advanced playlist matching",
      "Priority support",
      "Weekly performance reports",
      "Spotify pre-save campaigns",
    ],
  },
  enterprise: {
    name: "Enterprise",
    id: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID!,
    price: 199,
    features: [
      "Unlimited track submissions",
      "AI-powered playlist matching",
      "24/7 dedicated support",
      "Real-time analytics",
      "Custom marketing campaigns",
      "Verified curator network",
    ],
  },
} as const;

console.log("STRIPE_PLANS:", STRIPE_PLANS);

export type StripePlan = keyof typeof STRIPE_PLANS;

export function getPlanById(priceId: string) {
  return Object.values(STRIPE_PLANS).find((plan) => plan.id === priceId);
}
