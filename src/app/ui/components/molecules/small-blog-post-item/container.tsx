import { SmallBlogPostItem } from '@/app/ui/components/molecules/small-blog-post-item/presenter'
import type { PageBlogPost } from '@/generated/graphql'
import { extractTaxonomyInfo } from '@/utils/taxonomy-helper'
import { generateHref } from '@/utils/url-helpers'
import type { FC } from 'react'

type Props = PageBlogPost & { viewCount: number; viewCountText: string }

export const SmallBlogPostItemContainer: FC<Props> = async ({ slug, contentfulMetadata, ...props }) => {
  if (!slug) return null
  const articleConceptIds = contentfulMetadata.concepts.map((concept) => ({ id: concept?.id }))
  if (!Boolean(articleConceptIds.length)) return null
  const filteredArticleConceptIds = articleConceptIds
    .filter((concept): concept is { id: string } => typeof concept.id === 'string')
    .map((concept) => concept.id)

  const { categoryName, regionName, areaName, prefectureName } = await extractTaxonomyInfo(filteredArticleConceptIds)
  const href = generateHref({ categoryName, regionName, areaName, prefectureName, slug })
  if (href === '/articles/') return null
  return <SmallBlogPostItem href={href} slug={slug} {...props} />
}
