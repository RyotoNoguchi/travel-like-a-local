import { createApolloClient } from '@/apolloClient'
import { LOCALE_CODE_MAP } from '@/constants'
import type { GetToursQuery, GetToursQueryVariables } from '@/generated/graphql'
import { GET_TOURS_QUERY } from '@/graphql/query'
import { routing } from '@/i18n/routing'

type SitemapEntry = {
  url: string
  lastModified: string
  changeFrequency: string
  priority: number
}

export const GET = async () => {
  const baseUrl = process.env.METADATA_BASE_URL || 'https://example.com'
  const client = createApolloClient()

  const entries: SitemapEntry[] = []

  // 各ロケールのツアーを取得
  for (const locale of routing.locales) {
    const localeCode = LOCALE_CODE_MAP[locale]
    const { data } = await client.query<GetToursQuery, GetToursQueryVariables>({
      query: GET_TOURS_QUERY,
      variables: {
        locale: localeCode
      }
    })

    const tours = data?.tourCollection?.items || []
    const tourEntries: SitemapEntry[] = tours
      .filter((tour): tour is NonNullable<typeof tour> => Boolean(tour?.slug))
      .map((tour) => ({
        url: `${baseUrl}/${locale}/tours/${tour.slug}`,
        lastModified: new Date().toISOString(), // ツアーに更新日がない場合は現在日時を使用
        changeFrequency: 'monthly',
        priority: 0.8 // 全ツアーを同じ優先度に設定
      }))
    entries.push(...tourEntries)
  }

  // XML生成
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
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
