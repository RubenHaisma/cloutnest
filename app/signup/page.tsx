import { Metadata } from "next";
import Link from "next/link";
import { Globe, Users, TrendingUp, Briefcase } from "lucide-react";
import { AuthButtons } from "@/components/auth-buttons";

export const metadata: Metadata = {
  title: "Sign Up - CloutNest",
  description: "Create your CloutNest account to connect influencers and businesses seamlessly.",
};

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-emerald-500" />
          <span className="text-xl font-bold">CloutNest</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-1">
        <div className="container flex-1 items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          {/* Left Section: Highlights and Testimonials */}
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-600 to-gray-900" />

            {/* Stats Section */}
            <div className="relative z-20 mb-auto flex justify-around py-8">
              <div className="text-center">
                <div className="flex justify-center">
                  <Users className="h-8 w-8 text-emerald-300" />
                </div>
                <div className="mt-2 text-2xl font-bold">25K+</div>
                <div className="text-sm text-emerald-100">Influencers</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <Briefcase className="h-8 w-8 text-emerald-300" />
                </div>
                <div className="mt-2 text-2xl font-bold">5K+</div>
                <div className="text-sm text-emerald-100">Businesses</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <TrendingUp className="h-8 w-8 text-emerald-300" />
                </div>
                <div className="mt-2 text-2xl font-bold">1M+</div>
                <div className="text-sm text-emerald-100">Collaborations</div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="relative z-20 mt-auto space-y-8">
              <blockquote className="space-y-2 rounded-lg bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <TrendingUp key={i} className="h-5 w-5 text-emerald-300" />
                  ))}
                </div>
                <p className="text-lg">
                  &ldquo;CloutNest helped our brand connect with the perfect influencers. The ROI has been incredible!&rdquo;
                </p>
                <footer className="text-sm text-emerald-200">Jessica Park - Brand Manager</footer>
              </blockquote>

              <blockquote className="space-y-2 rounded-lg bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <TrendingUp key={i} className="h-5 w-5 text-emerald-300" />
                  ))}
                </div>
                <p className="text-lg">
                  &ldquo;Being on CloutNest allowed me to grow my collaborations and take my influencer career to the next level!&rdquo;
                </p>
                <footer className="text-sm text-emerald-200">David Lee - Influencer</footer>
              </blockquote>
            </div>
          </div>

          {/* Right Section: Sign-Up Form */}
          <div className="p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                <p className="text-sm text-muted-foreground">
                  Join CloutNest to start connecting influencers and businesses.
                </p>
              </div>
              <AuthButtons role={searchParams.role} callbackUrl="/onboarding" mode="signup" />
              <p className="px-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
