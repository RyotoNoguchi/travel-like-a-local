/**
 * 文字列をURL安全なスラッグ形式に変換する
 */
export const formatNameForUrl = (name: string): string => {
  return name
    .replace(/\s+/g, '-') // スペースをハイフンに変換
    .replace(/&/g, 'and') // &をandに変換
    .replace(/'/g, '') // アポストロフィを削除
    .replace(/[^\w-]/g, '') // 英数字、ハイフン以外の文字を削除
    .replace(/-+/g, '-') // 連続するハイフンを単一のハイフンに変換
    .replace(/^-|-$/g, '') // 先頭と末尾のハイフンを削除
}

/**
 * 記事のURLパスを生成する
 */
export const generateHref = (params: { categoryName?: string; regionName?: string; areaName?: string; prefectureName?: string; slug: string }): string => {
  const { categoryName, regionName, areaName, prefectureName, slug } = params
  const formattedCategoryName = categoryName ? formatNameForUrl(categoryName) : ''
  const formattedRegionName = regionName ? formatNameForUrl(regionName) : ''
  const formattedAreaName = areaName ? formatNameForUrl(areaName) : ''
  const formattedPrefectureName = prefectureName ? formatNameForUrl(prefectureName) : ''

  let articlePath = '/articles/'
  // カテゴリーが存在する場合
  if (formattedCategoryName) {
    articlePath += `${formattedCategoryName}/`

    // カテゴリーとリージョンが存在する場合
    if (formattedRegionName) {
      articlePath += `${formattedRegionName}/`

      // カテゴリー、リージョン、エリアが存在する場合
      if (formattedAreaName) {
        articlePath += `${formattedAreaName}/`

        // カテゴリー、リージョン、エリア、県が存在する場合
        if (formattedPrefectureName) {
          articlePath += `${formattedPrefectureName}/`
        }
      }
    }
  }
  // カテゴリーが存在せず、リージョンが存在する場合
  else if (formattedRegionName) {
    articlePath += `${formattedRegionName}/`

    // リージョンとエリアが存在する場合
    if (formattedAreaName) {
      articlePath += `${formattedAreaName}/`

      // リージョン、エリア、県が存在する場合
      if (formattedPrefectureName) {
        articlePath += `${formattedPrefectureName}/`
      }
    }
  }

  // 最後にスラッグを追加
  articlePath += slug

  return articlePath
}
