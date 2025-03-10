import { ARTICLE_PATH } from '@/constants'
import type { PageBlogPost } from '@/generated/graphql'

type BreadcrumbItem = {
  label: string
  href: string
}

type Props = {
  path: string[]
  article: Pick<PageBlogPost, '__typename' | 'slug' | 'title' | 'contentfulMetadata'>
  category?: string
  region?: string
  area?: string
  prefecture?: string
}

export const generateBreadcrumbs = ({ path, article, category, region, area, prefecture }: Props): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = []

  // ホームページ
  breadcrumbs.push({
    label: 'Home',
    href: `/`
  })

  // 記事一覧ページ
  breadcrumbs.push({
    label: 'Articles',
    href: `/${ARTICLE_PATH}`
  })

  // カテゴリーページ（存在する場合）
  if (category) {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
    breadcrumbs.push({
      label: formattedCategory,
      href: `/${ARTICLE_PATH}/${category}`
    })

    // 地域ページ（カテゴリーと地域が存在する場合）
    if (region) {
      const formattedRegion = region.charAt(0).toUpperCase() + region.slice(1).replace(/-/g, ' ')
      breadcrumbs.push({
        label: formattedRegion,
        href: `/${ARTICLE_PATH}/${category}/${region}`
      })

      // エリアページ（カテゴリー、地域、エリアが存在する場合）
      if (area) {
        const formattedArea = area.charAt(0).toUpperCase() + area.slice(1).replace(/-/g, ' ')
        breadcrumbs.push({
          label: formattedArea,
          href: `/${ARTICLE_PATH}/${category}/${region}/${area}`
        })

        // 県ページ（カテゴリー、地域、エリア、県が存在する場合）
        if (prefecture) {
          const formattedPrefecture = prefecture.charAt(0).toUpperCase() + prefecture.slice(1).replace(/-/g, ' ')
          breadcrumbs.push({
            label: formattedPrefecture,
            href: `/${ARTICLE_PATH}/${category}/${region}/${area}/${prefecture}`
          })
        }
      }
    }
  }
  // カテゴリーが存在せず、地域が存在する場合
  else if (region) {
    const formattedRegion = region.charAt(0).toUpperCase() + region.slice(1).replace(/-/g, ' ')
    breadcrumbs.push({
      label: formattedRegion,
      href: `/${ARTICLE_PATH}/${region}`
    })

    // エリアページ（地域とエリアが存在する場合）
    if (area) {
      const formattedArea = area.charAt(0).toUpperCase() + area.slice(1).replace(/-/g, ' ')
      breadcrumbs.push({
        label: formattedArea,
        href: `/${ARTICLE_PATH}/${region}/${area}`
      })

      // 県ページ（地域、エリア、県が存在する場合）
      if (prefecture) {
        const formattedPrefecture = prefecture.charAt(0).toUpperCase() + prefecture.slice(1).replace(/-/g, ' ')
        breadcrumbs.push({
          label: formattedPrefecture,
          href: `/${ARTICLE_PATH}/${region}/${area}/${prefecture}`
        })
      }
    }
  }

  // 記事ページ（最後のパンくず）
  breadcrumbs.push({
    label: article.title ?? '',
    href: `/${ARTICLE_PATH}/${path.join('/')}`
  })

  return breadcrumbs
}
