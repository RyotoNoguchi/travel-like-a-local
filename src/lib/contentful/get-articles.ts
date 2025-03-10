import { createApolloClient } from '@/apolloClient'
import { LOCALE_CODE } from '@/constants'
import type { GetAllArticlesQuery, GetAllArticlesQueryVariables } from '@/generated/graphql'
import { GET_ALL_ARTICLES_QUERY } from '@/graphql/query'

export const getAllArticles = async () => {
  const client = createApolloClient()

  const { data } = await client.query<GetAllArticlesQuery, GetAllArticlesQueryVariables>({
    query: GET_ALL_ARTICLES_QUERY,
    variables: {
      locale: LOCALE_CODE.EN
    }
  })

  return data.pageBlogPostCollection?.items || []
}
