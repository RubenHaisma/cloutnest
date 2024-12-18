import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Privacy Policy - CloutNest",
  description: "Privacy policy and data protection practices for CloutNest users",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                CloutNest (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is dedicated to safeguarding your privacy. This Privacy Policy outlines how we collect,
                use, and protect your personal data when you use our platform to connect influencers and businesses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect the following types of information:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Account information (name, email, profile picture, and role)</li>
                <li>Business and influencer profiles (niche, social media accounts, audience size)</li>
                <li>Payment details and transaction history</li>
                <li>Analytics data on platform usage and performance</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use your data to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Facilitate connections between influencers and businesses</li>
                <li>Enhance platform features and user experience</li>
                <li>Process payments and ensure secure transactions</li>
                <li>Provide personalized recommendations and matches</li>
                <li>Send relevant updates, notifications, and promotions</li>
                <li>Analyze platform trends and optimize performance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Protection</h2>
              <p>
                We take data protection seriously and employ industry-standard security measures to protect your personal data from
                unauthorized access, loss, alteration, or disclosure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="mb-4">As a user of CloutNest, you have the following rights:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access and review your personal data</li>
                <li>Request corrections to inaccurate or incomplete data</li>
                <li>Request the deletion of your data</li>
                <li>Object to the processing of your data</li>
                <li>Request data portability to another service</li>
              </ul>
              <p>
                To exercise these rights, please contact us at{" "}
                <a href="mailto:privacy@cloutnest.com" className="text-emerald-500 hover:underline">
                  privacy@cloutnest.com
                </a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Third-Party Integrations</h2>
              <p>
                CloutNest integrates with third-party services such as payment processors and social media platforms. These services
                have their own privacy policies, and we encourage you to review them for more information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. When we make
                updates, we will notify users through our platform or via email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or how we handle your data, feel free to reach out to us at{" "}
                <a href="mailto:support@cloutnest.com" className="text-emerald-500 hover:underline">
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
