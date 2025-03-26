import { BlogPosts } from '@/app/ui/components/organisms/blog-posts/presenter'
import { type LANGUAGE } from '@/constants'
import type { GetBlogPostsBySlugsQuery, GetBlogPostsQuery } from '@/generated/graphql'
import type { FC } from 'react'

type Props = {
  title: string
  viewAllButtonText?: string
  locale: LANGUAGE
  viewAllHref?: string
  blogPosts: NonNullable<GetBlogPostsQuery['pageBlogPostCollection']>['items'] | NonNullable<GetBlogPostsBySlugsQuery['pageBlogPostCollection']>['items']
  total?: number
  currentPage?: number
  totalPages?: number
}

export const BlogPostsContainer: FC<Props> = async ({ title, viewAllButtonText, viewAllHref, locale, blogPosts, total, currentPage, totalPages }) => {
  // TODO: Create NoBlogPosts component and return it when blogPosts.length === 0
  if (blogPosts.length === 0) return null

  return (
    <BlogPosts
      blogPosts={blogPosts}
      title={title}
      viewAllButtonText={viewAllButtonText}
      viewAllHref={viewAllHref}
      total={total}
      currentPage={currentPage}
      totalPages={totalPages}
      locale={locale}
    />
  )
}
