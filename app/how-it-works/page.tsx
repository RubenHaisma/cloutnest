import { Card } from "@/components/ui/card";
import { CheckCircle, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Connect. Collaborate. Thrive.</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              CloutNest is the ultimate platform for influencers and businesses to connect, create, 
              and grow. Revolutionize your reach and partnerships today! 🚀
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Influencers Section */}
            <Card className="p-8 border-2 hover:border-emerald-500 transition-all">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="h-8 w-8 text-emerald-500" />
                <h2 className="text-3xl font-bold text-emerald-500">
                  Influencers: Build Your Empire
                </h2>
              </div>
              <div className="space-y-6">
                <Step
                  title="1. Create Your CloutNest Profile"
                  description="Showcase your personal brand, follower demographics, and engagement stats to attract top-tier businesses."
                />
                <Step
                  title="2. Discover Campaign Opportunities"
                  description="Gain exclusive access to high-impact campaigns from brands eager to collaborate with you."
                />
                <Step
                  title="3. Pitch Your Unique Value"
                  description="Submit personalized proposals to businesses and highlight your ability to amplify their message."
                />
                <Step
                  title="4. Collaborate Seamlessly"
                  description="Manage your campaigns with our streamlined platform and deliver exceptional results to your partners."
                />
                <Step
                  title="5. Grow Your Influence"
                  description="Unlock recurring partnerships and expand your reach with measurable success metrics."
                />
              </div>
            </Card>

            {/* For Businesses Section */}
            <Card className="p-8 border-2 hover:border-emerald-500 transition-all">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="h-8 w-8 text-emerald-500" />
                <h2 className="text-3xl font-bold text-emerald-500">
                  Businesses: Amplify Your Reach
                </h2>
              </div>
              <div className="space-y-6">
                <Step
                  title="1. Create a Campaign"
                  description="Define your campaign goals and let CloutNest connect you with influencers that align with your brand."
                />
                <Step
                  title="2. Browse Talent Profiles"
                  description="Explore verified influencer profiles with detailed analytics to find your ideal brand ambassadors."
                />
                <Step
                  title="3. Collaborate with Confidence"
                  description="Engage influencers, set expectations, and launch campaigns directly through our platform."
                />
                <Step
                  title="4. Track Campaign Success"
                  description="Monitor performance with real-time analytics and measure ROI with detailed engagement metrics."
                />
                <Step
                  title="5. Build Lasting Partnerships"
                  description="Create ongoing collaborations with influencers who deliver measurable results for your brand."
                />
              </div>
            </Card>
          </div>

          <div className="mt-16 text-center bg-gradient-to-r from-emerald-500/10 via-emerald-500/20 to-emerald-500/10 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Take Your Influence to the Next Level?
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Join CloutNest and become part of a thriving network that connects the world&apos;s best influencers 
              with leading businesses. Together, we can amplify success.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="default" className="text-lg px-8">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Step({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-4 group">
      <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>
    </div>
  );
}
