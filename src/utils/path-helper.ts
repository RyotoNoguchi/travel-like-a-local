/**
 * URLパスからスラッグとカテゴリー情報を抽出する
 */
export const parseArticlePath = (path: string[] = []) => {
  if (!path || path.length === 0) {
    return { slug: '', category: '', region: '', area: '', prefecture: '' }
  }

  // 最後の要素がスラッグ
  const slug = path[path.length - 1]

  // 残りの要素を解析
  const pathSegments = path.slice(0, -1)

  // デフォルト値
  let category = ''
  let region = ''
  let area = ''
  let prefecture = ''

  // パスの長さに応じて解析
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

  return {
    slug,
    category,
    region,
    area,
    prefecture
  }
}
