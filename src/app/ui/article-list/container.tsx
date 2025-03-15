import { createApolloClient } from '@/apolloClient'
import { ArticleList } from '@/app/ui/article-list/presenter'
import { LOCALE_CODE_MAP, type LANGUAGE } from '@/constants'
import type { ListArticlesQuery, PageBlogPost } from '@/generated/graphql'
import { LIST_ARTICLES_QUERY } from '@/graphql/query'
import { getConcepts } from '@/lib/contentful/get-concepts'
import { formatNameForUrl } from '@/utils/url-helpers'
import type { FC } from 'react'

type Props = {
  title: string
  viewAllButtonText?: string
  locale: LANGUAGE
  path: string[]
  category?: string
  region?: string
  area?: string
  prefecture?: string
  limit?: number
  skip?: number
}

export const ArticleListContainer: FC<Props> = async ({ title, viewAllButtonText, locale, category, region, area, prefecture, limit = 10, skip = 0, path }) => {
  const client = createApolloClient()
  const concepts = await getConcepts()
  const where: Record<string, unknown> = {}
  const filters: Array<Record<string, unknown>> = []

  const getConceptIdByLabel = (label: string): string | undefined => {
    const concept = concepts.find((c) => c.label.toLowerCase() === label.toLowerCase() || formatNameForUrl(c.label.toLowerCase()) === label.toLowerCase())
    return concept?.id
  }

  if (category) {
    const categoryId = getConceptIdByLabel(category)
    filters.push({
      contentfulMetadata: {
        concepts: {
          id_contains_some: [categoryId]
        }
      }
    })
  }

  if (region) {
    const regionId = getConceptIdByLabel(region)
    filters.push({
      contentfulMetadata: {
        concepts: {
          id_contains_some: [regionId]
        }
      }
    })
  }

  if (area) {
    const areaId = getConceptIdByLabel(area)
    filters.push({
      contentfulMetadata: {
        concepts: {
          id_contains_some: [areaId]
        }
      }
    })
  }

  if (prefecture) {
    const prefectureId = getConceptIdByLabel(prefecture)
    filters.push({
      contentfulMetadata: {
        concepts: {
          id_contains_some: [prefectureId]
        }
      }
    })
  }

  if (filters.length > 0) {
    where.AND = filters
  }

  const { data } = await client.query<ListArticlesQuery>({
    query: LIST_ARTICLES_QUERY,
    variables: {
      locale: LOCALE_CODE_MAP[locale],
      where: Object.keys(where).length > 0 ? where : undefined,
      limit,
      skip
    }
  })

  const blogPosts = data.pageBlogPostCollection?.items.filter((post: unknown): post is PageBlogPost => post !== null) || []
  const total = data.pageBlogPostCollection?.total || 0

  // TODO: Create NoBlogPosts component and return it when blogPosts.length === 0
  if (blogPosts.length === 0) return null

  // 現在のパスに基づいてviewAllのリンク先を決定
  const viewAllHref = viewAllButtonText && path && path.length > 0 ? `/articles/${path.join('/')}` : viewAllButtonText ? '/articles' : undefined

  return (
    <ArticleList
      blogPosts={blogPosts}
      title={title}
      viewAllButtonText={viewAllButtonText}
      viewAllHref={viewAllHref}
      total={total}
      currentPage={Math.floor(skip / limit) + 1}
      totalPages={Math.ceil(total / limit)}
      locale={locale}
    />
  )
}
