"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is CloutNest?",
    answer:
      "CloutNest is a platform that connects influencers with brands to create impactful collaborations. We provide tools to match influencers with companies that align with their niche and values.",
  },
  {
    question: "How does CloutNest work?",
    answer:
      "CloutNest uses advanced algorithms and analytics to match influencers with brands based on their audience demographics, engagement metrics, and interests. Brands can search for influencers, manage campaigns, and track results seamlessly.",
  },
  {
    question: "Who can use CloutNest?",
    answer:
      "CloutNest is designed for both influencers and brands. Influencers can join to find collaboration opportunities, while brands can use the platform to find the perfect influencers for their marketing campaigns.",
  },
  {
    question: "Is CloutNest free to use?",
    answer:
      "CloutNest offers both free and premium plans. Influencers can join for free, while brands can choose from affordable subscription plans to access advanced features like analytics and campaign management.",
  },
  {
    question: "What industries does CloutNest cater to?",
    answer:
      "CloutNest works with a variety of industries, including fashion, tech, beauty, fitness, and more. No matter your niche, you'll find opportunities to collaborate with brands or influencers that match your goals.",
  },
  {
    question: "How can I measure the success of my campaigns?",
    answer:
      "CloutNest provides real-time analytics to track the performance of your influencer campaigns, including engagement rates, impressions, and ROI. Brands can use this data to optimize their strategies.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) =>
    setActiveIndex(activeIndex === index ? null : index);

  // Inject JSON-LD structured data for SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    const scriptTag = document.createElement("script");
    scriptTag.type = "application/ld+json";
    scriptTag.textContent = JSON.stringify(structuredData);
    document.head.appendChild(scriptTag);

    return () => {
      document.head.removeChild(scriptTag);
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ Items */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg overflow-hidden transition-shadow ${
                activeIndex === index
                  ? "shadow-lg bg-white dark:bg-gray-800"
                  : "bg-white/80 dark:bg-gray-800/80"
              }`}
            >
              {/* FAQ Button */}
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-800 dark:text-white">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-emerald-500" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-500" />
                )}
              </button>

              {/* FAQ Answer */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-600 dark:text-gray-400 mt-4"
                  >
                    <p className="border-l-4 border-emerald-500 pl-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
