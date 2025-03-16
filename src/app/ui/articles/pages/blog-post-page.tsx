import { BlogPostContainer } from '@/app/ui/articles/components/blog-post/container'
import { ArticleLayout } from '@/app/ui/articles/layout/article-layout'
import { type LANGUAGE } from '@/constants'
import type { GetBlogPostBySlugQuery } from '@/generated/graphql'
import type { BreadcrumbItem } from '@/types/breadcrumbs'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  breadcrumbs: BreadcrumbItem[]
  slug: string
  blogPost: NonNullable<GetBlogPostBySlugQuery['pageBlogPostCollection']>['items'][0]
}

export const BlogPostDetailPage: FC<Props> = async ({ locale, breadcrumbs, slug, blogPost }) => {
  const articleT = await getTranslations({ locale, namespace: 'Article' })
  const popularBlogPostsT = await getTranslations({ locale, namespace: 'PopularArticleList' })

  return (
    <ArticleLayout locale={locale} breadcrumbs={breadcrumbs} popularArticlesTitle={popularBlogPostsT('title')} viewCountText={articleT('views')}>
      <BlogPostContainer locale={locale} slug={slug} blogPost={blogPost} />
    </ArticleLayout>
  )
}
