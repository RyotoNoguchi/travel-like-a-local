import { createApolloClient } from '@/apolloClient'
import { LOCALE_CODE } from '@/constants'
import type { GetAllBlogPostsQuery, GetAllBlogPostsQueryVariables } from '@/generated/graphql'
import { GET_ALL_BLOG_POSTS_QUERY } from '@/graphql/query'

export const getBlogPosts = async () => {
  const client = createApolloClient()

  const { data } = await client.query<GetAllBlogPostsQuery, GetAllBlogPostsQueryVariables>({
    query: GET_ALL_BLOG_POSTS_QUERY,
    variables: {
      locale: LOCALE_CODE.EN
    }
  })

  return data.pageBlogPostCollection?.items || []
}
