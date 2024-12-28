"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useOnboarding } from "@/lib/hooks/use-onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ProfileFormData } from "@/lib/types/onboarding";

export function ProfileForm() {
  const { data: session } = useSession();
  const { completeStep, setCurrentStep } = useOnboarding();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data: ProfileFormData = {
        bio: formData.get("bio") as string,
        location: formData.get("location") as string,
        website: formData.get("website") as string,
        categories: (formData.get("categories") as string).split(","),
        languages: (formData.get("languages") as string).split(","),
      };

      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      completeStep("profile");
      setCurrentStep("social");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              name="bio"
              placeholder="Tell us about yourself"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              name="location"
              placeholder="Where are you based?"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Website</label>
            <Input
              name="website"
              type="url"
              placeholder="Your website (optional)"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Categories</label>
            <Input
              name="categories"
              placeholder="e.g., Fashion, Tech, Lifestyle"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Languages</label>
            <Input
              name="languages"
              placeholder="e.g., English, Spanish"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            Continue
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}