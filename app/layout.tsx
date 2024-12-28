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
    'CloutNest is the ultimate platform connecting brands with content creators to create impactful, ROI-driven social media campaigns. Discover opportunities to grow your brand or monetize your creativity on CloutNest.',
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
    'content marketing',
    'brand influencer partnerships',
    'top creator platform',
    'CloutNest social campaigns',
  ].join(', '),
  openGraph: {
    title: 'CloutNest - The Leading Creator & Brand Connection Platform',
    description:
      'CloutNest empowers brands and content creators to collaborate and launch successful campaigns. Join now and maximize your ROI.',
    url: 'https://www.cloutnest.com',
    type: 'website',
    images: [
      {
        url: 'https://www.cloutnest.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CloutNest - Connecting Brands and Creators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CloutNest - Brands & Creators Collaborate Seamlessly',
    description:
      'Discover the #1 platform where brands meet influencers and creators. Create impactful campaigns and boost your marketing ROI.',
    images: ['https://www.cloutnest.com/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.cloutnest.com',
    languages: {
      en: 'https://www.cloutnest.com/en',
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
      {/* Advanced SEO Metadata */}
      <head>
        <link rel="canonical" href="https://www.cloutnest.com" />
        <meta name="author" content="CloutNest Team" />
        <meta property="og:title" content="CloutNest - The Leading Creator & Brand Connection Platform" />
        <meta property="og:description" content="CloutNest empowers brands and content creators to collaborate and launch successful campaigns. Join now and maximize your ROI." />
        <meta property="og:url" content="https://www.cloutnest.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.cloutnest.com/og-image.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="CloutNest - Brands & Creators Collaborate Seamlessly" />
        <meta property="twitter:description" content="Discover the #1 platform where brands meet influencers and creators. Create impactful campaigns and boost your marketing ROI." />
        <meta property="twitter:image" content="https://www.cloutnest.com/twitter-image.jpg" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
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
