import { createApolloClient } from '@/apolloClient'
import { CONCEPT_SCHEME, type LANGUAGE, LOCALE_CODE_MAP } from '@/constants'
import type { GetFeaturedBlogPostsQuery, GetFeaturedBlogPostsQueryVariables } from '@/generated/graphql'
import { GET_FEATURED_BLOG_POSTS_QUERY } from '@/graphql/query'
import { loadConcepts, loadConceptSchemes } from '@/utils/concept-helper'
import { formatNameForUrl, generateHref } from '@/utils/url-helpers'
import type { FC } from 'react'
import { Carousel } from './presenter'

type Props = {
  width: number
  height: number
  locale: LANGUAGE
}

export const CarouselContainer: FC<Props> = async ({ width, height, locale }) => {
  const client = createApolloClient()
  const { data } = await client.query<GetFeaturedBlogPostsQuery, GetFeaturedBlogPostsQueryVariables>({
    query: GET_FEATURED_BLOG_POSTS_QUERY,
    variables: {
      locale: LOCALE_CODE_MAP[locale]
    }
  })
  const concepts = await loadConcepts()
  const conceptSchemes = await loadConceptSchemes()
  const blogs = data.pageBlogPostCollection?.items
    .map((item) => {
      const contentfulMetadata = item?.contentfulMetadata
      const articleConceptIds = contentfulMetadata?.concepts.map((concept) => ({ id: concept?.id }))

      const categoryScheme = conceptSchemes.find((scheme) => scheme.label === CONCEPT_SCHEME.CATEGORIES)
      const regionScheme = conceptSchemes.find((scheme) => scheme.label === CONCEPT_SCHEME.REGIONS)
      const regionConceptIds = regionScheme?.topConceptIds || []
      const regionConceptId = articleConceptIds?.find((article) => regionConceptIds.includes(article.id ?? ''))?.id
      const regionName = concepts.find((concept) => concept.id === regionConceptId)?.label.toLowerCase() ?? ''

      const areaConceptIds = concepts.filter((concept) => concept.upperLevelConceptIds.some((id) => regionConceptIds.includes(id))).map((concept) => concept.id)
      const areaConceptId = articleConceptIds?.find((articleConceptId) => areaConceptIds.includes(articleConceptId.id ?? ''))?.id
      const areaName = formatNameForUrl(concepts.find((concept) => concept.id === areaConceptId)?.label.toLowerCase() ?? '')

      const prefectureConceptIds = concepts
        .filter((concept) => concept.upperLevelConceptIds.some((id) => areaConceptIds.includes(id)))
        .map((concept) => concept.id)
      const prefectureConceptId = articleConceptIds?.find((articleConceptId) => prefectureConceptIds.includes(articleConceptId.id ?? ''))?.id
      const prefectureName = concepts.find((concept) => concept.id === prefectureConceptId)?.label.toLowerCase() ?? ''

      const categoryConceptIds = categoryScheme?.topConceptIds || []
      const categoryConceptId = articleConceptIds?.find((article) => categoryConceptIds.includes(article.id ?? ''))?.id || articleConceptIds?.[0]?.id // カテゴリーが見つからない場合は最初のコンセプトを使用
      const rawCategoryName = concepts.find((concept) => concept.id === categoryConceptId)?.label.toLowerCase() ?? ''
      const categoryName = formatNameForUrl(rawCategoryName)

      const href = generateHref({ categoryName, regionName, areaName, prefectureName, slug: item?.slug ?? '' })

      return {
        slug: item?.slug ?? '',
        href,
        featuredImage: {
          url: item?.featuredImage?.url ? `${item?.featuredImage?.url}?w=${width}&h=${height}&fit=fill` : '',
          title: item?.featuredImage?.title ?? ''
        }
      }
    })
    .filter((blog) => blog.href !== '/articles/' && blog.slug !== '')

  if (!blogs) return null

  return <Carousel blogs={blogs} />
}
