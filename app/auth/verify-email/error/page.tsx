"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AlertCircle } from "lucide-react";

function ErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMessage =
    searchParams?.get("message") || "Verification failed. Please try again.";

  return (
    <Card className="w-full max-w-[400px] shadow-lg">
      <CardHeader className="flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="text-red-500 h-10 w-10" />
        <CardTitle className="text-xl font-bold text-center">
          Verification Failed
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <CardDescription className="text-center text-muted-foreground">
          {errorMessage}
        </CardDescription>
        <Button
          onClick={() => router.push("/auth/verify-email/pending")}
          className="w-full bg-emerald-500 hover:bg-emerald-600"
        >
          Try Again
        </Button>
        <Button
          onClick={() => router.push("/login")}
          variant="outline"
          className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-100"
        >
          Back to Login
        </Button>
      </CardContent>
    </Card>
  );
}

export default function VerifyEmailError() {
  return (
    <main className="min-h-screen grid place-items-center bg-background p-4">
      <Suspense
        fallback={
          <Card className="w-full max-w-[400px]">
            <CardHeader className="flex items-center justify-center">
              <CardTitle>Loading...</CardTitle>
            </CardHeader>
          </Card>
        }
      >
        <ErrorContent />
      </Suspense>
    </main>
  );
}
