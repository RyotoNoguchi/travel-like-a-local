import { createApolloClient } from '@/apolloClient'
import { Hero } from '@/app/ui/hero/presenter'
import { HERO_DESKTOP_ASSET_ID, HERO_MOBILE_ASSET_ID, HERO_TABLET_ASSET_ID } from '@/constants'
import type { GetAssetQuery, QueryAssetArgs } from '@/generated/graphql'
import { GET_ASSET_QUERY } from '@/graphql/query'
import type { FC } from 'react'

type Props = {
  enrichedTitle: React.ReactNode
  enrichedSubtitle: React.ReactNode
}

export const HeroContainer: FC<Props> = async ({ enrichedTitle, enrichedSubtitle }) => {
  const client = createApolloClient()
  const { data: heroMobileData } = await client.query<GetAssetQuery, QueryAssetArgs>({
    query: GET_ASSET_QUERY,
    variables: {
      id: HERO_MOBILE_ASSET_ID
    }
  })
  const { data: heroDesktopData } = await client.query<GetAssetQuery, QueryAssetArgs>({
    query: GET_ASSET_QUERY,
    variables: {
      id: HERO_DESKTOP_ASSET_ID
    }
  })
  const { data: heroTabletData } = await client.query<GetAssetQuery, QueryAssetArgs>({
    query: GET_ASSET_QUERY,
    variables: {
      id: HERO_TABLET_ASSET_ID
    }
  })

  const heroMobileAsset = heroMobileData?.asset
  const heroDesktopAsset = heroDesktopData?.asset
  const heroTabletAsset = heroTabletData?.asset
  if (!heroDesktopAsset || !heroDesktopAsset.url || !heroMobileAsset || !heroMobileAsset.url || !heroTabletAsset || !heroTabletAsset.url) return null

  const images = [
    {
      url: heroDesktopAsset.url ?? '',
      title: heroDesktopAsset.title ?? '',
      width: 1920,
      height: 1080,
      className: 'hidden md:block'
    },
    {
      url: heroTabletAsset.url ?? '',
      title: heroTabletAsset.title ?? '',
      width: 768,
      height: 1024,
      className: 'hidden semi-sm:block md:hidden'
    },
    {
      url: heroMobileAsset.url ?? '',
      title: heroMobileAsset.title ?? '',
      width: 480,
      height: 640,
      className: 'block semi-sm:hidden'
    }
  ]

  return <Hero images={images} enrichedTitle={enrichedTitle} enrichedSubtitle={enrichedSubtitle} />
}
