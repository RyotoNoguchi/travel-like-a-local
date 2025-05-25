import { ArticleLayout } from '@/app/ui/articles/layout/article-layout'
import { BlogPostContainer } from '@/app/ui/components/organisms/blog-post/container'
import { type LANGUAGE } from '@/constants'
import type { BlogPostWithHref } from '@/types/blog-post'
import type { BreadcrumbItem } from '@/types/breadcrumbs'
import { notFound } from 'next/navigation'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  breadcrumbs: BreadcrumbItem[]
  slug: string
  blogPost: BlogPostWithHref
}

export const BlogPostDetailPage: FC<Props> = ({ locale, breadcrumbs, slug, blogPost }) => {
  if (!blogPost) notFound()

  return (
    <ArticleLayout locale={locale} breadcrumbs={breadcrumbs}>
      <BlogPostContainer locale={locale} slug={slug} blogPost={blogPost} />
    </ArticleLayout>
  )
}
