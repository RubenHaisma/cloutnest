export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Check your email</h1>
        <p className="text-muted-foreground mb-4">
          A sign in link has been sent to your email address.
          Please check your inbox and click the link to verify your email.
        </p>
        <p className="text-sm text-muted-foreground">
          If you don&apos;t see the email, check your spam folder.
        </p>
      </div>
    </div>
  );
}