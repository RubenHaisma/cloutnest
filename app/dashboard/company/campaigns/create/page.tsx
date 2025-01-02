"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";

const campaignSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
  budget: z.number().min(100),
  requirements: z.object({
    minFollowers: z.number().min(1000),
    platforms: z.array(z.string()).min(1),
    niche: z.array(z.string()).min(1),
  }),
  deliverables: z.array(z.string()).min(1),
  timeline: z.number().min(1).max(90),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

export default function CreateCampaignPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
  });

  const onSubmit = async (data: CampaignFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create campaign");

      router.push("/dashboard/company/campaigns");
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign Title</label>
              <Input
                {...register("title")}
                placeholder="e.g., Summer Fashion Collection Launch"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                {...register("description")}
                placeholder="Describe your campaign goals and requirements"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget ($)</label>
                <Input
                  {...register("budget", { valueAsNumber: true })}
                  type="number"
                  min="100"
                  placeholder="1000"
                />
                {errors.budget && (
                  <p className="text-sm text-red-500">{errors.budget.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Timeline (Days)</label>
                <Input
                  {...register("timeline", { valueAsNumber: true })}
                  type="number"
                  min="1"
                  max="90"
                  placeholder="30"
                />
                {errors.timeline && (
                  <p className="text-sm text-red-500">{errors.timeline.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Followers</label>
              <Input
                {...register("requirements.minFollowers", { valueAsNumber: true })}
                type="number"
                min="1000"
                placeholder="10000"
              />
              {errors.requirements?.minFollowers && (
                <p className="text-sm text-red-500">
                  {errors.requirements.minFollowers.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Platforms</label>
              <Input
                {...register("requirements.platforms")}
                placeholder="e.g., Instagram, TikTok (comma separated)"
              />
              {errors.requirements?.platforms && (
                <p className="text-sm text-red-500">
                  {errors.requirements.platforms.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Niche/Categories</label>
              <Input
                {...register("requirements.niche")}
                placeholder="e.g., Fashion, Beauty (comma separated)"
              />
              {errors.requirements?.niche && (
                <p className="text-sm text-red-500">
                  {errors.requirements.niche.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Deliverables</label>
              <Input
                {...register("deliverables")}
                placeholder="e.g., 1 Reel, 2 Stories (comma separated)"
              />
              {errors.deliverables && (
                <p className="text-sm text-red-500">{errors.deliverables.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Campaign
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}