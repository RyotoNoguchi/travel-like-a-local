import { Button } from '@/app/ui/components/atoms/button'
import { ArticleListItemContainer } from '@/app/ui/components/molecules/article-list-item/container'
import type { LANGUAGE } from '@/constants'
import type { PageBlogPost } from '@/generated/graphql'
import type { FC } from 'react'

type Props = {
  blogPosts: PageBlogPost[]
  title: string
  locale: LANGUAGE
  viewAllButtonText?: string
  viewAllHref?: string
  total?: number
  currentPage?: number
  totalPages?: number
}

export const BlogPosts: FC<Props> = ({ blogPosts, title, viewAllButtonText, viewAllHref = '/articles', total, currentPage = 1, totalPages = 1 }) => (
  <section className="flex flex-col w-full gap-4 items-center sm:max-w-[640px] xl:max-w-[800px]">
    <div className="flex justify-between items-center w-full max-w-[300px] sm:max-w-[640px] xl:max-w-[800px]">
      <h2 className="w-full flex-1 text-2xl font-bold text-left">{title}</h2>
      {/*eslint-disable-next-line react/jsx-no-leaked-render */}
      {viewAllButtonText && <Button borderRadius="rounded-md" textColor="text-primary" text={viewAllButtonText} href={viewAllHref} />}
    </div>
    <ul className="flex flex-col w-full items-center gap-4 pb-10">
      {blogPosts.map((blog) => (
        <ArticleListItemContainer key={blog.slug} {...blog} />
      ))}
    </ul>
    {/* TODO: ページネーション（記事が多い場合のみ表示） */}
    {/* {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={viewAllHref} />} */}
  </section>
)
