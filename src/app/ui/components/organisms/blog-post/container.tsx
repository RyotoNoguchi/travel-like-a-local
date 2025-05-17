import { BlogPost } from '@/app/ui/components/organisms/blog-post/presenter'
import { REDIS_KEYS, type LANGUAGE } from '@/constants'
import type { GetBlogPostBySlugQuery } from '@/generated/graphql'
import { getBlogPostsWithHref } from '@/utils/blog-post-helper'
import { Redis } from '@upstash/redis'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  slug: string
  blogPost: NonNullable<GetBlogPostBySlugQuery['pageBlogPostCollection']>['items'][0] & { href: string }
}

export const BlogPostContainer: FC<Props> = async ({ locale, slug, blogPost }) => {
  const t = await getTranslations({ locale })
  const redis = Redis.fromEnv()
  const views = (await redis.get<number>([REDIS_KEYS.PAGEVIEWS, REDIS_KEYS.NAMESPACE, slug].join(':'))) ?? 0
  const relatedPosts = blogPost.relatedBlogPostsCollection?.items ? (await getBlogPostsWithHref(blogPost.relatedBlogPostsCollection.items)).filter(Boolean) : []

  return (
    <BlogPost
      locale={locale}
      slug={slug}
      blogPost={blogPost}
      views={{ count: views, title: t('Article.views') }}
      popularArticleListTitle={t('PopularArticleList.title')}
      relatedPosts={relatedPosts}
    />
  )
}
