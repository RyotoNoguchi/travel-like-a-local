import { ArticleLayout } from '@/app/ui/articles/layout/article-layout'
import { BlogPostsContainer } from '@/app/ui/components/organisms/blog-posts/container'
import { type LANGUAGE } from '@/constants'
import type { BreadcrumbItem } from '@/types/breadcrumbs'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  breadcrumbs: BreadcrumbItem[]
  category?: string
  region?: string
  area?: string
  prefecture?: string
  path: string[]
}

export const BlogPostListPage: FC<Props> = async ({ locale, breadcrumbs, category, region, area, prefecture, path }) => {
  const articleT = await getTranslations({ locale, namespace: 'Article' })
  const popularBlogPostsT = await getTranslations({ locale, namespace: 'PopularArticleList' })
  const blogPostsT = await getTranslations({ locale, namespace: 'ArticleList' })

  const getTitle = () => {
    if (prefecture) {
      return blogPostsT('articlesOf', { region: prefecture.charAt(0).toUpperCase() + prefecture.slice(1), category: '' })
    } else if (area) {
      return blogPostsT('articlesOf', { region: area.charAt(0).toUpperCase() + area.slice(1), category: '' })
    } else if (region) {
      return blogPostsT('articlesOf', { region: region.charAt(0).toUpperCase() + region.slice(1), category: '' })
    } else if (category) {
      return blogPostsT('articlesOf', { region: '', category: category.charAt(0).toUpperCase() + category.slice(1) })
    }
    return blogPostsT('title')
  }

  return (
    <ArticleLayout locale={locale} breadcrumbs={breadcrumbs} popularArticlesTitle={popularBlogPostsT('title')} viewCountText={articleT('views')}>
      <BlogPostsContainer title={getTitle()} locale={locale} category={category} region={region} area={area} prefecture={prefecture} path={path} />
    </ArticleLayout>
  )
}
