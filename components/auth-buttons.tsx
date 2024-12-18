"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Mail, Instagram, Users, Video } from "lucide-react";
import { useState } from "react";
import { Music } from "lucide-react";
import { EmailLoginForm } from "./auth/email-login-form";
import { EmailSignUpForm } from "./auth/email-sign-up-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AuthButtonsProps {
  role?: string;
  callbackUrl?: string;
  mode?: "login" | "signup";
}

export function AuthButtons({
  role,
  callbackUrl = "/dashboard",
  mode = "login",
}: AuthButtonsProps) {
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: `${callbackUrl}?role=${role || ""}`,
    });
  };

  const handleInstagramSignIn = () => {
    signIn("instagram", {
      callbackUrl: `${callbackUrl}?role=${role || ""}`,
      redirect: true,
    });
  };

  const handleTikTokSignIn = () => {
    signIn("tiktok", {
      callbackUrl: `${callbackUrl}?role=${role || ""}`,
      redirect: true,
    });
  };

  const handleDevLogin = (devRole: "influencer" | "business") => {
    signIn("dev", {
      role: devRole,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="grid gap-4">
      <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
        <svg
          className="mr-2 h-4 w-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Continue with Google
      </Button>

      <Button
        variant="outline"
        onClick={handleInstagramSignIn}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-400 hover:to-purple-400"
      >
        <Instagram className="mr-2 h-4 w-4" />
        Continue with Instagram
      </Button>

      <Button
        variant="outline"
        onClick={handleTikTokSignIn}
        className="w-full bg-black text-white hover:bg-gray-800"
      >
        <Video className="mr-2 h-4 w-4" />
        Continue with TikTok
      </Button>

      <Dialog open={showEmailForm} onOpenChange={setShowEmailForm}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Continue with Email
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === "login" ? "Sign in" : "Create account"}
            </DialogTitle>
            <DialogDescription>
              {mode === "login"
                ? "Sign in to your account using your email and password"
                : "Create a new account using your email and password"}
            </DialogDescription>
          </DialogHeader>
          {mode === "login" ? <EmailLoginForm /> : <EmailSignUpForm />}
        </DialogContent>
      </Dialog>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="grid gap-2">
          <Button
            variant="outline"
            onClick={() => handleDevLogin("influencer")}
            className="w-full"
          >
            <Users className="mr-2 h-4 w-4" />
            Dev Influencer Login
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDevLogin("business")}
            className="w-full"
          >
            <Music className="mr-2 h-4 w-4" />
            Dev Business Login
          </Button>
        </div>
      )}

      {role && (
        <div className="text-center text-sm text-muted-foreground">
          {role === "influencer" ? (
            <div className="flex items-center justify-center gap-1">
              <Users className="h-4 w-4" />
              <span>Signing up as an Influencer</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <Music className="h-4 w-4" />
              <span>Signing up as a Business</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
