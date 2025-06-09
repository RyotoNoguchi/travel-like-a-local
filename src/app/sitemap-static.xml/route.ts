import { routing } from '@/i18n/routing'

export const GET = async () => {
  const baseUrl = process.env.METADATA_BASE_URL || 'https://example.com'

  // 静的ページのリスト
  const staticPages = ['', '/about', '/bookmarks', '/map', '/map/prefectures', '/map/regions', '/search', '/service-intro', '/tours']

  // 各ロケールごとに静的ページを生成
  const staticSitemapEntries = routing.locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: page === '' ? 1.0 : 0.8
    }))
  )

  // XML生成
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticSitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}
