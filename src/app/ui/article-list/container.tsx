import { createApolloClient } from '@/apolloClient'
import { ArticleList } from '@/app/ui/article-list/presenter'
import type { ListLatestBlogQuery, ListLatestBlogQueryVariables, PageBlogPost } from '@/generated/graphql'
import { LIST_LATEST_BLOG_QUERY } from '@/graphql/query'
import type { FC } from 'react'

type Props = {
  title: string
  viewAll: string
}

export const ArticleListContainer: FC<Props> = async ({ title, viewAll }) => {
  const client = createApolloClient()
  const { data } = await client.query<ListLatestBlogQuery, ListLatestBlogQueryVariables>({
    query: LIST_LATEST_BLOG_QUERY
  })
  const blogPosts = data.pageBlogPostCollection?.items.filter((post): post is PageBlogPost => post !== null)
  if (!blogPosts || blogPosts.length === 0) return null
  return <ArticleList blogPosts={blogPosts} title={title} viewAll={viewAll} />
}
