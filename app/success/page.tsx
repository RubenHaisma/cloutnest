import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Globe } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-gray-100">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 text-emerald-500">
        <Globe className="h-12 w-12" />
        <span className="text-2xl font-bold">CloutNest</span>
      </div>

      {/* Success Message */}
      <div className="mt-8 flex items-center space-x-2 text-green-500">
        <CheckCircle className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
      </div>

      {/* Description */}
      <p className="mt-4 text-center text-lg text-muted-foreground">
        Thank you for choosing CloutNest. Your account has been successfully activated, and you&apos;re ready to explore!
      </p>

      {/* CTA Button */}
      <Link href="/dashboard" className="mt-8">
        <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
}
