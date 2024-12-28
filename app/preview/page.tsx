"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "@/components/preview/dashboard-preview";
import { FeatureShowcase } from "@/components/preview/feature-showcase";
import { PricingCTA } from "@/components/preview/pricing-cta";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PreviewPage() {
  const [activeView, setActiveView] = useState<"creator" | "company">("creator");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4 py-20 space-y-20">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold sm:text-6xl">
            Experience the Power of CloutNest
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take a sneak peek at our powerful dashboard and see how we help creators and brands succeed
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant={activeView === "creator" ? "default" : "outline"}
              onClick={() => setActiveView("creator")}
            >
              Creator Dashboard
            </Button>
            <Button
              variant={activeView === "company" ? "default" : "outline"}
              onClick={() => setActiveView("company")}
            >
              Company Dashboard
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <DashboardPreview type={activeView} />

        {/* Feature Showcase */}
        <FeatureShowcase />

        {/* Pricing CTA */}
        <PricingCTA />

        {/* Final CTA */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join thousands of successful creators and brands already using CloutNest
          </p>
          <Button asChild size="lg">
            <Link href="/register">
              Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}