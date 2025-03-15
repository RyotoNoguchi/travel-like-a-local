import { BlogPost } from '@/app/ui/blog-post/presenter'
import { REDIS_KEYS, type LANGUAGE } from '@/constants'
import type { ListArticleQuery } from '@/generated/graphql'
import { Redis } from '@upstash/redis'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  slug: string
  blogPost: NonNullable<ListArticleQuery['pageBlogPostCollection']>['items'][0]
}

export const BlogPostContainer: FC<Props> = async ({ locale, slug, blogPost }) => {
  if (!blogPost) notFound()
  const popularBlogPostsT = await getTranslations({ locale, namespace: 'PopularArticleList' })
  const articleT = await getTranslations({ locale, namespace: 'Article' })
  const redis = Redis.fromEnv()
  const views = (await redis.get<number>([REDIS_KEYS.PAGEVIEWS, REDIS_KEYS.NAMESPACE, slug].join(':'))) ?? 0

  return (
    <BlogPost
      locale={locale}
      slug={slug}
      article={blogPost}
      views={{ count: views, title: articleT('views') }}
      popularArticleListTitle={popularBlogPostsT('title')}
    />
  )
}
