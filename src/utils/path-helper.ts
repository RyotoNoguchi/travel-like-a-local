/* eslint-disable no-console */
import { CONCEPT_SCHEME } from '@/constants' // Added
import { getConceptSchemes } from '@/lib/contentful/get-concept-schemes' // Added
import { getConcepts } from '@/lib/contentful/get-concepts'
import { formatNameForUrl } from '@/utils/url-helpers'

/**
 * URLパスからスラッグとカテゴリー情報を抽出する
 */
export const parseArticlePath = async (path: string[] = []) => {
  if (!path || path.length === 0) {
    return { slug: '', category: '', region: '', area: '', prefecture: '' }
  }

  // パスセグメントを取得
  const pathSegments = [...path]

  // デフォルト値
  let category = ''
  let region = ''
  let area = ''
  let prefecture = ''
  let slug = ''

  // コンセプトとコンセプトスキームを取得
  const [concepts, conceptSchemes] = await Promise.all([getConcepts(), getConceptSchemes()]) // Fetch both

  // カテゴリスキームとIDを取得
  const categoryScheme = conceptSchemes.find((scheme) => scheme.label === CONCEPT_SCHEME.CATEGORIES)
  const categoryConceptIds = categoryScheme?.topConceptIds || []

  // 最後のセグメントがslugかどうかを判定
  const lastSegment = pathSegments[pathSegments.length - 1]

  // 最後のセグメントがコンセプトに含まれているか確認
  const isLastSegmentConcept = concepts.some((concept) => formatNameForUrl(concept.label.toLowerCase()) === lastSegment)

  // 最初のセグメントがカテゴリかどうかを判定するヘルパー関数
  const isFirstSegmentCategory = (segments: string[]): boolean => {
    if (segments.length === 0) return false
    const firstSegmentConcept = concepts.find((concept) => formatNameForUrl(concept.label.toLowerCase()) === segments[0])
    return firstSegmentConcept ? categoryConceptIds.includes(firstSegmentConcept.id) : false
  }

  // 最後のセグメントがコンセプトの場合は記事一覧ページ、そうでない場合は記事詳細ページ
  if (isLastSegmentConcept) {
    // 記事一覧ページの場合のパス解析
    const firstIsCategory = isFirstSegmentCategory(pathSegments)

    if (firstIsCategory) {
      // 最初のセグメントがカテゴリの場合 (Current Logic)
      if (pathSegments.length >= 1) category = pathSegments[0]
      if (pathSegments.length >= 2) region = pathSegments[1]
      if (pathSegments.length >= 3) area = pathSegments[2]
      if (pathSegments.length >= 4) prefecture = pathSegments[3]
    } else {
      // 最初のセグメントがカテゴリでない場合 (Shifted Logic)
      if (pathSegments.length >= 1) region = pathSegments[0]
      if (pathSegments.length >= 2) area = pathSegments[1]
      if (pathSegments.length >= 3) prefecture = pathSegments[2]
      // Note: Max 3 geographical levels assumed if no category
    }
  } else {
    // 記事詳細ページの場合のパス解析
    slug = pathSegments.pop() || '' // 最後の要素をslugとして取得
    const firstIsCategory = isFirstSegmentCategory(pathSegments) // Check remaining segments

    if (firstIsCategory) {
      // 最初のセグメントがカテゴリの場合 (Current Logic)
      if (pathSegments.length >= 1) category = pathSegments[0]
      if (pathSegments.length >= 2) region = pathSegments[1]
      if (pathSegments.length >= 3) area = pathSegments[2]
      if (pathSegments.length >= 4) prefecture = pathSegments[3]
    } else {
      // 最初のセグメントがカテゴリでない場合 (Shifted Logic)
      if (pathSegments.length >= 1) region = pathSegments[0]
      if (pathSegments.length >= 2) area = pathSegments[1]
      if (pathSegments.length >= 3) prefecture = pathSegments[2]
      // Note: Max 3 geographical levels assumed if no category
    }
  }
  return {
    slug,
    category,
    region,
    area,
    prefecture
  }
}

/**
 * Constructs the href for a blog post given its slug and locale.
 * Assumes a simple /articles/[slug] structure for now.
 * Adjust if the actual URL structure is more complex (e.g., includes categories/regions).
 */
export const getArticleHref = (slug: string | null | undefined): string => {
  if (!slug) {
    console.warn('Attempted to generate article href with missing slug.')
    return `/articles` // Fallback URL
  }
  return `/articles/${slug}`
}
