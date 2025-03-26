'use client'

import { BlogPosts } from '@/app/ui/components/organisms/blog-posts/presenter'
import { type LANGUAGE } from '@/constants'
import type { BlogPostWithHref } from '@/types/blog-post'
import { useEffect, useState, type FC } from 'react'

type Props = {
  title: string
  viewAllButtonText?: string
  locale: LANGUAGE
  viewAllHref?: string
  blogPosts: Array<BlogPostWithHref>
  total?: number
  currentPage?: number
  totalPages?: number
  isBookmarksPage: boolean
}

export const BlogPostsClientContainer: FC<Props> = ({
  title,
  viewAllButtonText,
  viewAllHref,
  locale,
  blogPosts: initialBlogPosts,
  total,
  currentPage,
  totalPages,
  isBookmarksPage
}) => {
  const [posts, setPosts] = useState<Array<BlogPostWithHref>>(initialBlogPosts)

  useEffect(() => {
    setPosts(initialBlogPosts)
  }, [initialBlogPosts])

  const handleBookmarkChange = isBookmarksPage
    ? (blogPostSlug: string, isBookmarked: boolean) => {
        if (!isBookmarked) {
          setPosts((prevPosts) => prevPosts.filter((post) => post.slug !== blogPostSlug))
        }
      }
    : undefined

  if (posts.length === 0) return null

  return (
    <BlogPosts
      blogPosts={posts}
      title={title}
      viewAllButtonText={viewAllButtonText}
      viewAllHref={viewAllHref}
      total={total}
      currentPage={currentPage}
      totalPages={totalPages}
      locale={locale}
      isBookmarksPage={isBookmarksPage}
      onBookmarkChange={handleBookmarkChange}
    />
  )
}
