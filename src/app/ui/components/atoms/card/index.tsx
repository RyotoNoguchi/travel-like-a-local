import { Link } from '@/i18n/routing'
import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  imageUrl: string
  title: string
  description: string
  href: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  showLinkButton?: boolean
  linkButtonText?: string
}

export const Card: FC<Props> = ({
  imageUrl,
  title,
  description,
  href,
  imageAlt,
  imageWidth,
  imageHeight,
  showLinkButton = true,
  linkButtonText = 'Learn More'
}) => {
  return (
    <div className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Image src={imageUrl} alt={imageAlt} width={imageWidth} height={imageHeight} className="rounded-t-xl object-cover aspect-w-16 aspect-h-9" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {showLinkButton && linkButtonText ? (
          <Link href={href} className="inline-block bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-700 transition-colors duration-300">
            {linkButtonText}
          </Link>
        ) : null}
      </div>
    </div>
  )
}
