import { createApolloClient } from '@/apolloClient'
import { LOCALE_CODE_MAP, type LANGUAGE } from '@/constants'
import type { GetBlogPostsQuery, GetBlogPostsQueryVariables } from '@/generated/graphql'
import { GET_BLOG_POSTS_QUERY } from '@/graphql/query'
import type { BlogPostWithHref } from '@/types/blog-post'
import type { Prefecture, Region } from '@/types/region'
import { getPrefectures, getRegions } from '@/utils/concept-helper'
import { getArticleHref } from '@/utils/path-helper'
import type { FC } from 'react'
import { MapPageClient } from './map-page-client'

type Props = {
  params: {
    locale: LANGUAGE
  }
}

export const MapPage: FC<Props> = async ({ params }) => {
  const client = createApolloClient()
  const { locale } = await params

  const where: Record<string, unknown> = {}
  const filters: Array<Record<string, unknown>> = []
  const limit = 10
  const skip = 0

  const regions: Region[] = await getRegions()
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
      href: getArticleHref(post.slug, locale)
    }))

  return <MapPageClient initialPrefectures={prefectures} initialAllPosts={postsWithHref} />
}

export default MapPage
