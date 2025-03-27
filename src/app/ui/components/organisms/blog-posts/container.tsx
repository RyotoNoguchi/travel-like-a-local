import { BlogPostsClientContainer } from '@/app/ui/components/organisms/blog-posts/client-container'
import { type LANGUAGE } from '@/constants'
import type { GetBlogPostsBySlugsQuery, GetBlogPostsQuery } from '@/generated/graphql'
import type { BlogPostWithHref } from '@/types/blog-post'
import { extractTaxonomyInfo } from '@/utils/taxonomy-helper'
import { generateHref } from '@/utils/url-helpers'
import type { FC } from 'react'

type Props = {
  title: string
  viewAllButtonText?: string
  locale: LANGUAGE
  isBookmarksPage: boolean
  viewAllHref?: string
  blogPosts: NonNullable<GetBlogPostsQuery['pageBlogPostCollection']>['items'] | NonNullable<GetBlogPostsBySlugsQuery['pageBlogPostCollection']>['items']
  noBlogPostsTitle: string
  noBlogPostsMessage: string
  total?: number
  currentPage?: number
  totalPages?: number
}

export const BlogPostsContainer: FC<Props> = async ({
  title,
  viewAllHref,
  viewAllButtonText,
  locale,
  blogPosts,
  total,
  currentPage,
  totalPages,
  isBookmarksPage,
  noBlogPostsTitle,
  noBlogPostsMessage
}) => {
  const blogPostsWithHref = (
    await Promise.all(
      blogPosts
        .filter((blogPost) => blogPost !== null && blogPost.contentfulMetadata.concepts.length > 0 && blogPost.slug !== null && blogPost.slug !== undefined)
        .map(async (blogPost) => {
          const nonNullBlogPost = blogPost as NonNullable<typeof blogPost>
          const blogPostConceptIds = nonNullBlogPost.contentfulMetadata.concepts.map((concept) => ({ id: concept?.id }))

          if (!Boolean(blogPostConceptIds.length)) return null
          const filteredBlogPostConceptIds = blogPostConceptIds
            .filter((concept): concept is { id: string } => typeof concept.id === 'string')
            .map((concept) => concept.id)
          const { categoryName, regionName, areaName, prefectureName } = await extractTaxonomyInfo(filteredBlogPostConceptIds)

          const href = generateHref({ categoryName, regionName, areaName, prefectureName, slug: nonNullBlogPost.slug as string })
          if (href === '/articles/') return null

          return {
            ...nonNullBlogPost,
            href
          }
        })
    )
  ).filter((blogPost): blogPost is BlogPostWithHref => blogPost !== null)

  return (
    <BlogPostsClientContainer
      blogPosts={blogPostsWithHref}
      title={title}
      viewAllButtonText={viewAllButtonText}
      viewAllHref={viewAllHref}
      total={total}
      currentPage={currentPage}
      totalPages={totalPages}
      locale={locale}
      isBookmarksPage={isBookmarksPage}
      noBlogPostsTitle={noBlogPostsTitle}
      noBlogPostsMessage={noBlogPostsMessage}
    />
  )
}
