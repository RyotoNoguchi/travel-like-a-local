import type { LANGUAGE } from '@/constants'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

type Props = {
  imageUrl: string
  imageAlt: string
  title: string
  description: string
  price: number
  approximateDuration: number
  href: string
  locale: LANGUAGE
}

export const TourCard: FC<Props> = async ({ imageUrl, imageAlt, title, description, price, approximateDuration, href, locale }) => {
  const t = await getTranslations({ locale })

  return (
    <li className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-80 h-auto">
      <Image src={imageUrl} alt={imageAlt} width={320} height={180} className="rounded-t-xl object-cover aspect-video" />
      <div className="p-4 h-52 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold leading-none">{title}</h3>
          <p className="text-gray-600 text-sm text-left leading-tight line-clamp-2">{description}</p>
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-primary">{t('ToursPage.price', { price: price.toLocaleString() })}</span>
            <span className="text-gray-500">{t('ToursPage.approximateDuration', { approximateDuration: approximateDuration })}</span>
          </div>
        </div>
        <Link href={href} className="mt-4 bg-primary text-white px-4 py-2 rounded-md text-center hover:bg-primary/90 transition-colors">
          {t('ToursPage.learnMore')}
        </Link>
      </div>
    </li>
  )
}
