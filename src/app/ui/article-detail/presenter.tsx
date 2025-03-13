import { ReportView } from '@/app/ui/components/atoms/anaylytics/viewcount'
import { DateComponent } from '@/app/ui/components/atoms/date'
import { CalendarIcon } from '@/app/ui/components/atoms/icons/calendar-icon'
import { EyeIcon } from '@/app/ui/components/atoms/icons/eye-icon'
import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { RichText } from '@/app/ui/components/molecules/rich-text'
import { TableOfContents } from '@/app/ui/components/molecules/table-of-contents'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { PopularArticleListContainer } from '@/app/ui/popular-article-list/container'
import { type LANGUAGE } from '@/constants'
import type { PageBlogPost } from '@/generated/graphql'
import type { BreadcrumbItem } from '@/types/breadcrumbs'
import classNames from 'classnames'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  breadcrumbs: BreadcrumbItem[]
  slug: string
  article: Pick<PageBlogPost, 'slug' | 'title' | 'publishedDate' | 'seoFields' | 'content' | 'contentfulMetadata'>
  views: {
    count: number
    title: string
  }
  popularArticleListTitle: string
}

export const ArticleDetail: FC<Props> = async ({ locale, breadcrumbs, slug, article, views, popularArticleListTitle }) => (
  <div className={classNames('w-full flex justify-center', 'pt-2', 'semi-lg:gap-10')}>
    <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
    <ReportView slug={slug} />
    <div
      className={classNames(
        'flex flex-col gap-1 px-3 max-w-screen-xxs',
        'xs:max-w-screen-xs',
        'semi-sm:max-w-screen-semi-sm',
        'sm:max-w-screen-sm',
        'xs:px-4',
        'sm:px-6',
        'lg:max-w-screen-md'
      )}
    >
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex flex-col pb-4 mb-2 border-b border-slate-200 border-solid gap-4">
        <div className="flex gap-2">
          <div className="flex gap-0.5 items-center px-1">
            <CalendarIcon width={16} height={16} />
            <DateComponent date={article?.publishedDate as string} className="h-4 text-slate-500 text-sm" />
          </div>
          <div className="flex gap-0.5 items-center">
            <EyeIcon width={16} height={16} />
            <p className="text-sm text-slate-500 h-[18px] flex gap-0.5">
              {views.count}
              <span>{views.title}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold">{article?.title}</h2>
          {/* eslint-disable-next-line react/jsx-no-leaked-render */}
          {article?.contentfulMetadata?.tags && (
            <ul className="flex flex-wrap gap-2">
              {article?.contentfulMetadata.tags?.map((tag) => (
                <li key={tag?.name} className="bg-slate-100 rounded-sm px-2 py-1 text-sm text-slate-500">
                  {tag?.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {article?.content ? <TableOfContents content={article.content.json} /> : null}
        {article?.content && article.content.__typename === 'PageBlogPostContent' ? <RichText content={article.content} /> : null}
      </div>
    </div>
    <PopularArticleListContainer title={popularArticleListTitle} viewCountText={views.title} />
  </div>
)
