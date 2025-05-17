import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
}

export const ResponsiveImage: FC<Props> = ({ src, alt, width, height, fill, className }) => (
  <figure className="my-5">
    <div className="relative w-full aspect-[4/3]">
      <Image src={src} alt={alt} width={width} height={height} fill={fill} className={className ?? 'object-cover'} />
    </div>
  </figure>
)
