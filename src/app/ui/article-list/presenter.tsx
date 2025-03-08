import { Button } from '@/app/ui/components/atoms/button'
import { ArticleListItem } from '@/app/ui/components/molecules/article-list-item'
import type { PageBlogPost } from '@/generated/graphql'
import type { FC } from 'react'

type Props = {
  blogPosts: PageBlogPost[]
  title: string
  viewAll: string
}

export const ArticleList: FC<Props> = ({ blogPosts, title, viewAll }) => (
  <section className="flex flex-col w-full gap-4 items-center sm:max-w-[640px] xl:max-w-[800px]">
    <div className="flex justify-between items-center w-full max-w-[300px] sm:max-w-[640px] xl:max-w-[800px]">
      <h2 className="w-full flex-1 text-2xl font-bold text-left">{title}</h2>
      <Button borderRadius="rounded-md" textColor="text-primary" text={viewAll} href="/blog" />
    </div>
    <ul className="flex flex-col w-full items-center gap-4 pb-10">
      {blogPosts.map((blog) => (
        <ArticleListItem key={blog.slug} {...blog} />
      ))}
    </ul>
  </section>
)
