import { createApolloClient } from '@/apolloClient'
import { BlogPostDetailPage } from '@/app/ui/articles/pages/blog-post-page'
import { BlogPostListPage } from '@/app/ui/articles/pages/blog-posts-page'
import { CONCEPT_SCHEME, LANGUAGE, LOCALE_CODE_MAP } from '@/constants'
import type { GetBlogPostBySlugQuery, GetBlogPostBySlugQueryVariables } from '@/generated/graphql'
import { GET_BLOG_POST_BY_SLUG_QUERY } from '@/graphql/query'
import { getAllBlogPosts } from '@/lib/contentful/get-blog-posts'
import { generateBreadcrumbs } from '@/utils/breadcrumb-helper'
import { loadConcepts, loadConceptSchemes } from '@/utils/concept-helper'
import { parseArticlePath } from '@/utils/path-helper'
import { capitalizeFirstLetter } from '@/utils/string-helper'
import { formatNameForUrl, generateHref } from '@/utils/url-helpers'
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
  const formattedCategory = category ? capitalizeFirstLetter(category) : ''
  const formattedRegion = region ? capitalizeFirstLetter(region) : ''
  const formattedArea = area ? capitalizeFirstLetter(area) : ''
  const formattedPrefecture = prefecture ? capitalizeFirstLetter(prefecture) : ''

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
  const articles = await getAllBlogPosts()
  const params = []

  const concepts = await loadConcepts()
  const conceptSchemes = await loadConceptSchemes()

  for (const article of articles) {
    if (!article?.slug) continue
    const articleConceptIds = article?.contentfulMetadata?.concepts?.map((concept) => concept?.id).filter((id): id is string => id !== null) || []
    if (!articleConceptIds.length) continue

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

  const blogPost = slug ? await fetchBlogPost(slug, locale) : undefined
  const breadcrumbs = generateBreadcrumbs({
    path,
    blogPost,
    category,
    region,
    area,
    prefecture
  })

  const hasBlogPost = slug && blogPost

  return hasBlogPost ? (
    <BlogPostDetailPage locale={locale} breadcrumbs={breadcrumbs} slug={slug} blogPost={blogPost} />
  ) : (
    <BlogPostListPage locale={locale} breadcrumbs={breadcrumbs} category={category} region={region} area={area} prefecture={prefecture} path={path} />
  )
}

export default BlogPostPage
