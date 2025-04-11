import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
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
  async rewrites() {
    return [
      {
        source: '/:locale/map/regions/:region',
        destination: '/:locale/map/regions'
      },
      {
        source: '/:locale/map/prefectures/:prefecture',
        destination: '/:locale/map/prefectures'
      }
    ]
  }
}

export default withNextIntl(nextConfig)
