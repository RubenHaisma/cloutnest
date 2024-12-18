"use client";

import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col items-center space-y-4 px-4 md:flex-row md:justify-between md:space-y-0">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-emerald-500" />
          <span className="text-xl font-bold">CloutNest</span>
        </div>

        {/* Text Section */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
          © {new Date().getFullYear()} CloutNest. Empowering Influencers and Brands. All rights reserved.
        </p>

        {/* Links Section */}
        <div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-4 md:space-y-0">
          <a
            href="/privacy"
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            Terms of Service
          </a>
          <a
            href="/contact"
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
