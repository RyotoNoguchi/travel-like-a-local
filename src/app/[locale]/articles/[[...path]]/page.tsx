import { createApolloClient } from '@/apolloClient'
import { ArticleDetailContainer } from '@/app/ui/article-detail/container'
import { ArticleListContainer } from '@/app/ui/article-list/container'
import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { PopularArticleListContainer } from '@/app/ui/popular-article-list/container'
import { CONCEPT_SCHEME, LANGUAGE, LOCALE_CODE_MAP, LOGO_TITLE } from '@/constants'
import type { ListArticleQuery, ListArticleQueryVariables } from '@/generated/graphql'
import { LIST_ARTICLE_QUERY } from '@/graphql/query'
import { getAllArticles } from '@/lib/contentful/get-articles'
import { getConceptSchemes } from '@/lib/contentful/get-concept-schemes'
import { getConcepts } from '@/lib/contentful/get-concepts'
import { generateBreadcrumbs } from '@/utils/breadcrumb-helper'
import { parseArticlePath } from '@/utils/path-helper'
import { formatNameForUrl, generateHref } from '@/utils/url-helpers'
import classNames from 'classnames'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

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
  const articleT = await getTranslations({ locale, namespace: 'Article' })
  const popularArticleListT = await getTranslations({ locale, namespace: 'PopularArticleList' })
  const articleListT = await getTranslations({ locale, namespace: 'ArticleList' })
  const getTitle = () => {
    if (prefecture) {
      return `${prefecture} ${articleListT('articles')}`
    } else if (area) {
      return `${area} ${articleListT('articles')}`
    } else if (region) {
      return `${region} ${articleListT('articles')}`
    } else if (category) {
      return `${category} ${articleListT('articles')}`
    }
    return articleListT('title')
  }
  const breadcrumbs = generateBreadcrumbs({
    path,
    article: undefined,
    category,
    region,
    area,
    prefecture
  })

  if (!slug) {
    return (
      <>
        <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
        <div className={classNames('w-full flex justify-center mt-1 semi-lg:mb-5 px-3 xs:px-4 sm:px-6 lg:px-8')}>
          <div
            className={classNames(
              'flex flex-col gap-1 px-3 max-w-screen-xxs',
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
              <main className="flex-1 ">
                <ArticleListContainer title={getTitle()} locale={locale} category={category} region={region} area={area} prefecture={prefecture} path={path} />
              </main>
              <PopularArticleListContainer title={popularArticleListT('title')} viewCountText={articleT('views')} locale={locale} />
            </div>
          </div>
        </div>
      </>
    )
  }

  return <ArticleDetailContainer locale={locale} slug={slug} category={category} region={region} area={area} prefecture={prefecture} path={path} />
}

export default ArticlePage
