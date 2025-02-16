import { ArticleListItem } from '@/app/ui/components/molecules/article-list-item'
import type { PageBlogPost } from '@/generated/graphql'
import { Link } from '@/i18n/routing'
import type { FC } from 'react'

type Props = {
  blogPosts: PageBlogPost[]
  title: string
  viewAll: string
}

export const ArticleList: FC<Props> = ({ blogPosts, title, viewAll }) => (
  <section className="flex flex-col w-full gap-4 py-4 px-3 items-center">
    <div className="flex justify-between items-center w-full max-w-[300px] sm:max-w-[640px]">
      <h2 className="w-full flex-1 text-2xl font-bold text-left">{title}</h2>
      <Link
        href="/blog"
        className="flex items-center justify-center text-md text-primary rounded-full border border-solid border-primary px-2 py-1"
        role="button"
      >
        {viewAll}
      </Link>
    </div>
    <ul className="flex flex-col w-full items-center gap-4">
      {blogPosts.map((blog) => (
        <ArticleListItem key={blog.slug} {...blog} />
      ))}
    </ul>
  </section>
)
