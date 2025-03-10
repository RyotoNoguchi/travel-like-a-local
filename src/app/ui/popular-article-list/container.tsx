import { createApolloClient } from '@/apolloClient'
import { PopularArticleList } from '@/app/ui/popular-article-list/presenter'
import type { ListLatestBlogQueryVariables, PageBlogPost, Query } from '@/generated/graphql'
import { LIST_LATEST_BLOG_QUERY } from '@/graphql/query'
import { getMultiplePageViews } from '@/utils/redis'
import type { FC } from 'react'

type Props = {
  title: string
  viewCountText: string
}

export const PopularArticleListContainer: FC<Props> = async ({ title, viewCountText }) => {
  const client = createApolloClient()
  const { data } = await client.query<Query, ListLatestBlogQueryVariables>({
    query: LIST_LATEST_BLOG_QUERY
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
