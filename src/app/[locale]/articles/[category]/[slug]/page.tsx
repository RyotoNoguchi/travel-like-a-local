import { createApolloClient } from '@/apolloClient'
import { ReportView } from '@/app/ui/components/atoms/anaylytics/viewcount'
import { DateComponent } from '@/app/ui/components/atoms/date'
import { CalendarIcon } from '@/app/ui/components/atoms/icons/calendar-icon'
import { EyeIcon } from '@/app/ui/components/atoms/icons/eye-icon'
import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { RichText } from '@/app/ui/components/molecules/rich-text'
import { TableOfContents } from '@/app/ui/components/molecules/table-of-contents'
import { PopularArticleListContainer } from '@/app/ui/popular-article-list/container'
import { LOCALE_CODE_MAP, LOGO_TITLE, REDIS_KEYS, type LANGUAGE } from '@/constants'
import type { ListArticleQueryVariables, Query } from '@/generated/graphql'
import { LIST_ARTICLE_QUERY } from '@/graphql/query'
import { Redis } from '@upstash/redis'
import classNames from 'classnames'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: LANGUAGE; category: string; slug: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale, slug } = await params
  const client = createApolloClient()
  const { data } = await client.query<Query, ListArticleQueryVariables>({
    query: LIST_ARTICLE_QUERY,
    variables: {
      slug,
      locale: LOCALE_CODE_MAP[locale]
    }
  })
  const seoFields = data.pageBlogPostCollection?.items.find((item) => item?.slug === slug)?.seoFields
  return {
    title: `${seoFields?.pageTitle ?? ''} | ${LOGO_TITLE}`,
    description: seoFields?.pageDescription ?? ''
  }
}

const ArticlePage: NextPage<Props> = async ({ params }) => {
  const { locale, category, slug } = await params
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)
  const client = createApolloClient()
  const popularArticleListT = await getTranslations({ locale, namespace: 'PopularArticleList' })
  const articleT = await getTranslations({ locale, namespace: 'Article' })
  const { data } = await client.query<Query, ListArticleQueryVariables>({
    query: LIST_ARTICLE_QUERY,
    variables: {
      slug,
      locale: LOCALE_CODE_MAP[locale]
    }
  })
  const article = data.pageBlogPostCollection?.items.find((item) => item?.slug === slug)
  const redis = Redis.fromEnv()
  const views = (await redis.get<number>([REDIS_KEYS.PAGEVIEWS, REDIS_KEYS.NAMESPACE, slug].join(':'))) ?? 0

  return (
    <div className={classNames('w-full flex justify-center', 'pt-2', 'semi-lg:gap-10')}>
      <ReportView slug={slug} />
      <div
        className={classNames(
          'flex flex-col gap-1 px-3 max-w-screen-xxs',
          'xs:max-w-screen-xs',
          'semi-sm:max-w-screen-sm',
          'xs:px-4',
          'sm:px-6',
          'lg:max-w-screen-md'
        )}
      >
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Articles', href: '/articles' },
            { label: formattedCategory, href: `/articles/${category}` },
            { label: article?.title ?? '', href: `/articles/${category}/${slug}` }
          ]}
        />
        <div className="flex flex-col pb-4 mb-2 border-b border-slate-200 border-solid gap-4">
          <div className="flex gap-2">
            <div className="flex gap-0.5 items-center px-1">
              <CalendarIcon width={16} height={16} />
              <DateComponent date={article?.publishedDate as string} className="h-4 text-slate-500 text-sm" />
            </div>
            <div className="flex gap-0.5 items-center">
              <EyeIcon width={16} height={16} />
              <p className="text-sm text-slate-500 h-[18px] flex gap-0.5">
                {views}
                <span>{articleT('views')}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold">{article?.title}</h2>
            {/* eslint-disable-next-line react/jsx-no-leaked-render */}
            {article?.contentfulMetadata.tags && (
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
          {article?.content ? <RichText content={article.content} /> : null}
        </div>
      </div>
      <PopularArticleListContainer title={popularArticleListT('title')} />
    </div>
  )
}

export default ArticlePage
