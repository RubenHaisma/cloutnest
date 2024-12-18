"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMessage = (searchParams?.get("message") ?? "Failed to verify email") || "Failed to verify email";

  return (
    <Card className="w-full max-w-[380px]">
      <CardHeader className="flex items-center justify-center">
        <CardTitle>Verification Failed</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <CardDescription className="text-center">
          {errorMessage}
        </CardDescription>
        <Button
          onClick={() => router.push('/auth/verify-email/pending')}
          className="w-full"
        >
          Try Again
        </Button>
        <Button
          onClick={() => router.push('/login')}
          variant="outline"
          className="w-full"
        >
          Back to Login
        </Button>
      </CardContent>
    </Card>
  );
}

export default function VerifyEmailError() {
  return (
    <main className="min-h-screen grid place-items-center p-4">
      <Suspense fallback={
        <Card className="w-full max-w-[380px]">
          <CardHeader className="flex items-center justify-center">
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      }>
        <ErrorContent />
      </Suspense>
    </main>
  );
}
