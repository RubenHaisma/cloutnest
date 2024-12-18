import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'CloutNest - Empowering Influencers and Brands',
    template: '%s | CloutNest',
  },
  description: 'CloutNest connects influencers with brands to create impactful collaborations. Discover opportunities, build partnerships, and grow your influence with our powerful matching platform.',
  metadataBase: new URL('https://cloutnest.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cloutnest.com',
    siteName: 'CloutNest',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CloutNest - Connect Brands and Influencers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cloutnest',
    creator: '@cloutnest',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://cloutnest.com',
  },
  keywords: [
    'influencer marketing',
    'brand collaborations',
    'influencers',
    'marketing platform',
    'CloutNest',
    'influencer partnerships',
    'sponsored content',
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    "max-snippet": -1,
    "max-image-preview": 'large',
    "max-video-preview": -1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />

        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CloutNest",
              url: "https://cloutnest.com",
              logo: "https://cloutnest.com/logo.png",
              description:
                "CloutNest connects influencers and brands for impactful collaborations.",
              sameAs: [
                "https://twitter.com/cloutnest",
                "https://www.linkedin.com/company/cloutnest",
                "https://www.instagram.com/cloutnest",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
