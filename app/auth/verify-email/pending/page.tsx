"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { MailCheck, Loader } from "lucide-react";
import { useState } from "react";

export default function VerifyEmailPending() {
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();
  const email =
    typeof window !== "undefined"
      ? sessionStorage.getItem("pendingEmail")
      : null;

  const resendVerification = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "No email found. Please try signing up again.",
        variant: "destructive",
      });
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.error === "Email already verified") {
          window.location.href = "/auth/verify-email/success";
          return;
        }
        throw new Error(data.error || "Failed to resend verification email");
      }

      toast({
        title: "Verification email sent",
        description: "Please check your email for the verification link.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to resend verification email.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center bg-background p-4">
      <Card className="w-full max-w-[400px] shadow-lg">
        <CardHeader className="text-center">
          <MailCheck className="h-10 w-10 text-emerald-500 mx-auto" />
          <CardTitle className="text-xl font-bold mt-4">Verify Your Email</CardTitle>
          <CardDescription className="mt-2 text-sm text-muted-foreground">
            A verification link has been sent to your email address. Please
            check your inbox to complete the process.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {email && (
            <p className="text-sm text-muted-foreground text-center">
              Verification email sent to:{" "}
              <span className="font-medium text-gray-800">{email}</span>
            </p>
          )}
          <Button
            onClick={resendVerification}
            disabled={isResending}
            variant="outline"
            className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-100"
          >
            {isResending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              "Resend Verification Email"
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Didn&apos;t receive an email? Check your spam folder or try resending
            the verification email.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
