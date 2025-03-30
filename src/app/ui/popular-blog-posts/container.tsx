import { createApolloClient } from '@/apolloClient'
import { PopularBlogPosts } from '@/app/ui/popular-blog-posts/presenter'
import { type LANGUAGE, LOCALE_CODE_MAP } from '@/constants'
import type { GetBlogPostsQuery, GetBlogPostsQueryVariables, PageBlogPost } from '@/generated/graphql'
import { GET_BLOG_POSTS_QUERY } from '@/graphql/query'
import { getMultiplePageViews } from '@/utils/redis'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  limit?: number
  skip?: number
}

export const PopularBlogPostsContainer: FC<Props> = async ({ locale, limit = 10, skip = 0 }) => {
  const t = await getTranslations({ locale })
  const client = createApolloClient()
  const { data } = await client.query<GetBlogPostsQuery, GetBlogPostsQueryVariables>({
    query: GET_BLOG_POSTS_QUERY,
    variables: {
      locale: LOCALE_CODE_MAP[locale],
      skip,
      limit
    }
  })
  const blogPosts = data.pageBlogPostCollection?.items.filter((post): post is PageBlogPost => post !== null)
  if (!blogPosts || blogPosts.length === 0) return null

  // 全記事のslugを取得
  const slugs = blogPosts.map((post) => post.slug).filter((slug): slug is string => slug !== null)

  // Redisから閲覧数を一括取得
  const viewsData = await getMultiplePageViews(slugs)
  // 閲覧数に基づいて記事をソートし、viewCountプロパティを追加
  const sortedBlogPosts = [...blogPosts]
    .map((post: PageBlogPost) => {
      if (post.slug) {
        return {
          ...post,
          viewCount: viewsData[post.slug] ?? 0
        }
      }
      return post
    })
    .sort((a, b) => {
      if (!a.slug || !b.slug) return 0
      return ((b as PageBlogPost & { viewCount: number }).viewCount ?? 0) - ((a as PageBlogPost & { viewCount: number }).viewCount ?? 0) // 降順
    })

  // 上位10件を取得
  const topTenPosts = sortedBlogPosts.slice(0, 10) as (PageBlogPost & { viewCount: number })[]

  return <PopularBlogPosts articles={topTenPosts} title={t('PopularArticleList.title')} viewCountText={t('Article.views')} />
}
