import type { GetBlogPostsQuery, PageBlogPost } from '@/generated/graphql'
import { extractTaxonomyInfo } from './taxonomy-helper'
import { generateHref } from './url-helpers'

export const getBlogPostsWithHref = async (
  blogPosts: NonNullable<GetBlogPostsQuery['pageBlogPostCollection']>['items']
): Promise<(NonNullable<GetBlogPostsQuery['pageBlogPostCollection']>['items'][0] & { href: string })[]> => {
  const blogPostsWithHref = await Promise.all(
    blogPosts
      .filter((blogPost): blogPost is PageBlogPost => blogPost !== null)
      .filter((blogPost) => blogPost !== null)
      .map(async (post) => {
        const blogPostConceptIds = post.contentfulMetadata.concepts.map((concept) => concept?.id ?? '')
        const { categoryName, regionName, areaName, prefectureName } = await extractTaxonomyInfo(blogPostConceptIds)
        const href = generateHref({ categoryName, regionName, areaName, prefectureName, slug: post.slug as string })
        return {
          ...post,
          href
        }
      })
  )
  return blogPostsWithHref
}
