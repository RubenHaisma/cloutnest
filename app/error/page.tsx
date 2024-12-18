import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, Target } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex items-center space-x-2 text-emerald-500">
        <Target className="h-12 w-12" />
        <span className="text-2xl font-bold">CloutNest</span>
      </div>
      <div className="mt-8 flex items-center space-x-2 text-red-500">
        <AlertCircle className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Something Went Wrong</h1>
      </div>
      <p className="mt-4 text-center text-lg text-muted-foreground">
        We encountered an issue processing your request. Please try again or contact our support team for assistance.
      </p>
      <div className="mt-8 flex space-x-4">
        <Link href="/pricing">
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
            Try Again
          </Button>
        </Link>
        <Link href="/support">
          <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-500">
            Contact Support
          </Button>
        </Link>
      </div>
    </div>
  );
}
