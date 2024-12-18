import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { SessionProvider } from '@/components/session-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CloutNest - #1 Platform for Brands & Content Creators',
  description:
    'CloutNest is the ultimate platform connecting brands with content creators to create impactful, ROI-driven social media campaigns. Join the revolution in influencer marketing.',
  keywords: [
    'CloutNest',
    'connect brands with influencers',
    'content creators',
    'influencer marketing',
    'social media marketing',
    'brand collaborations',
    'influencer campaigns',
    'creator platforms',
    'micro-influencers',
    'ROI-driven marketing',
  ].join(', '),
  openGraph: {
    title: 'CloutNest - Connect Brands with Content Creators',
    description:
      'Discover CloutNest: the #1 platform connecting brands with content creators and influencers. Collaborate, create, and amplify your social media presence today.',
    url: 'https://cloutnest.com',
    siteName: 'CloutNest',
    images: [
      {
        url: 'https://cloutnest.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CloutNest - Connect Brands with Content Creators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cloutnest',
    title: 'CloutNest - #1 Platform for Brands & Content Creators',
    description:
      'Join CloutNest: the top influencer marketing platform for connecting brands with content creators. Create impactful campaigns that drive real results.',
    images: ['https://cloutnest.com/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://cloutnest.com',
    languages: {
      en: 'https://cloutnest.com/en',
      es: 'https://cloutnest.com/es',
    },
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
        {/* Core SEO Meta Tags */}
        <meta
          name="keywords"
          content="CloutNest, connect brands with influencers, influencer marketing, social media campaigns, micro-influencers, ROI marketing, content creator platform, brand collaborations"
        />
        <meta
          name="description"
          content="CloutNest is the ultimate platform for connecting brands with influencers and content creators to craft impactful social media marketing campaigns."
        />
        <meta name="author" content="CloutNest Team" />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'CloutNest',
            url: 'https://cloutnest.com',
            description:
              'CloutNest connects brands with content creators and influencers to create impactful, ROI-focused social media campaigns.',
            publisher: {
              '@type': 'Organization',
              name: 'CloutNest',
              logo: 'https://cloutnest.com/images/logo.png',
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://cloutnest.com/?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          })}
        </script>

        {/* Preloading Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
