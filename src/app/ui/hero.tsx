import { createApolloClient } from '@/apolloClient'
import { HERO_DESKTOP_ASSET_ID, HERO_MOBILE_ASSET_ID, HERO_TABLET_ASSET_ID } from '@/constants'
import type { Query, QueryAssetArgs } from '@/generated/graphql'
import { GET_ASSET_QUERY } from '@/graphql/query'
import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  title: React.ReactNode
  subtitle: string
}

export const Hero: FC<Props> = async ({ title, subtitle }) => {
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

  return (
    <div className="relative w-full h-full">
      {images.map((image) => (
        <Image
          src={`${image.url}?w=${image.width}&h=${image.height}&fit=fill`}
          alt={image.title || ''}
          width={image.width}
          height={image.height}
          className={image.className}
          key={image.url}
        />
      ))}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-4">
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold line-clamp-2">{title}</h1>
        <p className="mt-2 text-lg md:text-xl">{subtitle}</p>
      </div>
    </div>
  )
}
