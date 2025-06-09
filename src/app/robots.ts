import type { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
  const baseUrl = process.env.METADATA_BASE_URL || 'https://example.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/auth/']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }
}

export default robots
