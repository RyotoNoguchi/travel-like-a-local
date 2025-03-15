import { Button } from '@/app/ui/components/atoms/button'
import { BlogPostItemContainer } from '@/app/ui/components/molecules/blog-post-item/container'
import type { LANGUAGE } from '@/constants'
import type { GetBlogPostsQuery } from '@/generated/graphql'
import type { FC } from 'react'

type Props = {
  blogPosts: NonNullable<GetBlogPostsQuery['pageBlogPostCollection']>['items']
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
      {viewAllButtonText !== undefined && <Button borderRadius="rounded-md" textColor="text-primary" text={viewAllButtonText} href={viewAllHref} />}
    </div>
    <ul className="flex flex-col w-full items-center gap-4 pb-10">
      {blogPosts.map((blogPost) => blogPost && <BlogPostItemContainer key={blogPost.slug} {...blogPost} />)}
    </ul>
    {/* TODO: ページネーション（記事が多い場合のみ表示） */}
    {/* {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={viewAllHref} />} */}
  </section>
)
