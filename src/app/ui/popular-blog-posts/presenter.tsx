import { SmallArticleItemContainer } from '@/app/ui/components/molecules/small-article-item/container'
import type { PageBlogPost } from '@/generated/graphql'
import type { FC } from 'react'

type Props = {
  articles: (PageBlogPost & { viewCount: number })[]
  title: string
  viewCountText: string
}

export const PopularBlogPosts: FC<Props> = ({ articles, title, viewCountText }) => (
  <aside className="hidden semi-lg:flex flex-col shrink-0 w-full gap-4 items-center max-w-[300px]">
    <h3 className="w-full text-left text-2xl font-bold">{title}</h3>
    <ul className="flex flex-col w-full items-center gap-4">
      {articles.map((article) => (
        <SmallArticleItemContainer key={article.slug} {...article} viewCountText={viewCountText} />
      ))}
    </ul>
  </aside>
)
