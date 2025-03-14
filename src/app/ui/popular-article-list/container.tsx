import { createApolloClient } from '@/apolloClient'
import { PopularArticleList } from '@/app/ui/popular-article-list/presenter'
import { type LANGUAGE, LOCALE_CODE_MAP } from '@/constants'
import type { ListArticlesQuery, ListArticlesQueryVariables, PageBlogPost } from '@/generated/graphql'
import { LIST_ARTICLES_QUERY } from '@/graphql/query'
import { getMultiplePageViews } from '@/utils/redis'
import type { FC } from 'react'

type Props = {
  title: string
  viewCountText: string
  locale: LANGUAGE
  limit?: number
  skip?: number
}

export const PopularArticleListContainer: FC<Props> = async ({ title, viewCountText, locale, limit = 10, skip = 0 }) => {
  const client = createApolloClient()
  const { data } = await client.query<ListArticlesQuery, ListArticlesQueryVariables>({
    query: LIST_ARTICLES_QUERY,
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

  return <PopularArticleList articles={topTenPosts} title={title} viewCountText={viewCountText} />
}
