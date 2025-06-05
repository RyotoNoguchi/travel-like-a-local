import { createApolloClient } from '@/apolloClient'
// import { ProfileCardContainer } from '@/app/ui/components/molecules/profile-card/container'
// import { BlogPostCards } from '@/app/ui/components/organisms/blog-post-cards'
// import { BlogPostsContainer } from '@/app/ui/components/organisms/blog-posts/container'
// import { CarouselContainer } from '@/app/ui/components/organisms/carousel/container'
// import { ExploreMapSection } from '@/app/ui/components/organisms/explore-map-section'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { HeroContainer } from '@/app/ui/hero/container'
// import { PopularBlogPostsContainer } from '@/app/ui/popular-blog-posts/container'
import { RichText } from '@/app/ui/rich-text'
import { type LANGUAGE, LOCALE_CODE_MAP, LOGO_TITLE } from '@/constants'
import type {
  GetTestimonialsQuery,
  GetTestimonialsQueryVariables,
  GetUniqueValuePropositionsQuery,
  GetUniqueValuePropositionsQueryVariables
} from '@/generated/graphql'
import { GET_TESTIMONIALS_QUERY, GET_UNIQUE_VALUE_PROPOSITIONS_QUERY } from '@/graphql/query'
// import { getBlogPosts } from '@/lib/contentful/get-blog-posts'
// import { getImageById } from '@/utils/assets'
// import { getBlogPostsWithHref } from '@/utils/blog-post-helper'
// import { categorizeBlogPosts } from '@/utils/category-helper'
import { CallToActionSection } from '@/app/ui/components/organisms/call-to-action-section'
import { FeaturedToursSection } from '@/app/ui/components/organisms/featured-tours-section'
import { UniqueValuePropositionSection } from '@/app/ui/components/organisms/unique-value-proposition'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'
import { TestimonialSection } from '../ui/components/molecules/testimonials/testimonial-section'

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
  // const blogPosts =
  //   (await getBlogPosts(LOCALE_CODE_MAP[locale])).blogPosts
  //     .filter((blogPost): blogPost is NonNullable<GetBlogPostsQuery['pageBlogPostCollection']>['items']['0'] => blogPost !== null)
  //     .filter((post) => post !== null) || []
  // const categories = await getCategories(locale)
  // const blogPostsWithHref = await getBlogPostsWithHref(blogPosts)
  // const categorizedBlogPosts = categorizeBlogPosts(blogPostsWithHref, categories)
  // const profileImage = await getImageById({ id: PROFILE_IMAGE_ID, width: 500, height: 500 })

  // Fetch unique value propositions
  const client = createApolloClient()
  const { data } = await client.query<GetUniqueValuePropositionsQuery, GetUniqueValuePropositionsQueryVariables>({
    query: GET_UNIQUE_VALUE_PROPOSITIONS_QUERY,
    variables: { locale: LOCALE_CODE_MAP[locale] }
  })

  const { data: testimonialsData } = await client.query<GetTestimonialsQuery, GetTestimonialsQueryVariables>({
    query: GET_TESTIMONIALS_QUERY,
    variables: {
      locale: LOCALE_CODE_MAP[locale]
    }
  })

  const testimonialSourceText = `${t('ServicesPage.testimonialSource').replace('Couchsurfing', `<a href="https://www.couchsurfing.com/people/ryoto-noguchi" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">${t('ServicesPage.testimonialCouchsurfing')}</a>`)}`
  const uniqueValuePropositions = data?.uniqueValuePropositionCollection?.items || []

  return (
    <>
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start overflow-hidden">
        <HeroContainer
          enrichedTitle={<RichText>{(tags) => t.rich('Hero.title', { ...tags })}</RichText>}
          enrichedSubtitle={t('Hero.subtitle')}
          buttonText={t('Hero.cta')}
        />

        <UniqueValuePropositionSection uniqueValuePropositions={uniqueValuePropositions} />
        <FeaturedToursSection locale={locale} />
        <TestimonialSection
          testimonials={testimonialsData.testimonialCollection?.items ?? []}
          title={t('ServicesPage.testimonials.title')}
          sourceText={testimonialSourceText}
        />
        <CallToActionSection locale={locale} />
      </main>
    </>
  )
}

export default HomePage
