import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net'
      }
    ]
  },
  env: {
    METADATA_BASE_URL: process.env.METADATA_BASE_URL
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/en',
      permanent: true
    }
  ]
}

export default withNextIntl(nextConfig)
