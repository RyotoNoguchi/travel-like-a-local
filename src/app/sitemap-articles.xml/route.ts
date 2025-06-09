import { LOCALE_CODE_MAP } from '@/constants'
import { routing } from '@/i18n/routing'
import { getBlogPosts } from '@/lib/contentful/get-blog-posts'

type SitemapEntry = {
  url: string
  lastModified: string
  changeFrequency: string
  priority: number
}

export const GET = async () => {
  const baseUrl = process.env.METADATA_BASE_URL || 'https://example.com'

  const entries: SitemapEntry[] = []

  // 各ロケールのブログ記事を取得
  for (const locale of routing.locales) {
    const localeCode = LOCALE_CODE_MAP[locale]
    const { blogPosts } = await getBlogPosts(localeCode, 1000, 0)
    const articleEntries: SitemapEntry[] = blogPosts
      .filter((post): post is NonNullable<typeof post> => Boolean(post?.slug && post?.publishedDate))
      .map((post) => ({
        url: `${baseUrl}/${locale}/articles/${post.slug}`,
        lastModified: post.publishedDate,
        changeFrequency: 'monthly',
        priority: 0.7
      }))
    entries.push(...articleEntries)
  }

  // XML生成
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>
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
