"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { cn } from "@/lib/utils";
import { useState } from "react";

const INDUSTRIES = [
  "Fashion", "Beauty", "Fitness", "Technology", "Travel", 
  "Food & Beverage", "Lifestyle", "Parenting", "Health & Wellness", 
  "Gaming", "Finance", "Entertainment", "Sports", "Education", 
  "Automotive", "Real Estate", "Non-Profit", "Photography", 
  "Art & Design", "Home Decor"
];

export function NicheSelection() {
  const { updateData, setStep } = useOnboardingStore();
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const handleContinue = () => {
    updateData({ industries: selectedIndustries });
    setStep(4);
  };

  return (
    <div className="grid gap-6">
      {/* Title and Description */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Select Your Niche</h1>
        <p className="text-muted-foreground">
          Choose the industries or niches that best represent your audience or business.
        </p>
      </div>

      {/* Scrollable Selection Area */}
      <ScrollArea className="h-[320px] rounded-md border p-4">
        <div className="grid grid-cols-2 gap-2 pr-4 sm:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <Badge
              key={industry}
              variant="outline"
              className={cn(
                "cursor-pointer text-center",
                selectedIndustries.includes(industry)
                  ? "bg-primary text-primary-foreground"
                  : ""
              )}
              onClick={() => toggleIndustry(industry)}
            >
              {industry}
            </Badge>
          ))}
        </div>
      </ScrollArea>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={selectedIndustries.length === 0}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );
}
