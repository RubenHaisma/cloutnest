"use client"

import Link from "next/link"
import { Users, Trophy, Star, Globe, BarChart } from "lucide-react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { EmailSignInForm } from "@/components/auth/email-sign-in-form"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, {
        callbackUrl: `/dashboard`,
      })
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="container flex h-16 items-center px-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-emerald-500" />
          <span className="text-xl font-bold">CloutNest</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1">
        <div className="container flex-1 items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          {/* Left Side - Marketing Content */}
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-600 to-zinc-900" />

            {/* Platform Stats */}
            <section className="relative z-20 mb-auto flex justify-around py-8">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto text-emerald-300" />
                <div className="mt-2 text-2xl font-bold">20K+</div>
                <div className="text-sm text-emerald-100">Influencers Connected</div>
              </div>
              <div className="text-center">
                <BarChart className="h-8 w-8 mx-auto text-emerald-300" />
                <div className="mt-2 text-2xl font-bold">500+</div>
                <div className="text-sm text-emerald-100">Brands Collaborating</div>
              </div>
              <div className="text-center">
                <Trophy className="h-8 w-8 mx-auto text-emerald-300" />
                <div className="mt-2 text-2xl font-bold">1M+</div>
                <div className="text-sm text-emerald-100">Campaigns Managed</div>
              </div>
            </section>

            {/* Testimonial */}
            <section className="relative z-20 mt-auto">
              <blockquote className="space-y-2 rounded-lg bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-emerald-300" />
                  ))}
                </div>
                <p className="text-lg">
                  &quot;CloutNest helped us connect with top-tier influencers. The ROI on our campaigns is unmatched!&quot;
                </p>
                <footer className="text-sm text-emerald-200">Chris Evans - Marketing Manager</footer>
              </blockquote>
            </section>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              {/* Login Header */}
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                <p className="text-sm text-muted-foreground">
                  Sign in to your account to access your dashboard
                </p>
              </div>

              {/* Login Form */}
              <div className="space-y-6">
                {/* OAuth Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleOAuthSignIn("google")}
                    className="w-full"
                  >
                    {isLoading ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.google className="mr-2 h-4 w-4" />
                    )}
                    Continue with Google
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with email
                    </span>
                  </div>
                </div>

                {/* Email Sign In Form */}
                <EmailSignInForm />

                {/* Sign Up Link */}
                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
