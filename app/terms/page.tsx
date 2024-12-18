import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Terms of Service - CloutNest",
  description: "Terms of service and user agreement for CloutNest",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using CloutNest, you agree to be bound by these Terms of Service and all applicable
                laws and regulations. If you do not agree with any of these terms, you are prohibited from using the platform.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
              <h3 className="text-xl font-medium mb-2">For Influencers:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate details about your audience, engagement, and niche</li>
                <li>Deliver content as agreed upon with brands</li>
                <li>Follow ethical standards and disclose partnerships transparently</li>
                <li>Maintain professional conduct while engaging with brands</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">For Businesses:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide clear and accurate campaign briefs</li>
                <li>Respect influencer content creation timelines</li>
                <li>Ensure timely payments for completed collaborations</li>
                <li>Maintain professionalism during all communications</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Payment Terms</h2>
              <p className="mb-4">
                All payments facilitated through CloutNest are subject to our processing terms. Businesses are required
                to deposit campaign funds upfront, which will be released to influencers upon successful collaboration.
                Refunds are provided only under exceptional circumstances.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="mb-4">
                Influencers retain ownership of the content they create unless explicitly agreed otherwise. Businesses
                are granted a license to use the content as specified in the collaboration agreement.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Providing false or misleading information</li>
                <li>Engaging in spamming or fraudulent activities</li>
                <li>Violating intellectual property rights</li>
                <li>Harassing or discriminating against other users</li>
                <li>Creating fake accounts or inflating metrics artificially</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
              <p>
                CloutNest reserves the right to suspend or terminate accounts that violate these terms, engage in
                fraudulent activities, or misuse the platform.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Liability Disclaimer</h2>
              <p>
                CloutNest serves as a facilitator for collaborations and is not liable for disputes arising between
                influencers and businesses. However, we encourage users to report issues, and we will mediate where possible.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
              <p>
                For questions about these terms, please contact us at{" "}
                <a href="mailto:legal@cloutnest.com" className="text-emerald-500 hover:underline">
                  contact@cloutnest.com
                </a>.
              </p>
            </section>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
