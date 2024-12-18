/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'i.scdn.co'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig