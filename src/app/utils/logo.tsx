import { createApolloClient } from '@/apolloClient'
import { LOGO_ASSET_ID } from '@/constants'
import type { Query, QueryAssetArgs } from '@/generated/graphql'
import { GET_ASSET_QUERY } from '@/graphql/query'

export const getLogo = async () => {
  const client = createApolloClient()
  const { data } = await client.query<Query, QueryAssetArgs>({
    query: GET_ASSET_QUERY,
    variables: {
      id: LOGO_ASSET_ID
    }
  })

  const asset = data.asset
  const logo = asset && asset.url ? { url: asset.url, title: asset.title || 'Default Title' } : null
  return logo
}
