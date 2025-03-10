import { ArticleListItem } from '@/app/ui/components/molecules/article-list-item/presenter'
import { CONCEPT_SCHEME } from '@/constants'
import type { PageBlogPost } from '@/generated/graphql'
import { getConceptSchemes } from '@/lib/contentful/get-concept-schemes'
import { getConcepts } from '@/lib/contentful/get-concepts'
import { formatNameForUrl, generateHref } from '@/utils/url-helpers'
import type { FC } from 'react'

type Props = PageBlogPost

export const ArticleListItemContainer: FC<Props> = async ({ slug, contentfulMetadata, ...props }) => {
  if (slug === null || slug === undefined) return null
  const articleConceptIds = contentfulMetadata.concepts.map((concept) => ({ id: concept?.id }))

  // If there is no concept (Taxonomy), return null because it will be an error when clicking the article without category as it doesn't create a proper href to open the page whose path is `/articles/${categoryName}/${slug}`
  if (!Boolean(articleConceptIds.length)) return null

  const concepts = await getConcepts()
  const conceptSchemes = await getConceptSchemes()
  const categoryScheme = conceptSchemes.find((scheme) => scheme.label === CONCEPT_SCHEME.CATEGORIES)
  const regionScheme = conceptSchemes.find((scheme) => scheme.label === CONCEPT_SCHEME.REGIONS)
  const regionConceptIds = regionScheme?.topConceptIds || []
  const regionConceptId = articleConceptIds.find((article) => regionConceptIds.includes(article.id ?? ''))?.id
  const regionName = concepts.find((concept) => concept.id === regionConceptId)?.label.toLowerCase() ?? ''
  const areaConceptIds = concepts.filter((concept) => concept.upperLevelConceptIds.some((id) => regionConceptIds.includes(id))).map((concept) => concept.id)
  const areaConceptId = articleConceptIds.find((articleConceptId) => areaConceptIds.includes(articleConceptId.id ?? ''))?.id
  const areaName = formatNameForUrl(concepts.find((concept) => concept.id === areaConceptId)?.label.toLowerCase() ?? '')
  const prefectureConceptIds = concepts.filter((concept) => concept.upperLevelConceptIds.some((id) => areaConceptIds.includes(id))).map((concept) => concept.id)
  const prefectureConceptId = articleConceptIds.find((articleConceptId) => prefectureConceptIds.includes(articleConceptId.id ?? ''))?.id
  const prefectureName = concepts.find((concept) => concept.id === prefectureConceptId)?.label.toLowerCase() ?? ''
  const categoryConceptIds = categoryScheme?.topConceptIds || []
  const categoryConceptId = articleConceptIds.find((article) => categoryConceptIds.includes(article.id ?? ''))?.id || articleConceptIds[0]?.id // カテゴリーが見つからない場合は最初のコンセプトを使用
  const rawCategoryName = concepts.find((concept) => concept.id === categoryConceptId)?.label.toLowerCase() ?? ''
  const categoryName = formatNameForUrl(rawCategoryName)

  const href = generateHref({ categoryName, regionName, areaName, prefectureName, slug })
  if (href === '/articles/') return null

  return <ArticleListItem categoryName={categoryName} href={href} contentfulMetadata={contentfulMetadata} slug={slug} {...props} />
}
