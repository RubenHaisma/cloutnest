"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send-support-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to send message");
      }

      toast({
        title: "Success",
        description: "Your message has been sent!",
        variant: "default",
      });

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
      console.error("Error sending support message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions or need assistance? We&apos;re here to help. Fill out the form below, and our team will get back to you as soon as possible.
          </p>
        </div>

        {/* Support Form */}
        <form onSubmit={handleSubmit} className="mt-12 max-w-2xl mx-auto space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-gray-100 p-2.5 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-gray-100 p-2.5 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-gray-100 p-2.5 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
              placeholder="Write your message here..."
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-600">
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}