import { createApolloClient } from '@/apolloClient'
import { PrefecturesMapPageClient } from '@/app/[locale]/map/prefectures/prefectures-map-page-client'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { LOCALE_CODE_MAP, type LANGUAGE } from '@/constants'
import type { GetBlogPostsQuery, GetBlogPostsQueryVariables } from '@/generated/graphql'
import { GET_BLOG_POSTS_QUERY } from '@/graphql/query'
import type { BlogPostWithHref } from '@/types/blog-post'
import type { Prefecture } from '@/types/region'
import { getPrefectures } from '@/utils/concept-helper'
import { getArticleHref } from '@/utils/path-helper'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: LANGUAGE }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return {
    title: t('PrefecturesMapPage.title'),
    description: t('PrefecturesMapPage.metadataDescription')
  }
}

const PrefecturesMapPage: NextPage<Props> = async ({ params }) => {
  const client = createApolloClient()
  const { locale } = await params
  const t = await getTranslations({ locale })

  const breadcrumbs = [
    { label: t('Metadata.home'), href: '' },
    { label: t('MapPage.map'), href: '/map' },
    { label: t('PrefecturesMapPage.title'), href: '/map/prefectures' }
  ]

  const where: Record<string, unknown> = {}
  const filters: Array<Record<string, unknown>> = []
  const limit = 10
  const skip = 0

  const prefectures: Prefecture[] = await getPrefectures()
  const prefectureConceptIds = prefectures.map((prefecture) => prefecture.id)

  filters.push({
    contentfulMetadata: {
      concepts: {
        id_contains_some: prefectureConceptIds
      }
    }
  })

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

  const blogPosts = data.pageBlogPostCollection?.items.map((item) => item) || []

  const postsWithHref: BlogPostWithHref[] = blogPosts
    ?.filter((post): post is NonNullable<typeof post> => post !== null)
    .map((post) => ({
      ...post,
      href: getArticleHref(post.slug)
    }))

  return (
    <>
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <PrefecturesMapPageClient initialPrefectures={prefectures} initialAllPosts={postsWithHref} breadcrumbs={breadcrumbs} />
    </>
  )
}

export default PrefecturesMapPage
