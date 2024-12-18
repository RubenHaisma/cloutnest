"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function VerifyEmailPending() {
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();
  const email = typeof window !== 'undefined' ? sessionStorage.getItem('pendingEmail') : null;

  const resendVerification = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "No email found. Please try signing up again.",
        variant: "destructive",
      });
      return;
    }

    console.log("Attempting to resend verification email to:", email);
    setIsResending(true);
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        if (response.status === 400 && data.error === "Email already verified") {
          window.location.href = "/auth/verify-email/success";
          return;
        }
        throw new Error(data.error || "Failed to resend verification email");
      }

      toast({
        title: "Verification email sent",
        description: "Please check your email for the verification link",
      });
    } catch (error) {
      console.error("Error resending verification:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to resend verification email",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <Card className="w-full max-w-[380px]">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent you a verification link. Please check your email to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {email && <p className="text-sm text-muted-foreground">Verification email sent to: {email}</p>}
          <Button
            onClick={resendVerification}
            disabled={isResending}
            variant="outline"
            className="w-full"
          >
            {isResending ? "Sending..." : "Resend verification email"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Didn&apos;t receive an email? Check your spam folder or try resending the verification email.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
