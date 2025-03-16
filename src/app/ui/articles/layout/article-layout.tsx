import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { PopularBlogPostsContainer } from '@/app/ui/popular-blog-posts/container'
import { type LANGUAGE } from '@/constants'
import type { BreadcrumbItem } from '@/types/breadcrumbs'
import classNames from 'classnames'
import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  locale: LANGUAGE
  breadcrumbs: BreadcrumbItem[]
  popularArticlesTitle: string
  viewCountText: string
}

export const ArticleLayout: FC<Props> = ({ children, locale, breadcrumbs, popularArticlesTitle, viewCountText }) => (
  <>
    <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
    <div className={classNames('w-full flex justify-center mt-1 semi-lg:mb-5 px-3 xs:px-4 sm:px-6 lg:px-8')}>
      <div
        className={classNames(
          'flex flex-col gap-1 max-w-screen-xxs',
          'xs:max-w-screen-xs',
          'semi-sm:max-w-screen-semi-sm',
          'sm:max-w-screen-sm',
          'xs:px-4',
          'sm:px-6',
          'semi-lg:max-w-screen-xl'
        )}
      >
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="flex w-full justify-center gap-8 lg:gap-16">
          <main className="flex-1">{children}</main>
          <PopularBlogPostsContainer title={popularArticlesTitle} viewCountText={viewCountText} locale={locale} />
        </div>
      </div>
    </div>
  </>
)
