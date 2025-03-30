import { BlogPostItem } from '@/app/ui/components/molecules/blog-post-item/presenter'
import type { BlogPostWithHref } from '@/types/blog-post'

import type { FC } from 'react'

type Props = BlogPostWithHref & {
  isBookmarksPage: boolean
  onBookmarkChange?: (blogPostSlug: string, isBookmarked: boolean) => void
}

export const BlogPostItemContainer: FC<Props> = ({ slug, contentfulMetadata, href, isBookmarksPage, onBookmarkChange, ...props }) => {
  if (slug === null || slug === undefined) return null

  return (
    <BlogPostItem
      href={href}
      contentfulMetadata={contentfulMetadata}
      slug={slug}
      {...props}
      isBookmarksPage={isBookmarksPage}
      onBookmarkChange={onBookmarkChange}
    />
  )
}
