import type { FC, ReactNode } from 'react'

type Props = {
  enrichedTitle: ReactNode
  enrichedSubtitle: ReactNode
}

export const HeroTitle: FC<Props> = ({ enrichedTitle, enrichedSubtitle }) => (
  <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-4">
    <h1 className="text-4xl semi-sm:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold line-clamp-2">{enrichedTitle}</h1>
    <p className="mt-2 text-lg md:text-xl">{enrichedSubtitle}</p>
  </div>
)
