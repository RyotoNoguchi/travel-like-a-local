import { createApolloClient } from '@/apolloClient'
import { ReportView } from '@/app/ui/components/atoms/anaylytics/viewcount'
import { DateComponent } from '@/app/ui/components/atoms/date'
import { CalendarIcon } from '@/app/ui/components/atoms/icons/calendar-icon'
import { EyeIcon } from '@/app/ui/components/atoms/icons/eye-icon'
import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { RichText } from '@/app/ui/components/molecules/rich-text'
import { TableOfContents } from '@/app/ui/components/molecules/table-of-contents'
import { PopularArticleListContainer } from '@/app/ui/popular-article-list/container'
import { CONCEPT_SCHEME, LANGUAGE, LOCALE_CODE_MAP, LOGO_TITLE, REDIS_KEYS } from '@/constants'
import type { ListArticleQuery, ListArticleQueryVariables, PageBlogPostContent } from '@/generated/graphql'
import { LIST_ARTICLE_QUERY } from '@/graphql/query'
import { getAllArticles } from '@/lib/contentful/get-articles'
import { getConceptSchemes } from '@/lib/contentful/get-concept-schemes'
import { getConcepts } from '@/lib/contentful/get-concepts'
import { generateBreadcrumbs } from '@/utils/breadcrumb-helper'
import { parseArticlePath } from '@/utils/path-helper'
import { formatNameForUrl, generateHref } from '@/utils/url-helpers'
import { Redis } from '@upstash/redis'
import classNames from 'classnames'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{
    locale: LANGUAGE
    path: string[]
  }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale, path } = await params
  const { slug, category, region, area, prefecture } = await parseArticlePath(path)
  const client = createApolloClient()
  const { data } = await client.query<ListArticleQuery, ListArticleQueryVariables>({
    query: LIST_ARTICLE_QUERY,
    variables: {
      slug,
      locale: LOCALE_CODE_MAP[locale]
    }
  })

  const seoFields = data.pageBlogPostCollection?.items.find((item) => item?.slug === slug)?.seoFields
  return {
    title: `${seoFields?.pageTitle ?? ''} ${category ? `| ${category}` : ''} ${region ? `| ${region}` : ''} ${area ? `| ${area}` : ''} ${prefecture ? `| ${prefecture}` : ''} | ${LOGO_TITLE}`,
    description: seoFields?.pageDescription ?? ''
  }
}

export const generateStaticParams = async () => {
  const articles = await getAllArticles()

  const params = []

  for (const article of articles) {
    if (!article?.slug) continue
    const articleConceptIds = article?.contentfulMetadata?.concepts?.map((concept) => concept?.id).filter((id): id is string => id !== null) || []
    if (!articleConceptIds.length) continue

    const concepts = await getConcepts()
    const conceptSchemes = await getConceptSchemes()

    const categoryScheme = conceptSchemes.find((scheme) => scheme.label === CONCEPT_SCHEME.CATEGORIES)
    const regionScheme = conceptSchemes.find((scheme) => scheme.label === CONCEPT_SCHEME.REGIONS)

    const regionConceptIds = regionScheme?.topConceptIds || []
    const regionConceptId = articleConceptIds.find((articleConceptId) => regionConceptIds.includes(articleConceptId))
    const regionName = concepts.find((concept) => concept.id === regionConceptId)?.label.toLowerCase() ?? ''

    const areaConceptIds = concepts.filter((concept) => concept.upperLevelConceptIds.some((id) => regionConceptIds.includes(id))).map((concept) => concept.id)
    const areaConceptId = articleConceptIds.find((articleConceptId) => areaConceptIds.includes(articleConceptId))
    const areaName = formatNameForUrl(concepts.find((concept) => concept.id === areaConceptId)?.label.toLowerCase() ?? '')

    const prefectureConceptIds = concepts
      .filter((concept) => concept.upperLevelConceptIds.some((id) => areaConceptIds.includes(id)))
      .map((concept) => concept.id)
    const prefectureConceptId = articleConceptIds.find((articleConceptId) => prefectureConceptIds.includes(articleConceptId))

    const prefectureName = concepts.find((concept) => concept.id === prefectureConceptId)?.label.toLowerCase() ?? ''
    const categoryConceptIds = categoryScheme?.topConceptIds || []
    const categoryConceptId = articleConceptIds.find((articleConceptId) => categoryConceptIds.includes(articleConceptId))
    const categoryName = concepts.find((concept) => concept.id === categoryConceptId)?.label.toLowerCase() ?? ''

    const href = generateHref({
      categoryName,
      regionName,
      areaName,
      prefectureName,
      slug: article.slug
    })

    const pathSegments = href.split('/').filter(Boolean).slice(1)

    // 各ロケールに対してパラメータを生成
    for (const locale of Object.values(LANGUAGE)) {
      params.push({
        locale,
        path: pathSegments
      })
    }
  }

  return params
}

const ArticlePage: NextPage<Props> = async ({ params }) => {
  const { locale, path } = await params
  const { slug, category, region, area, prefecture } = await parseArticlePath(path)
  const client = createApolloClient()
  const popularArticleListT = await getTranslations({ locale, namespace: 'PopularArticleList' })
  const articleT = await getTranslations({ locale, namespace: 'Article' })
  const { data } = await client.query<ListArticleQuery, ListArticleQueryVariables>({
    query: LIST_ARTICLE_QUERY,
    variables: {
      slug,
      locale: LOCALE_CODE_MAP[locale]
    }
  })
  const article = data.pageBlogPostCollection?.items.find((item) => item?.slug === slug)
  if (article === undefined || article === null) notFound()
  const breadcrumbs = generateBreadcrumbs({
    path,
    article: {
      slug: article.slug,
      title: article.title,
      contentfulMetadata: article.contentfulMetadata
    },
    category,
    region,
    area,
    prefecture
  })
  const redis = Redis.fromEnv()
  const views = (await redis.get<number>([REDIS_KEYS.PAGEVIEWS, REDIS_KEYS.NAMESPACE, slug].join(':'))) ?? 0
  return (
    <div className={classNames('w-full flex justify-center', 'pt-2', 'semi-lg:gap-10')}>
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
          {article?.content && article.content.__typename === 'PageBlogPostContent' ? <RichText content={article.content as PageBlogPostContent} /> : null}
        </div>
      </div>
      <PopularArticleListContainer title={popularArticleListT('title')} viewCountText={articleT('views')} />
    </div>
  )
}

export default ArticlePage
