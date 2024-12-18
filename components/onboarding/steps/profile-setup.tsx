"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useOnboardingStore } from "@/hooks/use-onboarding-store";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
});

export function ProfileSetup() {
  const { updateData, setStep } = useOnboardingStore();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    updateData(values);
    setStep(3);
  }

  return (
    <div className="grid gap-6">
      {/* Title and Description */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Set Up Your CloutNest Profile</h1>
        <p className="text-muted-foreground">
          Showcase your expertise or brand to attract the perfect connections.
        </p>
      </div>

      {/* Form Section */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name or Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name or business name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio Field */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About You or Your Business</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a compelling bio about you or your brand..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Continue Button */}
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
