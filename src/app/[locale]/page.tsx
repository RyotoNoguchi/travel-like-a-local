import { ArticleListContainer } from '@/app/ui/article-list/container'
import { CarouselContainer } from '@/app/ui/components/organisms/carousel/container'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { HeroContainer } from '@/app/ui/hero/container'
import { PopularArticleListContainer } from '@/app/ui/popular-article-list/container'
import { RichText } from '@/app/ui/rich-text'
import { LOGO_TITLE, type LANGUAGE } from '@/constants'
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

  return (
    <>
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <HeroContainer enrichedTitle={<RichText>{(tags) => t.rich('title', { ...tags })}</RichText>} enrichedSubtitle={t('subtitle')} />
        <CarouselContainer width={300} height={200} locale={locale} />
        <div className="flex w-full justify-center gap-8 lg:gap-16 px-4">
          <ArticleListContainer title={articleListT('title')} viewAllButtonText={articleListT('viewAll')} locale={locale} />
          <PopularArticleListContainer title={popularArticleListT('title')} viewCountText={articleT('views')} />
        </div>
      </main>
    </>
  )
}

export default HomePage
