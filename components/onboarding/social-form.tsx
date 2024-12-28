"use client";

import { useState } from "react";
import { useOnboarding } from "@/lib/hooks/use-onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SocialFormData } from "@/lib/types/onboarding";

export function SocialForm() {
  const { completeStep, setCurrentStep } = useOnboarding();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data: SocialFormData = {
        instagram: formData.get("instagram") as string,
        tiktok: formData.get("tiktok") as string,
        youtube: formData.get("youtube") as string,
        twitter: formData.get("twitter") as string,
      };

      await fetch("/api/social-profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      completeStep("social");
      setCurrentStep("preferences");
    } catch (error) {
      console.error("Error updating social profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Instagram</label>
            <Input
              name="instagram"
              placeholder="@username"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">TikTok</label>
            <Input
              name="tiktok"
              placeholder="@username"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">YouTube</label>
            <Input
              name="youtube"
              placeholder="Channel URL"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Twitter</label>
            <Input
              name="twitter"
              placeholder="@username"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep("profile")}
          >
            Back
          </Button>
          <Button type="submit" disabled={isLoading}>
            Continue
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}