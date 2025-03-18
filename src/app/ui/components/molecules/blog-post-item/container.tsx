import { BlogPostItem } from '@/app/ui/components/molecules/blog-post-item/presenter'
import type { GetBlogPostsQuery } from '@/generated/graphql'
import { extractTaxonomyInfo } from '@/utils/taxonomy-helper'
import { generateHref } from '@/utils/url-helpers'
import type { FC } from 'react'

type Props = NonNullable<NonNullable<GetBlogPostsQuery['pageBlogPostCollection']>['items'][0]>

export const BlogPostItemContainer: FC<Props> = async ({ slug, contentfulMetadata, ...props }) => {
  if (slug === null || slug === undefined) return null
  const articleConceptIds = contentfulMetadata.concepts.map((concept) => ({ id: concept?.id }))

  // If there is no concept (Taxonomy), return null because it will be an error when clicking the article without category as it doesn't create a proper href to open the page whose path is `/articles/${categoryName}/${slug}`
  if (!Boolean(articleConceptIds.length)) return null
  const filteredArticleConceptIds = articleConceptIds
    .filter((concept): concept is { id: string } => typeof concept.id === 'string')
    .map((concept) => concept.id)
  const { categoryName, regionName, areaName, prefectureName } = await extractTaxonomyInfo(filteredArticleConceptIds)

  const href = generateHref({ categoryName, regionName, areaName, prefectureName, slug })
  if (href === '/articles/') return null
  return <BlogPostItem href={href} contentfulMetadata={contentfulMetadata} slug={slug} {...props} />
}
