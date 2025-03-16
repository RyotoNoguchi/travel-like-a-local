import { BlogPost } from '@/app/ui/components/organisms/blog-post/presenter'
import { REDIS_KEYS, type LANGUAGE } from '@/constants'
import type { GetBlogPostBySlugQuery } from '@/generated/graphql'
import { Redis } from '@upstash/redis'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  slug: string
  blogPost: NonNullable<GetBlogPostBySlugQuery['pageBlogPostCollection']>['items'][0]
}

export const BlogPostContainer: FC<Props> = async ({ locale, slug, blogPost }) => {
  const popularBlogPostsT = await getTranslations({ locale, namespace: 'PopularArticleList' })
  const articleT = await getTranslations({ locale, namespace: 'Article' })
  const redis = Redis.fromEnv()
  const views = (await redis.get<number>([REDIS_KEYS.PAGEVIEWS, REDIS_KEYS.NAMESPACE, slug].join(':'))) ?? 0

  return (
    <BlogPost
      locale={locale}
      slug={slug}
      blogPost={blogPost}
      views={{ count: views, title: articleT('views') }}
      popularArticleListTitle={popularBlogPostsT('title')}
    />
  )
}
