"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Music } from 'lucide-react'

const testimonials = [
  {
    quote: "PlaylistPro helped me get featured on multiple playlists, growing my audience by 200%!",
    author: "Alex Thompson",
    role: "Artist",
    rating: 5
  },
  {
    quote: "I discovered amazing tracks that perfectly match my playlists' vibe thanks to PlaylistPro!",
    author: "Sarah Martinez",
    role: "Curator",
    rating: 4
  },
  {
    quote: "PlaylistPro's analytics gave me the edge I needed to optimize my music promotion.",
    author: "Chris Taylor",
    role: "Artist",
    rating: 5
  },
  {
    quote: "Never thought playlist networking could be this easy and effective!",
    author: "Emma Rodriguez",
    role: "Independent Musician",
    rating: 4
  },
  {
    quote: "Game-changing platform for emerging artists to get noticed.",
    author: "Michael Lee",
    role: "Producer",
    rating: 5
  },
  {
    quote: "Connecting with the right curators has never been simpler.",
    author: "David Kim",
    role: "Indie Band Manager",
    rating: 4
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % testimonials.length
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="border-t bg-muted/40 py-24">
      <motion.div 
        className="container mx-auto px-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div 
          variants={item} 
          className="max-w-xl mx-auto text-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 p-8 rounded-lg"
            >
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <Music 
                    key={index} 
                    className={`h-6 w-6 stroke-current ${index < testimonials[currentIndex].rating ? 'text-cyan-500' : 'text-gray-400'} ${index < testimonials[currentIndex].rating ? 'opacity-100' : 'opacity-30'}`} 
                  />
                ))}
              </div>
              <p className="text-lg italic mb-4">
                &quot;{testimonials[currentIndex].quote}&quot;
              </p>
              <div className="text-sm text-gray-400">
                {testimonials[currentIndex].author} - {testimonials[currentIndex].role}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default TestimonialsCarousel