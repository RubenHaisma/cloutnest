"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";

const testimonials = [
  {
    quote: "CloutNest helped me find the perfect influencers to represent my brand and increase engagement by 150%!",
    author: "Sophia Williams",
    role: "Marketing Manager",
    rating: 5,
  },
  {
    quote: "Finding brands that align with my values has never been easier. CloutNest made it seamless!",
    author: "James Taylor",
    role: "Influencer",
    rating: 5,
  },
  {
    quote: "The analytics tools provided by CloutNest were essential for optimizing my influencer campaigns.",
    author: "Olivia Brown",
    role: "Brand Strategist",
    rating: 4,
  },
  {
    quote: "Collaborating with reputable brands has boosted my credibility and income as an influencer.",
    author: "Emma Johnson",
    role: "Lifestyle Blogger",
    rating: 5,
  },
  {
    quote: "A game-changing platform that simplifies influencer-brand collaborations. Highly recommended!",
    author: "Liam Martinez",
    role: "Small Business Owner",
    rating: 5,
  },
  {
    quote: "CloutNest gave me the tools to build lasting partnerships and grow my social presence.",
    author: "Isabella Chen",
    role: "Content Creator",
    rating: 4,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="border-t bg-muted/40 py-24">
      <motion.div
        className="container mx-auto px-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div variants={item} className="max-w-xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 p-8 rounded-lg"
            >
              {/* Rating Icons */}
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <Users
                    key={index}
                    className={`h-6 w-6 stroke-current ${
                      index < testimonials[currentIndex].rating
                        ? "text-emerald-500"
                        : "text-gray-400"
                    } ${
                      index < testimonials[currentIndex].rating
                        ? "opacity-100"
                        : "opacity-30"
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Quote */}
              <p className="text-lg italic mb-4">
                &quot;{testimonials[currentIndex].quote}&quot;
              </p>

              {/* Author and Role */}
              <div className="text-sm text-gray-400">
                {testimonials[currentIndex].author} - {testimonials[currentIndex].role}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default TestimonialsCarousel;
