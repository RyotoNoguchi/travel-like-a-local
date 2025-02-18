import { createApolloClient } from '@/apolloClient'
import { PopularArticleList } from '@/app/ui/popular-article-list/presenter'
import type { ListLatestBlogQueryVariables, PageBlogPost, Query } from '@/generated/graphql'
import { LIST_LATEST_BLOG_QUERY } from '@/graphql/query'
import type { FC } from 'react'

type Props = {
  title: string
}

export const PopularArticleListContainer: FC<Props> = async ({ title }) => {
  const client = createApolloClient()
  const { data } = await client.query<Query, ListLatestBlogQueryVariables>({
    query: LIST_LATEST_BLOG_QUERY
  })
  const blogPosts = data.pageBlogPostCollection?.items.filter((post): post is PageBlogPost => post !== null)
  if (!blogPosts || blogPosts.length === 0) return null
  return <PopularArticleList blogPosts={blogPosts} title={title} />
}
