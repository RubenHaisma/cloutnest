import { Metadata } from "next"
import Link from "next/link"
import { PlayCircle, Music, Star, Users, Trophy } from "lucide-react"
import { AuthButtons } from "@/components/auth-buttons"

export const metadata: Metadata = {
  title: "Sign Up - PlaylistPro",
  description: "Create your PlaylistPro account",
}

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { role?: string }
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <PlayCircle className="h-6 w-6 text-cyan-500" />
          <span className="text-xl font-bold">PlaylistPro</span>
        </Link>
      </div>
      <div className="flex flex-1">
        <div className="container flex-1 items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-600 to-zinc-900" />
            
            {/* Stats Section */}
            <div className="relative z-20 mb-auto flex justify-around py-8">
              <div className="text-center">
                <div className="flex justify-center">
                  <Users className="h-8 w-8 text-cyan-300" />
                </div>
                <div className="mt-2 text-2xl font-bold">10K+</div>
                <div className="text-sm text-cyan-100">Active Artists</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <Music className="h-8 w-8 text-cyan-300" />
                </div>
                <div className="mt-2 text-2xl font-bold">50K+</div>
                <div className="text-sm text-cyan-100">Tracks Submitted</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <Trophy className="h-8 w-8 text-cyan-300" />
                </div>
                <div className="mt-2 text-2xl font-bold">500+</div>
                <div className="text-sm text-cyan-100">Curators</div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="relative z-20 mt-auto space-y-8">
              <blockquote className="space-y-2 rounded-lg bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-cyan-300" />
                  <Star className="h-5 w-5 text-cyan-300" />
                  <Star className="h-5 w-5 text-cyan-300" />
                  <Star className="h-5 w-5 text-cyan-300" />
                  <Star className="h-5 w-5 text-cyan-300" />
                </div>
                <p className="text-lg">
                  &ldquo;As a playlist curator, PlaylistPro helps me discover amazing tracks that perfectly match my playlists&apos; vibe!&rdquo;
                </p>
                <footer className="text-sm text-cyan-200">Alex Thompson - Playlist Curator</footer>
              </blockquote>

              <blockquote className="space-y-2 rounded-lg bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-cyan-300" />
                  <Star className="h-5 w-5 text-cyan-300" />
                  <Star className="h-5 w-5 text-cyan-300" />
                  <Star className="h-5 w-5 text-cyan-300" />
                  <Star className="h-5 w-5 text-cyan-300" />
                </div>
                <p className="text-lg">
                  &ldquo;My monthly listeners grew by 300% after getting featured on top playlists through PlaylistPro!&rdquo;
                </p>
                <footer className="text-sm text-cyan-200">Sarah Martinez - Independent Artist</footer>
              </blockquote>
            </div>
          </div>

          {/* Right side remains the same */}
          <div className="p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                <p className="text-sm text-muted-foreground">
                  Get started with PlaylistPro today
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
  )
}