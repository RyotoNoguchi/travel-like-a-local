import { SmallBlogPostItemContainer } from '@/app/ui/components/molecules/small-blog-post-item/container'
import type { PageBlogPost } from '@/generated/graphql'
import type { FC } from 'react'

type Props = {
  articles: (PageBlogPost & { viewCount: number })[]
  title: string
  viewCountText: string
}

export const PopularBlogPosts: FC<Props> = ({ articles, title, viewCountText }) => (
  <aside className="hidden xl:flex flex-col shrink-0 w-full gap-4 items-center max-w-[300px]">
    <h3 className="w-full text-left text-2xl font-bold">{title}</h3>
    <ul className="flex flex-col w-full items-center gap-4">
      {articles.map((article) => (
        <SmallBlogPostItemContainer key={article.slug} {...article} viewCountText={viewCountText} />
      ))}
    </ul>
  </aside>
)
