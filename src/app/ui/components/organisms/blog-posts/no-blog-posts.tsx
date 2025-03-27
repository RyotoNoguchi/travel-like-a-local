import { ArticleIcon } from '@/app/ui/components/atoms/icons/article-icon'
import type { FC } from 'react'

type Props = {
  title: string
  message: string
}

export const NoBlogPosts: FC<Props> = ({ title, message }) => (
  <div className="flex flex-col items-center justify-center w-full py-12 gap-4">
    <ArticleIcon width={64} height={64} />
    <div className="w-full flex flex-col leading-none items-center">
      <h3 className="w-full text-2xl text-center font-medium text-gray-700">{title}</h3>
      <p className="w-full text-gray-500 text-center max-w-md">{message}</p>
    </div>
  </div>
)
