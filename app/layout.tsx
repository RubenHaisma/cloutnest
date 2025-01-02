import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/navbar';
import Footer from '@/components/ui/footer';
import { SessionProvider } from '@/components/session-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CloutNest - The Ultimate Platform for Content Creators & Brands to Collaborate',
  description:
    'CloutNest is the leading platform empowering artists, influencers, and businesses to connect and create powerful collaborations, boosting brand visibility, driving social media engagement, and maximizing ROI.',
  keywords: [
    'CloutNest',
    'connect content creators with brands',
    'influencer marketing platform',
    'artist collaborations',
    'business collaborations with creators',
    'influencer partnerships',
    'brand partnerships with influencers',
    'content creators marketing',
    'social media influencers',
    'micro-influencers marketing',
    'brand amplification through influencers',
    'creator collaboration platform',
    'artist marketing',
    'music artist collaboration',
    'brand sponsorship for influencers',
    'creator tools for brands',
    'high ROI influencer campaigns',
    'artist promotion platform',
    'business growth with influencers',
    'creator-driven marketing',
    'influencer campaign tools',
    'artist and brand connection',
    'collaborations for artists and businesses',
    'boost your brand with creators',
    'talent management for influencers',
    'social media content creation for brands',
    'digital marketing with influencers',
  ].join(', '),
  openGraph: {
    title: 'CloutNest - The Ultimate Platform for Content Creators & Brands to Collaborate',
    description:
      'CloutNest is the leading platform empowering artists, influencers, and businesses to connect and create powerful collaborations, boosting brand visibility, driving social media engagement, and maximizing ROI.',
    url: 'https://www.cloutnest.com',
    siteName: 'CloutNest',
    type: 'website',
    images: [
      {
        url: 'https://www.cloutnest.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CloutNest Platform - Where Brands & Content Creators Meet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CloutNest - The Ultimate Platform for Content Creators & Brands to Collaborate',
    description:
      'CloutNest connects content creators and brands to create impactful, ROI-driven collaborations that amplify your brand’s reach and drive engagement.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
