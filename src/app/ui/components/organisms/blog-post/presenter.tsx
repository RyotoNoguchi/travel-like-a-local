import { COLORS } from '@/app/ui/colors'
import { ReportView } from '@/app/ui/components/atoms/anaylytics/viewcount'
import { DateComponent } from '@/app/ui/components/atoms/date'
import { CalendarIcon } from '@/app/ui/components/atoms/icons/calendar-icon'
import { EyeIcon } from '@/app/ui/components/atoms/icons/eye-icon'
import { BlogPostCard } from '@/app/ui/components/molecules/blog-post-card'
import { BookmarkButtonContainer } from '@/app/ui/components/molecules/bookmark-button/container'
import { RichText } from '@/app/ui/components/molecules/rich-text'
import { TableOfContents } from '@/app/ui/components/molecules/table-of-contents'
import { type LANGUAGE } from '@/constants'
import type { GetBlogPostBySlugQuery } from '@/generated/graphql'
import type { BlogPostWithHref } from '@/types/blog-post'
import classNames from 'classnames'
import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  slug: string
  blogPost: NonNullable<GetBlogPostBySlugQuery['pageBlogPostCollection']>['items'][0] & { href: string }
  views: {
    count: number
    title: string
  }
  popularArticleListTitle: string
  relatedPosts: BlogPostWithHref[]
}

export const BlogPost: FC<Props> = async ({ slug, blogPost, views, popularArticleListTitle, relatedPosts }) => (
  <div className={classNames('w-full flex justify-center')}>
    <ReportView slug={slug} />
    <div
      className={classNames(
        'flex flex-col gap-1 max-w-screen-xxs',
        'xs:max-w-screen-xs',
        'semi-sm:max-w-screen-semi-sm',
        'sm:max-w-screen-sm',
        'semi-lg:max-w-screen-xl'
      )}
    >
      <div className="flex flex-col">
        <div className="flex flex-col pb-4 mb-5 border-b border-slate-200 border-solid gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex w-full justify-between">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{blogPost?.title}</h1>
              <BookmarkButtonContainer
                blogPostSlug={slug}
                blogPostTitle={blogPost?.title ?? ''}
                width={28}
                height={28}
                strokeColor={{ active: COLORS.BLUE_600, inactive: COLORS.SLATE_300 }}
                fillColor={{ active: COLORS.BLUE_600, inactive: COLORS.WHITE }}
                isBookmarksPage={false}
              />
            </div>
            <div className="flex justify-between">
              {blogPost?.contentfulMetadata?.tags !== undefined && (
                <ul className="flex flex-wrap gap-2">
                  {blogPost?.contentfulMetadata.tags?.map((tag) => (
                    <li key={tag?.name} className="bg-slate-100 rounded-sm px-2 py-1 text-sm text-slate-500">
                      {tag?.name}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex gap-2">
                <div className="flex gap-0.5 items-center px-1">
                  <CalendarIcon width={16} height={16} />
                  <DateComponent date={blogPost?.publishedDate as string} className="h-4 text-slate-500 text-sm" />
                </div>
                <div className="flex gap-0.5 items-center">
                  <EyeIcon width={16} height={16} />
                  <p className="text-sm text-slate-500 h-[18px] flex gap-0.5">
                    {views.count}
                    <span>{views.title}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {blogPost?.featuredImage?.url !== undefined && blogPost?.featuredImage?.url !== null && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={blogPost.featuredImage.url}
                alt={blogPost.featuredImage.title ?? ''}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 100vw, 100vw"
              />
            </div>
          )}
          {blogPost?.introduction !== undefined && blogPost.introduction !== null && <RichText content={blogPost.introduction} />}
          {blogPost?.content !== undefined && blogPost.content !== null && <TableOfContents json={blogPost.content.json} />}
          {blogPost?.content !== undefined && blogPost.content !== null && <RichText content={blogPost.content} />}
        </div>
        {relatedPosts.length > 0 ? (
          <div className="flex flex-col gap-2 mt-8">
            <h2 className="text-2xl font-bold">Related Articles</h2>
            <ul className="flex flex-col gap-4">
              {relatedPosts.map((relatedPost) => (
                <li key={relatedPost.sys.id} className="max-w-64">
                  <BlogPostCard blogPost={relatedPost} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  </div>
)
