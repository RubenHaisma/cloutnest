import { DefaultSeoProps } from 'next-seo'

export const defaultSEOConfig: DefaultSeoProps = {
  title: 'PlaylistPro - Professional Music Promotion Platform',
  description: 'Connect with playlist curators, promote your music, and grow your audience with PlaylistPro. The professional platform for music promotion and playlist curation.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://playlistpro.com/',
    siteName: 'PlaylistPro',
    images: [
      {
        url: 'https://playlistpro.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PlaylistPro',
      },
    ],
  },
  twitter: {
    handle: '@playlistpro',
    site: '@playlistpro',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
}