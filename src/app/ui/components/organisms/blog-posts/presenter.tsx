import { Button } from '@/app/ui/components/atoms/button'
import { Pagination } from '@/app/ui/components/atoms/pagination'
import { BlogPostItemContainer } from '@/app/ui/components/molecules/blog-post-item/container'
import type { LANGUAGE } from '@/constants'
import type { BlogPostWithHref } from '@/types/blog-post'
import type { FC } from 'react'

type Props = {
  blogPosts: Array<BlogPostWithHref>
  title: string
  locale: LANGUAGE
  viewAllButtonText?: string
  viewAllHref?: string
  total?: number
  currentPage?: number
  totalPages?: number
  isBookmarksPage: boolean
  onBookmarkChange?: (blogPostSlug: string, isBookmarked: boolean) => void
}

export const BlogPosts: FC<Props> = ({
  blogPosts,
  title,
  viewAllButtonText,
  viewAllHref = '/articles',
  isBookmarksPage,
  onBookmarkChange,
  total,
  currentPage = 1,
  totalPages = 1
}) => (
  <section id="blog-posts" className="flex flex-col w-full gap-4 sm:max-w-[640px] xl:max-w-[800px]">
    <div className="flex justify-between items-center w-full max-w-[300px] sm:max-w-[640px] xl:max-w-[800px]">
      <h2 className="w-full flex-1 text-2xl font-bold text-left">{title}</h2>
      {Boolean(viewAllButtonText) && <Button borderRadius="rounded-md" textColor="text-primary" text={viewAllButtonText ?? ''} href={viewAllHref} />}
    </div>
    <ul className="flex w-full gap-4 pb-10 overflow-x-scroll sm:overflow-x-auto sm:flex-col">
      {blogPosts.map(
        (blogPost) =>
          blogPost && <BlogPostItemContainer key={blogPost.slug} {...blogPost} onBookmarkChange={onBookmarkChange} isBookmarksPage={isBookmarksPage} />
      )}
    </ul>
    {/* TODO: ページネーション（記事が多い場合のみ表示） */}
    {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={viewAllHref} />}
  </section>
)
