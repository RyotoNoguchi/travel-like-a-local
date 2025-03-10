import { Author } from '@/app/ui/components/atoms/author'
import { DateComponent } from '@/app/ui/components/atoms/date'
import { ImageLink } from '@/app/ui/components/atoms/icons/image-link'
import { TagList } from '@/app/ui/components/molecules/tag-list'
import { formatNameForUrl, generateHref } from '@/app/utils/url-helpers'
import { CONCEPT_SCHEME } from '@/constants'
import type { PageBlogPost } from '@/generated/graphql'
import { Link } from '@/i18n/routing'
import { getConceptSchemes } from '@/lib/contentful/get-concept-schemes'
import { getConcepts } from '@/lib/contentful/get-concepts'
import { type FC } from 'react'

type Props = PageBlogPost

export const ArticleListItem: FC<Props> = async ({ author, featuredImage, title, publishedDate, slug, contentfulMetadata, seoFields }) => {
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

  return (
    <li className="flex flex-col sm:flex-row gap-2 w-full item-center sm:justify-start sm:gap-3 max-w-[300px] sm:max-w-[640px] lg:max-w-[800px]">
      <ImageLink
        className="rounded-2xl w-[300px] h-[200px] sm:max-w-[216px] sm:max-h-[144px]"
        href={`/articles/${categoryName}/${slug}`}
        url={featuredImage?.url ?? ''}
        alt={featuredImage?.title ?? ''}
        width={300}
        height={200}
        wrapperClassName="sm:max-w-[216px]"
      />
      <div className="flex flex-col gap-1 justify-between w-full">
        <div className="flex flex-col gap-1">
          <Link href={`/articles/${categoryName}/${slug}`}>
            <h3 className="text-xl font-bold leading-none hover-text-primary">{title}</h3>
          </Link>
          <p className="hidden sm:block text-md text-gray-500">{seoFields?.pageDescription}</p>
          {Array.isArray(contentfulMetadata.tags) && contentfulMetadata.tags.length > 0 && <TagList tags={contentfulMetadata.tags} />}
        </div>
        <div className="flex gap-2 sm:justify-end">
          {author ? <Author author={author} /> : null}
          <DateComponent date={publishedDate as string} />
        </div>
      </div>
    </li>
  )
}
