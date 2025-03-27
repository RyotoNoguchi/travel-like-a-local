import { createApolloClient } from '@/apolloClient'
import { ArticleLayout } from '@/app/ui/articles/layout/article-layout'
import { BlogPostsContainer } from '@/app/ui/components/organisms/blog-posts/container'
import { LOCALE_CODE_MAP, type LANGUAGE } from '@/constants'
import type { GetBlogPostsQuery, GetBlogPostsQueryVariables } from '@/generated/graphql'
import { GET_BLOG_POSTS_QUERY } from '@/graphql/query'
import { getConcepts } from '@/lib/contentful/get-concepts'
import type { BreadcrumbItem } from '@/types/breadcrumbs'
import { formatNameForUrl } from '@/utils/url-helpers'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  breadcrumbs: BreadcrumbItem[]
  category?: string
  region?: string
  area?: string
  prefecture?: string
  path: string[]
}

export const BlogPostListPage: FC<Props> = async ({ locale, breadcrumbs, category, region, area, prefecture, path }) => {
  const t = await getTranslations({ locale })

  const client = createApolloClient()
  const concepts = await getConcepts()
  const where: Record<string, unknown> = {}
  const filters: Array<Record<string, unknown>> = []
  const limit = 10
  const skip = 0

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

  const { data } = await client.query<GetBlogPostsQuery, GetBlogPostsQueryVariables>({
    query: GET_BLOG_POSTS_QUERY,
    variables: {
      locale: LOCALE_CODE_MAP[locale],
      where: Object.keys(where).length > 0 ? where : undefined,
      limit,
      skip
    }
  })

  const blogPosts = data.pageBlogPostCollection?.items.filter((post) => post !== null) || []
  const total = data.pageBlogPostCollection?.total || 0

  const viewAllHref = path && path.length > 0 ? `/articles/${path.join('/')}` : '/articles'

  const getTitle = () => {
    if (prefecture) {
      return t('ArticleList.articlesOf', { region: prefecture.charAt(0).toUpperCase() + prefecture.slice(1), category: '' })
    } else if (area) {
      return t('ArticleList.articlesOf', { region: area.charAt(0).toUpperCase() + area.slice(1), category: '' })
    } else if (region) {
      return t('ArticleList.articlesOf', { region: region.charAt(0).toUpperCase() + region.slice(1), category: '' })
    } else if (category) {
      return t('ArticleList.articlesOf', { region: '', category: category.charAt(0).toUpperCase() + category.slice(1) })
    }
    return t('ArticleList.title')
  }

  return (
    <ArticleLayout locale={locale} breadcrumbs={breadcrumbs}>
      <BlogPostsContainer
        blogPosts={blogPosts}
        title={getTitle()}
        locale={locale}
        viewAllButtonText={t('ArticleList.viewAll')}
        viewAllHref={viewAllHref}
        total={total}
        currentPage={Math.floor(skip / limit) + 1}
        totalPages={Math.ceil(total / limit)}
        noBlogPostsTitle={t('BlogPosts.noBlogPosts')}
        noBlogPostsMessage={t('BlogPosts.noBlogPostsMessage')}
        isBookmarksPage={false}
      />
    </ArticleLayout>
  )
}
