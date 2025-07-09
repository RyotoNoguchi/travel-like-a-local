import { createApolloClient } from '@/apolloClient'
import { PopularBlogPosts } from '@/app/ui/popular-blog-posts/presenter'
import { type LANGUAGE } from '@/constants'
import type { GetBlogPostsBySlugsQuery, GetBlogPostsBySlugsQueryVariables, PageBlogPost } from '@/generated/graphql'
import { GET_BLOG_POSTS_BY_SLUGS_QUERY } from '@/graphql/query'
import { getAllPageViews } from '@/utils/redis'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  limit?: number
  skip?: number
}

export const PopularBlogPostsContainer: FC<Props> = async ({ locale, limit = 10, skip = 0 }) => {
  const t = await getTranslations({ locale })

  // Redisから全記事の閲覧数を取得（降順でソート済み）
  const allPageViews = await getAllPageViews()

  if (allPageViews.length === 0) return null

  // 上位記事のslugを取得（limitを適用）
  const topSlugs = allPageViews.slice(skip, skip + limit).map((item) => item.slug)

  if (topSlugs.length === 0) return null

  // GraphQLで記事詳細を取得
  const client = createApolloClient()
  const { data } = await client.query<GetBlogPostsBySlugsQuery, GetBlogPostsBySlugsQueryVariables>({
    query: GET_BLOG_POSTS_BY_SLUGS_QUERY,
    variables: {
      slugs: topSlugs
    }
  })

  const blogPosts = data.pageBlogPostCollection?.items.filter((post): post is PageBlogPost => post !== null)
  if (!blogPosts || blogPosts.length === 0) return null

  // 閲覧数順でソートし、viewCountプロパティを追加
  const viewsMap = Object.fromEntries(allPageViews.map((item) => [item.slug, item.views]))
  const sortedBlogPosts = blogPosts
    .map((post: PageBlogPost) => ({
      ...post,
      viewCount: viewsMap[post.slug || ''] ?? 0
    }))
    .sort((a, b) => b.viewCount - a.viewCount)

  return <PopularBlogPosts articles={sortedBlogPosts} title={t('PopularArticleList.title')} viewCountText={t('Article.views')} />
}
