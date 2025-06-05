import { Button } from '@/app/ui/components/atoms/button'
import classNames from 'classnames'
import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  imageUrl: string
  title: string
  description: string
  href: string
  imageAlt: string
  showLinkButton?: boolean
  linkButtonText?: string
}

export const Card: FC<Props> = ({ imageUrl, title, description, href, imageAlt, showLinkButton = true, linkButtonText = 'Learn More' }) => {
  return (
    <li className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-80 h-auto">
      <Image src={imageUrl} alt={imageAlt} width={320} height={180} className="rounded-t-xl object-cover aspect-video" />
      <div className="p-4 h-44 flex flex-col justify-between">
        <div className="flex flex-col gap-3 ">
          <h3 className={classNames('text-base font-semibold leading-none')}>{title}</h3>
          <p className="text-gray-600 text-sm text-left leading-tight">{description}</p>
        </div>
        {showLinkButton && linkButtonText ? (
          <div className="w-fit mx-auto">
            <Button borderRadius="rounded-md" text={linkButtonText} href={href} variant="solid" />
          </div>
        ) : null}
      </div>
    </li>
  )
}
