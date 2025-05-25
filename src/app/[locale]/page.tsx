import { ProfileCardContainer } from '@/app/ui/components/molecules/profile-card/container'
import { BlogPostCards } from '@/app/ui/components/organisms/blog-post-cards'
import { BlogPostsContainer } from '@/app/ui/components/organisms/blog-posts/container'
import { CarouselContainer } from '@/app/ui/components/organisms/carousel/container'
import { ExploreMapSection } from '@/app/ui/components/organisms/explore-map-section'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { HeroContainer } from '@/app/ui/hero/container'
import { PopularBlogPostsContainer } from '@/app/ui/popular-blog-posts/container'
import { RichText } from '@/app/ui/rich-text'
import { type LANGUAGE, LOCALE_CODE_MAP, LOGO_TITLE, PROFILE_IMAGE_ID } from '@/constants'
import type { GetBlogPostsQuery } from '@/generated/graphql'
import { getBlogPosts } from '@/lib/contentful/get-blog-posts'
import { getImageById } from '@/utils/assets'
import { getBlogPostsWithHref } from '@/utils/blog-post-helper'
import { categorizeBlogPosts } from '@/utils/category-helper'
import { getCategories } from '@/utils/concept-helper'
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
  const t = await getTranslations({ locale })
  const breadcrumbs = [{ label: t('Metadata.home'), href: '' }]
  const blogPosts =
    (await getBlogPosts(LOCALE_CODE_MAP[locale])).blogPosts
      .filter((blogPost): blogPost is NonNullable<GetBlogPostsQuery['pageBlogPostCollection']>['items']['0'] => blogPost !== null)
      .filter((post) => post !== null) || []
  const categories = await getCategories(locale)
  const blogPostsWithHref = await getBlogPostsWithHref(blogPosts)
  const categorizedBlogPosts = categorizeBlogPosts(blogPostsWithHref, categories)
  const profileImage = await getImageById({ id: PROFILE_IMAGE_ID, width: 500, height: 500 })

  return (
    <>
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start overflow-hidden">
        <HeroContainer
          enrichedTitle={<RichText>{(tags) => t.rich('Hero.title', { ...tags })}</RichText>}
          enrichedSubtitle={t('Hero.subtitle')}
          buttonText={t('Hero.cta')}
        />

        <div className="semi-lg:hidden w-full px-4 -mt-2">
          <ProfileCardContainer imageUrl={profileImage?.url || ''} isMobile={true} />
        </div>

        <CarouselContainer width={300} height={200} locale={locale} />
        <ExploreMapSection locale={locale} />

        <div className="flex w-full items-start gap-8 lg:gap-16 px-4 container mx-auto justify-start">
          <div className="flex flex-col gap-4 w-full">
            <BlogPostCards categorizedBlogPosts={categorizedBlogPosts} categories={categories} />
            <BlogPostsContainer
              title={t('ArticleList.title')}
              viewAllButtonText={t('ArticleList.viewAll')}
              locale={locale}
              blogPosts={blogPosts}
              noBlogPostsTitle={t('BlogPosts.noBlogPosts')}
              noBlogPostsMessage={t('BlogPosts.noBlogPostsMessage')}
              isBookmarksPage={false}
            />
          </div>
          <aside className="hidden semi-lg:flex flex-col gap-6 items-center max-w-[300px]">
            <ProfileCardContainer imageUrl={profileImage?.url || ''} />
            <PopularBlogPostsContainer locale={locale} />
          </aside>
        </div>
      </main>
    </>
  )
}

export default HomePage
