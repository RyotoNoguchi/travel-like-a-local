import { createApolloClient } from '@/apolloClient'
import { Button } from '@/app/ui/components/atoms/button'
import { ResponsiveImage } from '@/app/ui/components/atoms/responsive-image'
import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { type LANGUAGE, LOCALE_CODE_MAP } from '@/constants'
import type { GetTourQuery, GetTourQueryVariables } from '@/generated/graphql'
import { GET_TOUR_QUERY } from '@/graphql/query'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    locale: LANGUAGE
    slug: string
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale, slug } = await params
  const client = createApolloClient()

  const { data } = await client.query<GetTourQuery, GetTourQueryVariables>({
    query: GET_TOUR_QUERY,
    variables: {
      slug,
      locale: LOCALE_CODE_MAP[locale]
    }
  })

  const tour = data?.tourCollection?.items[0]

  if (!tour) {
    return {
      title: 'Tour Not Found',
      description: 'The requested tour could not be found.'
    }
  }

  return {
    title: `${tour.title} | Travel Like a Local Japan`,
    description: tour.description || `Experience ${tour.title} with Travel Like a Local Japan`
  }
}

const TourDetailPage: NextPage<Props> = async ({ params }) => {
  const { locale, slug } = await params
  const t = await getTranslations({ locale })
  const client = createApolloClient()

  const { data } = await client.query<GetTourQuery, GetTourQueryVariables>({
    query: GET_TOUR_QUERY,
    variables: {
      slug,
      locale: LOCALE_CODE_MAP[locale]
    }
  })

  const tour = data?.tourCollection?.items[0]

  if (!tour) {
    notFound()
  }

  const breadcrumbs = [
    {
      label: t('Metadata.home'),
      href: '/'
    },
    {
      label: t('ToursPage.title'),
      href: '/tours'
    },
    {
      label: tour.title || '',
      href: `/tours/${tour.slug}`
    }
  ]

  return (
    <>
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <article className="max-w-4xl mx-auto">
          {tour.featuredImage?.url ? (
            <div className="mb-8">
              <ResponsiveImage
                src={tour.featuredImage.url}
                alt={tour.featuredImage.title || tour.title || ''}
                width={tour.featuredImage.width || 800}
                height={tour.featuredImage.height || 600}
                className="rounded-lg"
              />
            </div>
          ) : null}

          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{tour.title}</h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-0">
                <div className="text-center sm:text-left">
                  <span className="text-sm text-gray-600 block">{t('TourDetailPage.price')}</span>
                  <span className="text-2xl font-bold text-primary">¥{tour.price?.toLocaleString() || '0'}</span>
                </div>

                <div className="text-center sm:text-left">
                  <span className="text-sm text-gray-600 block">{t('TourDetailPage.duration')}</span>
                  <span className="text-xl font-semibold text-gray-800">
                    {tour.approximateDuration || 0} {t('TourDetailPage.hours')}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <section className="mb-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{tour.description}</p>
            </div>
          </section>

          <div className="flex justify-center mt-12">
            <Button href="/tours" text={t('TourDetailPage.backToTours')} variant="outline" borderRadius="rounded-md" />
          </div>
        </article>
      </div>
    </>
  )
}

export default TourDetailPage
