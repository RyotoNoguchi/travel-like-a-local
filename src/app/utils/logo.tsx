import { createApolloClient } from '@/apolloClient'
import { LOGO_ASSET_ID } from '@/constants'
import type { Query, QueryAssetArgs } from '@/generated/graphql'
import { GET_ASSET_QUERY } from '@/graphql/query'

type Props = {
  width?: number
  height?: number
}

export const getLogo = async ({ width, height }: Props) => {
  const client = createApolloClient()
  const { data } = await client.query<Query, QueryAssetArgs>({
    query: GET_ASSET_QUERY,
    variables: {
      id: LOGO_ASSET_ID
    }
  })

  const asset = data.asset
  if (asset && asset.url) {
    const resizedUrl = `${asset.url}${width && height ? `?w=${width}&h=${height}&fit=fill` : ''}`
    return { url: resizedUrl, title: asset.title || 'Default Title' }
  }

  return null
}
