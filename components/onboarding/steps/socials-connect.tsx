"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { useRouter } from "next/navigation";

export function SocialConnect() {
  const { data, updateData } = useOnboardingStore();
  const router = useRouter();

  const handleInstagramConnect = async () => {
    try {
      const response = await fetch("/api/connect-instagram"); // Instagram OAuth endpoint
      if (!response.ok) throw new Error("Failed to connect Instagram");
      const { instagramProfile } = await response.json();
      updateData({ instagramProfile });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error connecting to Instagram:", error);
    }
  };

  const handleTikTokConnect = async () => {
    try {
      const response = await fetch("/api/connect-tiktok"); // TikTok OAuth endpoint
      if (!response.ok) throw new Error("Failed to connect TikTok");
      const { tiktokProfile } = await response.json();
      updateData({ tiktokProfile });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error connecting to TikTok:", error);
    }
  };

  const skipConnection = () => {
    router.push("/dashboard");
  };

  return (
    <div className="grid gap-6">
      {/* Title and Description */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Connect Your Socials</h1>
        <p className="text-muted-foreground">
          {data.role === "influencer"
            ? "Link your social media accounts to showcase your audience and engagement."
            : "Connect your social accounts to find the best influencers for your brand."}
        </p>
      </div>

      {/* Connection Card */}
      <Card className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <FaInstagram className="h-12 w-12 text-pink-500" />
            <FaTiktok className="h-12 w-12 text-black dark:text-white" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">Maximize Your Opportunities</h3>
            <p className="text-sm text-muted-foreground">
              {data.role === "influencer"
                ? "Prove your reach and secure collaborations by connecting your Instagram and TikTok profiles."
                : "Analyze influencer engagement and audience demographics to find the perfect fit for your campaigns."}
            </p>
          </div>
        </div>
      </Card>

      {/* Connection Buttons */}
      <div className="flex flex-col space-y-2">
        <Button onClick={handleInstagramConnect} className="w-full bg-pink-500 hover:bg-pink-600">
          Connect Instagram
        </Button>
        <Button onClick={handleTikTokConnect} className="w-full bg-black text-white hover:bg-gray-800">
          Connect TikTok
        </Button>
        <Button variant="ghost" onClick={skipConnection} className="w-full">
          Skip for now
        </Button>
      </div>
    </div>
  );
}
