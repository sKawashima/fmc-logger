/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable server actions for form handling
    serverActions: true,
  },
  // Optimize for production
  productionBrowserSourceMaps: false,
  // Compile-time optimizations
  swcMinify: true,
  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
