import { createApolloClient } from '@/apolloClient'
import { BlogPostContainer } from '@/app/ui/blog-post/container'
import { BlogPostsContainer } from '@/app/ui/blog-posts/container'
import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { PopularBlogPostsContainer } from '@/app/ui/popular-blog-posts/container'
import { CONCEPT_SCHEME, LANGUAGE, LOCALE_CODE_MAP } from '@/constants'
import type { GetBlogPostBySlugQuery, GetBlogPostBySlugQueryVariables } from '@/generated/graphql'
import { GET_BLOG_POST_BY_SLUG_QUERY } from '@/graphql/query'
import { getBlogPosts } from '@/lib/contentful/get-blog-posts'
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
  const t = await getTranslations({ locale, namespace: 'ArticleList' })

  // カテゴリと地域の名前を整形（先頭大文字に）
  const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : ''
  const formattedRegion = region ? region.charAt(0).toUpperCase() + region.slice(1) : ''
  const formattedArea = area ? area.charAt(0).toUpperCase() + area.slice(1) : ''
  const formattedPrefecture = prefecture ? prefecture.charAt(0).toUpperCase() + prefecture.slice(1) : ''

  // 最も具体的な地域を特定
  const mostSpecificRegion = formattedPrefecture || formattedArea || formattedRegion || ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTitleText = (region: string, category: string, t: any) => {
    if (region && category) {
      return t('articlesOf', { region, category })
    } else if (region) {
      return t('articlesOf', { region, category: '' })
    } else if (category) {
      return t('articlesOf', { region: '', category })
    } else {
      return t('articles')
    }
  }

  if (slug) {
    const client = createApolloClient()
    const { data } = await client.query<GetBlogPostBySlugQuery, GetBlogPostBySlugQueryVariables>({
      query: GET_BLOG_POST_BY_SLUG_QUERY,
      variables: {
        slug,
        locale: LOCALE_CODE_MAP[locale]
      }
    })

    const blogPost = data.pageBlogPostCollection?.items.find((item) => item?.slug === slug)
    const seoFields = blogPost?.seoFields

    return {
      title: `${seoFields?.pageTitle || blogPost?.title || ''} ${mostSpecificRegion ? `| ${mostSpecificRegion}` : ''}`,
      description: seoFields?.pageDescription ?? ''
    }
  } else {
    const title = getTitleText(mostSpecificRegion, formattedCategory, t)

    return {
      title,
      description: t('description', { region: mostSpecificRegion, category: formattedCategory })
    }
  }
}

export const generateStaticParams = async () => {
  const articles = await getBlogPosts()

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

const fetchBlogPost = async (
  slug: string,
  locale: LANGUAGE
): Promise<NonNullable<GetBlogPostBySlugQuery['pageBlogPostCollection']>['items'][0] | undefined> => {
  const client = createApolloClient()
  const { data } = await client.query<GetBlogPostBySlugQuery, GetBlogPostBySlugQueryVariables>({
    query: GET_BLOG_POST_BY_SLUG_QUERY,
    variables: { slug, locale: LOCALE_CODE_MAP[locale] }
  })

  return data.pageBlogPostCollection?.items?.find((pageBlogPost) => pageBlogPost?.slug === slug)
}

const BlogPostPage: NextPage<Props> = async ({ params }) => {
  const { locale, path } = await params
  const { slug, category, region, area, prefecture } = await parseArticlePath(path)
  const articleT = await getTranslations({ locale, namespace: 'Article' })
  const popularBlogPostsT = await getTranslations({ locale, namespace: 'PopularArticleList' })
  const blogPostsT = await getTranslations({ locale, namespace: 'ArticleList' })

  const getTitle = () => {
    if (prefecture) {
      return blogPostsT('articlesOf', { region: prefecture.charAt(0).toUpperCase() + prefecture.slice(1), category: '' })
    } else if (area) {
      return blogPostsT('articlesOf', { region: area.charAt(0).toUpperCase() + area.slice(1), category: '' })
    } else if (region) {
      return blogPostsT('articlesOf', { region: region.charAt(0).toUpperCase() + region.slice(1), category: '' })
    } else if (category) {
      return blogPostsT('articlesOf', { region: '', category: category.charAt(0).toUpperCase() + category.slice(1) })
    }
    return blogPostsT('title')
  }
  const blogPost = slug ? await fetchBlogPost(slug, locale) : undefined
  const breadcrumbs = generateBreadcrumbs({
    path,
    blogPost,
    category,
    region,
    area,
    prefecture
  })

  if (!slug || !blogPost) {
    return (
      <>
        <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
        <div className={classNames('w-full flex justify-center mt-1 semi-lg:mb-5 px-3 xs:px-4 sm:px-6 lg:px-8')}>
          <div
            className={classNames(
              'flex flex-col gap-1 max-w-screen-xxs',
              'xs:max-w-screen-xs',
              'semi-sm:max-w-screen-semi-sm',
              'sm:max-w-screen-sm',
              'semi-lg:max-w-screen-xl'
            )}
          >
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="flex w-full justify-center gap-8 lg:gap-16">
              <main className="flex-1 ">
                <BlogPostsContainer title={getTitle()} locale={locale} category={category} region={region} area={area} prefecture={prefecture} path={path} />
              </main>
              <PopularBlogPostsContainer title={popularBlogPostsT('title')} viewCountText={articleT('views')} locale={locale} />
            </div>
          </div>
        </div>
      </>
    )
  }
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
            <main className="flex-1">
              <BlogPostContainer locale={locale} slug={slug} blogPost={blogPost} />
            </main>
            <PopularBlogPostsContainer title={popularBlogPostsT('title')} viewCountText={articleT('views')} locale={locale} />
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPostPage
