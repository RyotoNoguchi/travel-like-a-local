import { createApolloClient } from '@/apolloClient'
import { HERO_DESKTOP_ASSET_ID, HERO_MOBILE_ASSET_ID, HERO_TABLET_ASSET_ID } from '@/constants'
import type { Query, QueryAssetArgs } from '@/generated/graphql'
import { GET_ASSET_QUERY } from '@/graphql/query'
import Image from 'next/image'
import type { FC } from 'react'

export const Hero: FC = async () => {
  const client = createApolloClient()
  const { data: heroMobileData } = await client.query<Query, QueryAssetArgs>({
    query: GET_ASSET_QUERY,
    variables: {
      id: HERO_MOBILE_ASSET_ID
    }
  })
  const { data: heroDesktopData } = await client.query<Query, QueryAssetArgs>({
    query: GET_ASSET_QUERY,
    variables: {
      id: HERO_DESKTOP_ASSET_ID
    }
  })
  const { data: heroTabletData } = await client.query<Query, QueryAssetArgs>({
    query: GET_ASSET_QUERY,
    variables: {
      id: HERO_TABLET_ASSET_ID
    }
  })

  const heroMobileAsset = heroMobileData?.asset
  const heroDesktopAsset = heroDesktopData?.asset
  const heroTabletAsset = heroTabletData?.asset
  if (!heroDesktopAsset || !heroDesktopAsset.url || !heroMobileAsset || !heroMobileAsset.url || !heroTabletAsset || !heroTabletAsset.url) return null

  return (
    <div className="relative w-full h-full">
      <Image src={`${heroDesktopAsset.url}?w=1920&h=1080&fit=fill`} alt={heroDesktopAsset.title || ''} width={1920} height={1080} className="hidden md:block" />
      <Image
        src={`${heroTabletAsset.url}?w=768&h=1024&fit=fill`}
        alt={heroTabletAsset.title || ''}
        width={768}
        height={1024}
        className="hidden semi-sm:block md:hidden"
      />
      <Image src={`${heroMobileAsset.url}?w=480&h=640&fit=fill`} alt={heroMobileAsset.title || ''} width={480} height={640} className="block semi-sm:hidden" />
    </div>
  )
}
