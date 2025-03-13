import { createApolloClient } from '@/apolloClient'
import { ArticleDetail } from '@/app/ui/article-detail/presenter'
import { LOCALE_CODE_MAP, REDIS_KEYS, type LANGUAGE } from '@/constants'
import type { ListArticleQuery, ListArticleQueryVariables, PageBlogPost } from '@/generated/graphql'
import { LIST_ARTICLE_QUERY } from '@/graphql/query'
import { generateBreadcrumbs } from '@/utils/breadcrumb-helper'
import { Redis } from '@upstash/redis'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  slug: string
  category: string
  region: string
  area: string
  prefecture: string
  path: string[]
}

export const ArticleDetailContainer: FC<Props> = async ({ locale, slug, category, region, area, prefecture, path }) => {
  const client = createApolloClient()
  const popularArticleListT = await getTranslations({ locale, namespace: 'PopularArticleList' })
  const articleT = await getTranslations({ locale, namespace: 'Article' })

  const { data } = await client.query<ListArticleQuery, ListArticleQueryVariables>({
    query: LIST_ARTICLE_QUERY,
    variables: { slug, locale: LOCALE_CODE_MAP[locale] }
  })

  const article = data.pageBlogPostCollection?.items.find((item) => item?.slug === slug)
  if (article === undefined || article === null) notFound()
  const breadcrumbs = generateBreadcrumbs({
    path,
    article: {
      slug: article.slug,
      title: article.title,
      contentfulMetadata: article.contentfulMetadata
    },
    category,
    region,
    area,
    prefecture
  })
  const redis = Redis.fromEnv()
  const views = (await redis.get<number>([REDIS_KEYS.PAGEVIEWS, REDIS_KEYS.NAMESPACE, slug].join(':'))) ?? 0

  return (
    <ArticleDetail
      locale={locale}
      breadcrumbs={breadcrumbs}
      slug={slug}
      article={article as Pick<PageBlogPost, 'slug' | 'title' | 'publishedDate' | 'seoFields' | 'content' | 'contentfulMetadata'>}
      views={{ count: views, title: articleT('views') }}
      popularArticleListTitle={popularArticleListT('title')}
    />
  )
}
