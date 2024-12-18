import { Card } from "@/components/ui/card"
import { CheckCircle, Sparkles, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header } from "@/components/layout/header"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Transform Your Music Career Today!</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join the revolution in music promotion! PlaylistPro is your gateway to explosive growth 
              and unprecedented opportunities in the music industry. 🚀
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Artists Section */}
            <Card className="p-8 border-2 hover:border-cyan-500 transition-all">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="h-8 w-8 text-cyan-500" />
                <h2 className="text-3xl font-bold text-cyan-500">Artists: Skyrocket Your Success!</h2>
              </div>
              <div className="space-y-6">
                <Step
                  title="1. Join the Elite"
                  description="Create your artist profile and join thousands of successful musicians who've already discovered the PlaylistPro advantage!"
                />
                <Step
                  title="2. Seamless Spotify Integration"
                  description="Connect instantly with Spotify and unlock access to a network of influential playlist curators ready to champion your music!"
                />
                <Step
                  title="3. Submit Your Next Hit"
                  description="Put your music in front of industry tastemakers who are actively searching for the next big sound. Your breakthrough awaits!"
                />
                <Step
                  title="4. Watch Your Success Unfold"
                  description="Experience real-time tracking of your submissions and receive valuable feedback from top playlist curators - your personal roadmap to success!"
                />
                <Step
                  title="5. Achieve Massive Exposure"
                  description="Get featured on high-impact playlists and watch your streams explode! Artists on PlaylistPro have seen their monthly listeners grow by thousands!"
                />
              </div>
            </Card>

            {/* For Curators Section */}
            <Card className="p-8 border-2 hover:border-cyan-500 transition-all">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="h-8 w-8 text-cyan-500" />
                <h2 className="text-3xl font-bold text-cyan-500">Curators: Build Your Empire!</h2>
              </div>
              <div className="space-y-6">
                <Step
                  title="1. Join the Curator Elite"
                  description="Become part of an exclusive network of influential playlist curators and shape the future of music discovery!"
                />
                <Step
                  title="2. Supercharge Your Playlists"
                  description="Take control of your playlists with our powerful curator tools - designed to help you build and maintain world-class collections!"
                />
                <Step
                  title="3. Discover Tomorrow's Hits"
                  description="Get first access to emerging talent and unreleased tracks. Be the first to break the next big artist!"
                />
                <Step
                  title="4. Shape Artist Careers"
                  description="Your feedback can launch careers! Build relationships with promising artists and become a respected industry tastemaker."
                />
                <Step
                  title="5. Grow Your Influence"
                  description="Watch your playlists grow in followers and influence as you curate the perfect selection of tracks. Build your brand in the music industry!"
                />
              </div>
            </Card>
          </div>

          <div className="mt-16 text-center bg-gradient-to-r from-cyan-500/10 via-cyan-500/20 to-cyan-500/10 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Don&apos;t Miss Out on This Game-Changing Opportunity!</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              PlaylistPro is revolutionizing how artists and curators connect in the digital age. 
              Join thousands of success stories who&apos;ve already discovered the power of PlaylistPro. 
              Your music career breakthrough starts here! 
            </p>
            <Link href="/signup">
              <Button size="lg" variant="default" className="text-lg px-8">
                Start Your Journey Today
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <PlayCircle className="h-6 w-6 text-cyan-500" />
              <span className="text-xl font-bold">PlaylistPro</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 PlaylistPro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Step({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-4 group">
      <CheckCircle className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>
    </div>
  )
}
