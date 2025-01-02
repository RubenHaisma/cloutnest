import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
    <p className="text-lg mb-8">Looks like you took a wrong turn while chasing clout.</p>
      <Button asChild>
        <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Go back home
        </Link>
      </Button>
    </div>
  );
}