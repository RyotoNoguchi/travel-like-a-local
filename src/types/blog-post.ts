import type { GetBlogPostsQuery } from '@/generated/graphql'

export type BlogPostWithHref = NonNullable<NonNullable<GetBlogPostsQuery['pageBlogPostCollection']>['items'][0]> & {
  href: string
}
