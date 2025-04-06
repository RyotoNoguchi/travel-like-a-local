import { createApolloClient } from '@/apolloClient'
import { JAPAN_MAP_ASSET_ID, LOGO_ASSET_ID } from '@/constants'
import type { Asset, GetAssetQuery, GetAssetQueryVariables, GetAssetsByTagQuery, GetAssetsByTagQueryVariables, QueryAssetArgs } from '@/generated/graphql'
import { GET_ASSET_QUERY, GET_ASSETS_BY_TAG_QUERY } from '@/graphql/query'

type Props = {
  width?: number
  height?: number
}

export const getLogo = async ({ width, height }: Props) => {
  const client = createApolloClient()
  const { data } = await client.query<GetAssetQuery, QueryAssetArgs>({
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

export const getJapanMapImage = async ({ width, height }: Props) => {
  const client = createApolloClient()
  const { data } = await client.query<GetAssetQuery, GetAssetQueryVariables>({
    query: GET_ASSET_QUERY,
    variables: {
      id: JAPAN_MAP_ASSET_ID
    }
  })

  const asset = data.asset

  if (asset && asset.url) {
    const resizedUrl = `${asset.url}${width && height ? `?w=${width}&h=${height}&fit=fill` : ''}`
    return { url: resizedUrl, title: asset.title ?? '', fileName: asset.fileName ?? '' }
  }

  return null
}

export const getImagesByTag = async ({ width, height, tag }: Props & { tag: string }) => {
  const client = createApolloClient()
  const { data } = await client.query<GetAssetsByTagQuery, GetAssetsByTagQueryVariables>({
    query: GET_ASSETS_BY_TAG_QUERY,
    variables: {
      tag: tag
    }
  })

  const assets =
    data.assetCollection?.items
      .filter((asset): asset is Pick<Asset, 'url' | 'title' | 'fileName'> => asset !== null)
      .map((asset) => ({
        url: `${asset.url}${width && height ? `?w=${width}&h=${height}&fit=fill` : ''}`,
        title: asset.title ?? '',
        fileName: asset.fileName ?? ''
      })) ?? []
  return assets
}
