import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle, PlayCircle } from 'lucide-react'

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex items-center space-x-2 text-cyan-500">
        <PlayCircle className="h-12 w-12" />
        <span className="text-2xl font-bold">PlaylistPro</span>
      </div>
      <div className="mt-8 flex items-center space-x-2 text-red-500">
        <AlertCircle className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Payment Failed</h1>
      </div>
      <p className="mt-4 text-center text-lg text-muted-foreground">
        Something went wrong with your payment. Please try again or contact support.
      </p>
      <div className="mt-8 flex space-x-4">
        <Link href="/pricing">
          <Button size="lg">
            Try Again
          </Button>
        </Link>
        <Link href="/support">
          <Button size="lg" variant="outline">
            Contact Support
          </Button>
        </Link>
      </div>
    </div>
  )
}