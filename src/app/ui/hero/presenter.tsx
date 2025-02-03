import { HeroTitle } from '@/app/ui/hero/title'
import { Overlay } from '@/app/ui/overlay'
import Image from 'next/image'
import type { FC, ReactNode } from 'react'

type Props = {
  images: {
    url: string
    title: string
    width: number
    height: number
    className: string
  }[]
  enrichedTitle: ReactNode
  enrichedSubtitle: ReactNode
}

export const Hero: FC<Props> = ({ images, enrichedTitle, enrichedSubtitle }) => (
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
    <Overlay />
    <HeroTitle enrichedTitle={enrichedTitle} enrichedSubtitle={enrichedSubtitle} />
  </div>
)
