"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function VerifyEmailSuccess() {
  const router = useRouter();

  useEffect(() => {
    const email = sessionStorage.getItem("pendingEmail");
    if (email) {
      sessionStorage.removeItem("pendingEmail");
      signIn("credentials", { email, redirect: false }).then((result) => {
        if (result?.ok) {
          router.push("/dashboard");
        } else {
          router.push("/login?email=" + encodeURIComponent(email));
        }
      });
    }
  }, [router]);

  return (
    <main className="min-h-screen grid place-items-center bg-background p-4">
      <Card className="w-full max-w-[400px] shadow-lg">
        <CardHeader className="text-center">
          <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
          <CardTitle className="text-xl font-bold mt-4">Email Verified!</CardTitle>
          <CardDescription className="mt-2 text-sm text-muted-foreground">
            Your email has been successfully verified. Redirecting you to your dashboard...
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
          >
            Go to Dashboard
          </Button>
          <Button
            onClick={() => router.push("/login")}
            variant="outline"
            className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-100"
          >
            Login with a different account
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
