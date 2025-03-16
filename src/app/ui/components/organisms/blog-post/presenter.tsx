import { ReportView } from '@/app/ui/components/atoms/anaylytics/viewcount'
import { DateComponent } from '@/app/ui/components/atoms/date'
import { CalendarIcon } from '@/app/ui/components/atoms/icons/calendar-icon'
import { EyeIcon } from '@/app/ui/components/atoms/icons/eye-icon'
import { RichText } from '@/app/ui/components/molecules/rich-text'
import { TableOfContents } from '@/app/ui/components/molecules/table-of-contents'
import { type LANGUAGE } from '@/constants'
import type { GetBlogPostBySlugQuery } from '@/generated/graphql'
import classNames from 'classnames'
import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  slug: string
  blogPost: NonNullable<GetBlogPostBySlugQuery['pageBlogPostCollection']>['items'][0]
  views: {
    count: number
    title: string
  }
  popularArticleListTitle: string
}

export const BlogPost: FC<Props> = async ({ slug, blogPost, views }) => (
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
            <h2 className="text-3xl font-bold">{blogPost?.title}</h2>
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
            <Image src={blogPost.featuredImage.url} alt={blogPost.featuredImage.title ?? ''} width={1200} height={800} />
          )}
          {blogPost?.introduction !== undefined && blogPost.introduction !== null && <RichText content={blogPost.introduction} />}
          {blogPost?.content !== undefined && blogPost.content !== null && <TableOfContents json={blogPost.content.json} />}
          {blogPost?.content !== undefined && blogPost.content !== null && <RichText content={blogPost.content} />}
        </div>
      </div>
    </div>
  </div>
)
