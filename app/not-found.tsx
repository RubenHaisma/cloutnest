import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-900">
      {/* Branding */}
      <div className="flex items-center space-x-2 text-emerald-500">
        <Globe className="h-12 w-12" />
        <span className="text-2xl font-bold">CloutNest</span>
      </div>
      
      {/* Main Message */}
      <h1 className="mt-8 text-4xl font-bold text-gray-900">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! It seems this page flew out of the nest. Let us guide you back to where you belong.
      </p>

      {/* Call to Action */}
      <Link href="/" passHref>
        <Button size="lg" className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white">
          Return to Home
        </Button>
      </Link>

      {/* Additional Helpful Links */}
      <div className="mt-8 space-y-2">
        <p className="text-sm text-gray-500">Need help? Explore some of these links:</p>
        <div className="flex space-x-4">
          <Link href="/about">
            <Button variant="ghost" size="sm">
              About Us
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" size="sm">
              Contact Support
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="ghost" size="sm">
              How It Works
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
