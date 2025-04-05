import { CONCEPT_SCHEME } from '@/constants'
import { getConceptSchemes } from '@/lib/contentful/get-concept-schemes'
import { getConcepts } from '@/lib/contentful/get-concepts'
import { formatNameForUrl } from '@/utils/url-helpers'

type TaxonomyResult = {
  categoryName: string
  rawCategoryName: string
  regionName: string
  areaName: string
  prefectureName: string
}

/**
 * 記事のコンセプトIDからタクソノミー情報を抽出する
 * @param articleConceptIds 記事に関連付けられたコンセプトID
 * @returns categoryName, rawCategoryName, regionName, areaName, prefectureName
 */
export const extractTaxonomyInfo = async (articleConceptIds: string[]): Promise<TaxonomyResult> => {
  // コンセプトとコンセプトスキームを取得
  const concepts = await getConcepts()
  const conceptSchemes = await getConceptSchemes()

  // カテゴリースキームと地域スキームを見つける
  const categoryScheme = conceptSchemes.find((scheme) => scheme.label === CONCEPT_SCHEME.CATEGORIES)
  const regionScheme = conceptSchemes.find((scheme) => scheme.label === CONCEPT_SCHEME.REGIONS)

  // 地域情報の抽出
  const regionConceptIds = regionScheme?.topConceptIds || []
  const regionConceptId = articleConceptIds.find((conceptId) => regionConceptIds.includes(conceptId))
  const regionName = concepts.find((concept) => concept.id === regionConceptId)?.label.toLowerCase() ?? ''

  // エリア情報の抽出
  const areaConceptIds = concepts.filter((concept) => concept.upperLevelConceptIds.some((id) => regionConceptIds.includes(id))).map((concept) => concept.id)
  const areaConceptId = articleConceptIds.find((conceptId) => areaConceptIds.includes(conceptId))
  const areaName = formatNameForUrl(concepts.find((concept) => concept.id === areaConceptId)?.label.toLowerCase() ?? '')

  // 県情報の抽出
  const prefectureConceptIds = concepts.filter((concept) => concept.upperLevelConceptIds.some((id) => areaConceptIds.includes(id))).map((concept) => concept.id)
  const prefectureConceptId = articleConceptIds.find((conceptId) => prefectureConceptIds.includes(conceptId))
  const prefectureName = concepts.find((concept) => concept.id === prefectureConceptId)?.label.toLowerCase() ?? ''

  // カテゴリー情報の抽出
  const categoryConceptIds = categoryScheme?.topConceptIds || []
  const categoryConceptId = articleConceptIds.find((conceptId) => categoryConceptIds.includes(conceptId)) || articleConceptIds[0]
  const rawCategoryName = concepts.find((concept) => concept.id === categoryConceptId)?.label.toLowerCase() ?? ''
  const categoryName = formatNameForUrl(rawCategoryName)

  return {
    categoryName,
    rawCategoryName,
    regionName,
    areaName,
    prefectureName
  }
}
