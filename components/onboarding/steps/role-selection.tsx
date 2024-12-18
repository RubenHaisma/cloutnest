"use client";

import { Button } from "@/components/ui/button";
import { Users, Briefcase } from "lucide-react";
import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export function RoleSelection() {
  const { updateData, setStep } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);

  const selectRole = async (role: "influencer" | "business") => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      updateData({ role });
      setStep(2);
    } catch (error) {
      console.error("Error updating role:", error);
      // Optional: Add a toast notification for errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      {/* Title and Description */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Choose Your Role</h1>
        <p className="text-muted-foreground">
          Select how you want to use CloutNest.
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Influencer Role */}
        <Card
          className={`relative flex flex-col items-center p-6 cursor-pointer hover:border-primary ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => selectRole("influencer")}
        >
          <Users className="h-12 w-12 mb-4 text-emerald-500" />
          <h3 className="text-xl font-semibold">Influencer</h3>
          <p className="text-sm text-center text-muted-foreground mt-2">
            Showcase your expertise, connect with brands, and grow your clout.
          </p>
        </Card>

        {/* Business Role */}
        <Card
          className={`relative flex flex-col items-center p-6 cursor-pointer hover:border-primary ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => selectRole("business")}
        >
          <Briefcase className="h-12 w-12 mb-4 text-blue-500" />
          <h3 className="text-xl font-semibold">Business</h3>
          <p className="text-sm text-center text-muted-foreground mt-2">
            Find the right influencers to amplify your brand&apos;s presence.
          </p>
        </Card>
      </div>
    </div>
  );
}
