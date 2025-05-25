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
}

export const ArticleLayout: FC<Props> = ({ children, locale, breadcrumbs }) => (
  <>
    <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
    <div className={classNames('w-full flex justify-center mt-1 semi-lg:mb-5 px-3 xs:px-4 sm:px-6 lg:px-8 pb-10')}>
      <div
        className={classNames(
          'w-full flex flex-col gap-1 ',
          'max-w-screen-xxs',
          'xs:max-w-screen-xs',
          'semi-sm:max-w-screen-semi-sm',
          'sm:max-w-screen-sm',
          'xs:px-0',
          'sm:px-6',
          'semi-lg:max-w-screen-xl'
        )}
      >
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className={classNames('flex w-full justify-center gap-8 lg:gap-16', 'xl:grid xl:grid-cols-[1fr_300px]')}>
          <main className="flex-1 w-full">{children}</main>
          <PopularBlogPostsContainer locale={locale} />
        </div>
      </div>
    </div>
  </>
)
