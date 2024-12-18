import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, PlayCircle } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex items-center space-x-2 text-cyan-500">
        <PlayCircle className="h-12 w-12" />
        <span className="text-2xl font-bold">PlaylistPro</span>
      </div>
      <div className="mt-8 flex items-center space-x-2 text-green-500">
        <CheckCircle className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
      </div>
      <p className="mt-4 text-center text-lg text-muted-foreground">
        Thank you for joining PlaylistPro. Your account has been activated.
      </p>
      <Link href="/dashboard" className="mt-8">
        <Button size="lg">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  )
}