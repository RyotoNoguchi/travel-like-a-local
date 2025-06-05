import { HeroTitle } from '@/app/ui/hero/title'
import { Overlay } from '@/app/ui/overlay'
import { Link } from '@/i18n/routing'
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
  buttonText: string
}

export const Hero: FC<Props> = ({ images, enrichedTitle, enrichedSubtitle, buttonText }) => (
  <div className="relative w-full">
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
    <Link
      href="/service-intro#contact"
      className="text-xl bg-primary-600 text-white font-bold py-3 px-8 rounded-md hover:bg-primary-700 transition duration-300 shadow-md absolute left-1/2 -translate-x-1/2 top-[70%] sm:top-[64%] md:top-[70%] lg:top-[75%] xl:top-[62%]"
    >
      {buttonText}
    </Link>
  </div>
)
