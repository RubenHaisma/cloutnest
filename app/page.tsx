"use client";

import { Button } from "@/components/ui/button"; 
import { Briefcase, Globe, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TestimonialsCarousel } from "@/components/landingspage/testimonials-carousel";
import FAQ from "@/components/landingspage/faq";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-24 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              className="relative z-10 mx-auto max-w-[800px] space-y-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Empower Influencers. Elevate Brands.
                </span>
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                CloutNest connects influencers with brands to create meaningful collaborations.
                Discover opportunities, grow your influence, and achieve success.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Link href="/signup?role=influencer">
                  <Button size="lg" className="w-full sm:w-auto bg-green-500 hover:bg-green-600">
                    <Users className="mr-2 h-4 w-4" /> Join as Influencer
                  </Button>
                </Link>
                <Link href="/signup?role=brand">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-green-500 text-green-500 hover:bg-green-500/10"
                  >
                    <Briefcase className="mr-2 h-4 w-4" /> Join as Brand
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative mx-auto mt-16 max-w-[1200px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="aspect-video overflow-hidden rounded-xl border bg-background shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <img
                  src="/images/sonnie-hiles-WTe3w4POlCE-unsplash.jpg"
                  alt="CloutNest Influencer Collaboration"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-green-500/20 blur-2xl" />
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl" />
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsCarousel />

        {/* Features Section */}
        <section className="border-t bg-muted/40 py-24">
          <motion.div
            className="container mx-auto grid gap-8 px-4 md:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item} className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Global Reach</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Connect with influencers and brands from around the world to create impactful collaborations.
              </p>
            </motion.div>
            <motion.div variants={item} className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Verified Network</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Work with verified influencers and brands to ensure authentic and trustworthy partnerships.
              </p>
            </motion.div>
            <motion.div variants={item} className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Campaign Analytics</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Get real-time analytics on your campaigns to measure impact and optimize for success.
              </p>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* FAQ Section */}
      <FAQ />

      <Footer />
    </div>
  );
}
