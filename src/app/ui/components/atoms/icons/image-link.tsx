import { Link } from '@/i18n/routing'
import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  href: string
  url: string
  alt: string
  width: number
  height: number
}

export const ImageLink: FC<Props> = ({ href, url, alt, width, height }) => (
  <Link href={href} className="rounded-2xl w-full flex justify-center sm:justify-start hover-animation sm:max-w-[216px]">
    <Image className="rounded-2xl" src={`${url}?w=${width}&h=${height}&fit=fill`} alt={alt} width={width} height={height} />
  </Link>
)
