import { createApolloClient } from '@/apolloClient'
import { DEFAULT_LOCALE } from '@/constants'
import type { GetAllBlogPostsQuery, GetAllBlogPostsQueryVariables, SearchBlogPostsQuery, SearchBlogPostsQueryVariables } from '@/generated/graphql'
import { GET_ALL_BLOG_POSTS_QUERY, SEARCH_BLOG_POSTS_QUERY } from '@/graphql/query'
import { loadConcepts } from '@/utils/concept-helper'

export const getAllBlogPosts = async (locale = DEFAULT_LOCALE) => {
  const client = createApolloClient()

  const { data } = await client.query<GetAllBlogPostsQuery, GetAllBlogPostsQueryVariables>({
    query: GET_ALL_BLOG_POSTS_QUERY,
    variables: {
      locale
    }
  })

  return data.pageBlogPostCollection?.items || []
}

export const getBlogPostsBySearchTerm = async (searchTerm: string, locale = DEFAULT_LOCALE) => {
  const client = createApolloClient()
  const concepts = await loadConcepts()
  const conceptId = concepts.find((concept) => concept.label.toLowerCase() === searchTerm.toLowerCase())?.id
  const { data } = await client.query<SearchBlogPostsQuery, SearchBlogPostsQueryVariables>({
    query: SEARCH_BLOG_POSTS_QUERY,
    variables: {
      searchTerm,
      locale,
      conceptId
    }
  })

  return data.pageBlogPostCollection?.items || []
}
