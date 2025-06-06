import { Link } from '@/i18n/routing'
import classNames from 'classnames'
import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  href: string
  url: string
  alt: string
  width: number
  height: number
  wrapperClassName?: string
  className?: string
  shouldHoverAnimation?: boolean
}

export const ImageLink: FC<Props> = ({ href, url, alt, width, height, className, wrapperClassName, shouldHoverAnimation }) => (
  <Link href={href} className={classNames('rounded-2xl w-full flex justify-between', wrapperClassName, shouldHoverAnimation && 'hover-animation')}>
    {/* Image resize REF: https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/change-the-resizing-behavior */}
    <Image className={classNames(className)} src={`${url}?w=${width}&h=${height}&fit=fill`} alt={alt} width={width} height={height} />　
  </Link>
)
