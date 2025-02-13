import { ArticleListItem } from '@/app/ui/components/molecules/article-list-item'
import type { PageBlogPost } from '@/generated/graphql'
import type { FC } from 'react'

type Props = {
  blogPosts: PageBlogPost[]
}

export const ArticleList: FC<Props> = ({ blogPosts }) => (
  <section className="flex flex-col w-full gap-4 py-4 px-3 items-center">
    <ul className="flex flex-col w-full items-center gap-4">
      {blogPosts.map((blog) => (
        <ArticleListItem key={blog.slug} {...blog} />
      ))}
    </ul>
  </section>
)
