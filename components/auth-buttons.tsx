"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { Mail, Music, Users } from "lucide-react"
import { useState } from "react"
import { EmailLoginForm } from "./auth/email-login-form"
import { EmailSignUpForm } from "./auth/email-sign-up-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface AuthButtonsProps {
  role?: string
  callbackUrl?: string
  mode?: "login" | "signup"
}

export function AuthButtons({ role, callbackUrl = "/dashboard", mode = "login" }: AuthButtonsProps) {
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleGoogleSignIn = () => {
    signIn("google", { 
      callbackUrl: `${callbackUrl}?role=${role || ""}` 
    })
  }

  const handleSpotifySignIn = () => {
    signIn("spotify", {
      callbackUrl: `${callbackUrl}?role=${role || ""}`,
      redirect: true
    })
  }

  const handleDevLogin = (devRole: "artist" | "curator") => {
    signIn("dev", {
      role: devRole,
      callbackUrl: "/dashboard",
    })
  }

  return (
    <div className="grid gap-4">
      <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
        </svg>
        Continue with Google
      </Button>

      <Button 
        variant="outline" 
        onClick={handleSpotifySignIn} 
        className="w-full bg-[#1DB954] text-white hover:bg-[#1ed760] hover:text-white"
      >
        <svg
          className="mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
        >
          <path
            fill="currentColor"
            d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"
          />
        </svg>
        Continue with Spotify
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
            <DialogTitle>{mode === "login" ? "Sign in" : "Create account"}</DialogTitle>
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
            onClick={() => handleDevLogin("artist")}
            className="w-full"
          >
            <Music className="mr-2 h-4 w-4" />
            Dev Artist Login
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDevLogin("curator")}
            className="w-full"
          >
            <Users className="mr-2 h-4 w-4" />
            Dev Curator Login
          </Button>
        </div>
      )}

      {role && (
        <div className="text-center text-sm text-muted-foreground">
          {role === "artist" ? (
            <div className="flex items-center justify-center gap-1">
              <Music className="h-4 w-4" />
              <span>Signing up as an Artist</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <Users className="h-4 w-4" />
              <span>Signing up as a Curator</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}