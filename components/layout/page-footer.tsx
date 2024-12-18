"use client";

import { Globe } from "lucide-react";

export function PageFooter() {
  return (
    <footer className="border-t py-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-emerald-500" />
          <span className="text-xl font-bold">CloutNest</span>
        </div>

        {/* Copyright Section */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} CloutNest. Empowering Influencers and Brands. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
