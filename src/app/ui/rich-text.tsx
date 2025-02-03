import type { FC, ReactNode } from 'react'

type Tag = 'emphasis'

type Props = {
  children: (tags: Record<Tag, (chunks: ReactNode) => ReactNode>) => ReactNode
}

export const RichText: FC<Props> = ({ children }) => (
  <div className="prose">
    {children({
      emphasis: (chunks: ReactNode) => <span className="font-bold text-primary">{chunks}</span>
    })}
  </div>
)
