"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useOnboarding } from "@/lib/hooks/use-onboarding";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function PreferencesForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const { completeStep, setCurrentStep } = useOnboarding();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        emailNotifications: formData.get("emailNotifications") === "on",
        pushNotifications: formData.get("pushNotifications") === "on",
        marketingEmails: formData.get("marketingEmails") === "on",
      };

      await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      completeStep("preferences");
      router.push(session?.user?.role === "CREATOR" ? "/dashboard/creator" : "/dashboard/company");
    } catch (error) {
      console.error("Error updating preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Email Notifications</label>
              <p className="text-sm text-muted-foreground">
                Receive updates about your campaigns
              </p>
            </div>
            <Switch name="emailNotifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Push Notifications</label>
              <p className="text-sm text-muted-foreground">
                Get real-time updates on your device
              </p>
            </div>
            <Switch name="pushNotifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Marketing Emails</label>
              <p className="text-sm text-muted-foreground">
                Receive news and special offers
              </p>
            </div>
            <Switch name="marketingEmails" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep("social")}
          >
            Back
          </Button>
          <Button type="submit" disabled={isLoading}>
            Complete Setup
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}