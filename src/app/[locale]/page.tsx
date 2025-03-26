import { createApolloClient } from '@/apolloClient'
import { BlogPostsContainer } from '@/app/ui/components/organisms/blog-posts/container'
import { CarouselContainer } from '@/app/ui/components/organisms/carousel/container'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { HeroContainer } from '@/app/ui/hero/container'
import { PopularBlogPostsContainer } from '@/app/ui/popular-blog-posts/container'
import { RichText } from '@/app/ui/rich-text'
import { type LANGUAGE, LOCALE_CODE_MAP, LOGO_TITLE } from '@/constants'
import type { GetBlogPostsQuery, GetBlogPostsQueryVariables } from '@/generated/graphql'
import { GET_BLOG_POSTS_QUERY } from '@/graphql/query'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: LANGUAGE }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params
  // Ref: https://next-intl.dev/docs/environments/actions-metadata-route-handlers
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: `${t('home')} | ${LOGO_TITLE}`,
    description: t('description')
  }
}

const HomePage: NextPage<Props> = async ({ params }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Hero' })
  const articleListT = await getTranslations({ locale, namespace: 'ArticleList' })
  const popularArticleListT = await getTranslations({ locale, namespace: 'PopularArticleList' })
  const articleT = await getTranslations({ locale, namespace: 'Article' })
  const breadcrumbs = [{ label: 'Home', href: '/' }]
  const client = createApolloClient()
  const { data } = await client.query<GetBlogPostsQuery, GetBlogPostsQueryVariables>({
    query: GET_BLOG_POSTS_QUERY,
    variables: { limit: 20, skip: 0, locale: LOCALE_CODE_MAP[locale] }
  })
  const blogPosts = data.pageBlogPostCollection?.items.filter((post) => post !== null) || []

  return (
    <>
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <HeroContainer enrichedTitle={<RichText>{(tags) => t.rich('title', { ...tags })}</RichText>} enrichedSubtitle={t('subtitle')} />
        <CarouselContainer width={300} height={200} locale={locale} />
        <div className="flex w-full justify-center gap-8 lg:gap-16 px-4">
          <BlogPostsContainer title={articleListT('title')} viewAllButtonText={articleListT('viewAll')} locale={locale} blogPosts={blogPosts} />
          <PopularBlogPostsContainer title={popularArticleListT('title')} viewCountText={articleT('views')} locale={locale} />
        </div>
      </main>
    </>
  )
}

export default HomePage
