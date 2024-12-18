"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function VerifyEmailSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Get the email from sessionStorage
    const email = sessionStorage.getItem('pendingEmail');
    if (email) {
      // Clear it from storage
      sessionStorage.removeItem('pendingEmail');
      // Sign in the user and redirect to dashboard
      signIn('credentials', { email, redirect: false })
        .then((result) => {
          if (result?.ok) {
            router.push('/dashboard');
          } else {
            router.push('/login?email=' + encodeURIComponent(email));
          }
        });
    }
  }, [router]);

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <Card className="w-full max-w-[380px]">
        <CardHeader className="text-center">
          <CardTitle>Email Verified!</CardTitle>
          <CardDescription>
            Your email has been successfully verified. Redirecting you to dashboard...
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            onClick={() => router.push('/dashboard')}
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
