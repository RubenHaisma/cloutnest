"use client";

import { useState, useEffect } from "react";
import ContactForm from "@/components/contact/ContactForm";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-01-10T00:00:00Z").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-background"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Cloutnest is Coming Soon!
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                We&apos;re busy building something amazing! Stay tuned for the ultimate platform connecting brands and influencers like never before.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer Section */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Launching in:
            </h2>
            <div className="mt-8 text-6xl font-bold text-primary flex justify-center gap-8">
              <div>
                <span className="block">{timeLeft.days}</span>
                <span className="text-lg text-muted-foreground">Days</span>
              </div>
              <div>
                <span className="block">{timeLeft.hours}</span>
                <span className="text-lg text-muted-foreground">Hours</span>
              </div>
              <div>
                <span className="block">{timeLeft.minutes}</span>
                <span className="text-lg text-muted-foreground">Minutes</span>
              </div>
              <div>
                <span className="block">{timeLeft.seconds}</span>
                <span className="text-lg text-muted-foreground">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or want to know more? Send us a message and we’ll get back to you as soon as possible.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
