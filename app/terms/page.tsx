import { Card } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Terms of Service - PlaylistPro",
  description: "Terms of service and user agreement for PlaylistPro",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using PlaylistPro, you agree to be bound by these Terms of Service and all applicable
                laws and regulations. If you do not agree with any of these terms, you are prohibited from using the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
              <h3 className="text-xl font-medium mb-2">For Artists:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Submit only original music that you have rights to</li>
                <li>Provide accurate information about your tracks</li>
                <li>Pay required fees for submissions</li>
                <li>Respect curator decisions</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">For Curators:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Review submissions fairly and professionally</li>
                <li>Maintain active and genuine playlists</li>
                <li>Provide honest feedback</li>
                <li>Follow platform guidelines for track acceptance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Payment Terms</h2>
              <p className="mb-4">
                All fees are non-refundable unless otherwise specified. Curator earnings are subject to our
                payment processing terms and schedule.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="mb-4">
                Users retain their intellectual property rights. By using our service, you grant us a license to
                use your content for platform operations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Using automated systems or bots</li>
                <li>Submitting copyrighted material without permission</li>
                <li>Creating fake accounts or playlists</li>
                <li>Engaging in fraudulent activities</li>
                <li>Harassing other users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
              <p>
                We reserve the right to terminate or suspend accounts that violate these terms or engage in
                fraudulent activities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
              <p>
                For questions about these terms, please contact us at{" "}
                <a href="mailto:legal@playlistpro.com" className="text-cyan-500 hover:underline">
                  legal@playlistpro.com
                </a>
              </p>
            </section>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}