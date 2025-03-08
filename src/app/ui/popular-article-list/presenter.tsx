import { SmallArticleItem } from '@/app/ui/components/molecules/small-article-item'
import type { PageBlogPost } from '@/generated/graphql'
import type { FC } from 'react'

type Props = {
  blogPosts: PageBlogPost[]
  title: string
}

export const PopularArticleList: FC<Props> = ({ blogPosts, title }) => (
  <aside className="hidden semi-lg:flex flex-col w-full gap-4 items-center max-w-[300px]">
    <h3 className="w-full text-left text-2xl font-bold">{title}</h3>
    <ul className="flex flex-col w-full items-center gap-4">
      {blogPosts.map((blog) => (
        <SmallArticleItem key={blog.slug} {...blog} />
      ))}
    </ul>
  </aside>
)
