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

  // 最後のセグメントがslugかどうかを判定
  const concepts = await getConcepts()
  const lastSegment = pathSegments[pathSegments.length - 1]

  // 最後のセグメントがコンセプトに含まれているか確認
  const isLastSegmentConcept = concepts.some((concept) => formatNameForUrl(concept.label.toLowerCase()) === lastSegment)

  // 最後のセグメントがコンセプトの場合は記事一覧ページ、そうでない場合は記事詳細ページ
  if (isLastSegmentConcept) {
    // 記事一覧ページの場合のパス解析
    if (pathSegments.length >= 1) {
      category = pathSegments[0]
    }
    if (pathSegments.length >= 2) {
      region = pathSegments[1]
    }
    if (pathSegments.length >= 3) {
      area = pathSegments[2]
    }
    if (pathSegments.length >= 4) {
      prefecture = pathSegments[3]
    }
  } else {
    // 記事詳細ページの場合のパス解析
    slug = pathSegments.pop() || '' // 最後の要素をslugとして取得

    if (pathSegments.length >= 1) {
      category = pathSegments[0]
    }
    if (pathSegments.length >= 2) {
      region = pathSegments[1]
    }
    if (pathSegments.length >= 3) {
      area = pathSegments[2]
    }
    if (pathSegments.length >= 4) {
      prefecture = pathSegments[3]
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
