import type { GetBlogPostsQuery, TaxonomyConcept } from '@/generated/graphql'
import type { Category } from '@/types/category'
import { formatNameForUrl } from '@/utils/url-helpers'

type CategoryInfo = {
  id: string
  categoryName: string
}

/**
 * スラッグからカテゴリー情報を抽出する
 */
export const extractCategoryNameBySlug = (categories: Category[], slug: string): CategoryInfo => {
  const foundCategory = categories
    .map((category) => ({
      id: category.id,
      categoryName: category.translatedLabel,
      slug: formatNameForUrl(category.label).toLowerCase()
    }))
    .find((category) => category.slug === slug)

  return {
    id: foundCategory?.id ?? '',
    categoryName: foundCategory?.categoryName || ''
  }
}

/**
 * ブログ記事をカテゴリごとに分類する
 */
export const categorizeBlogPosts = (
  blogPosts: (NonNullable<GetBlogPostsQuery['pageBlogPostCollection']>['items'][0] & { href: string })[],
  categories: Category[]
) => {
  const categoryIdMap: Record<string, string> = {}
  categories.forEach((category) => {
    const formattedName = formatNameForUrl(category.label).toLowerCase()
    categoryIdMap[category.id] = formattedName
  })

  const result: Record<string, typeof blogPosts> = {}

  categories.forEach((category) => {
    const formattedName = formatNameForUrl(category.label).toLowerCase()
    result[formattedName] = []
  })

  // ブログ記事を適切なカテゴリに振り分ける
  blogPosts.forEach((post) => {
    if (post) {
      const conceptIds = post.contentfulMetadata.concepts
        .filter((concept): concept is TaxonomyConcept => concept !== null)
        .map((concept) => concept?.id ?? '')
        .filter(Boolean)

      // 各コンセプトIDに対して
      conceptIds.forEach((conceptId) => {
        // カテゴリIDとして存在する場合
        if (categoryIdMap[conceptId]) {
          const formattedCategoryName = categoryIdMap[conceptId]
          result[formattedCategoryName].push(post)
        }
      })
    }
  })

  return result
}
