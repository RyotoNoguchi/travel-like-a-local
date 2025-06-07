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

          <section className="mb-8">
            {/* Featured Badge */}
            {Boolean(tour.isFeatured) && (
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                  {t('TourDetailPage.featuredTour')}
                </span>
              </div>
            )}

            <h1 className="text-4xl font-bold text-gray-900 mb-6">{tour.title}</h1>

            {/* Short Description */}
            {Boolean(tour.shortDescription) && <p className="text-lg text-gray-700 mb-6 leading-relaxed">{tour.shortDescription}</p>}

            {/* Enhanced Info Card */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Price */}
                <div className="text-center sm:text-left">
                  <span className="text-sm text-gray-600 block">{t('TourDetailPage.price')}</span>
                  <span className="text-2xl font-bold text-primary">¥{tour.price?.toLocaleString() || '0'}</span>
                </div>

                {/* Duration */}
                <div className="text-center sm:text-left">
                  <span className="text-sm text-gray-600 block">{t('TourDetailPage.duration')}</span>
                  <span className="text-xl font-semibold text-gray-800">
                    {tour.approximateDuration || 0} {t('TourDetailPage.hours')}
                  </span>
                </div>

                {/* Participants */}
                {Boolean(tour.minParticipants || tour.maxParticipants) && (
                  <div className="text-center sm:text-left">
                    <span className="text-sm text-gray-600 block">{t('TourDetailPage.participants')}</span>
                    <span className="text-xl font-semibold text-gray-800">
                      {tour.minParticipants && tour.maxParticipants
                        ? `${tour.minParticipants}-${tour.maxParticipants}`
                        : tour.minParticipants || tour.maxParticipants}{' '}
                      {t('TourDetailPage.people')}
                    </span>
                  </div>
                )}

                {/* Location */}
                {Boolean(tour.location) && (
                  <div className="text-center sm:text-left">
                    <span className="text-sm text-gray-600 block">{t('TourDetailPage.location')}</span>
                    <span className="text-xl font-semibold text-gray-800">{tour.location}</span>
                  </div>
                )}

                {/* Instructor */}
                {Boolean(tour.instructor) && (
                  <div className="text-center sm:text-left">
                    <span className="text-sm text-gray-600 block">{t('TourDetailPage.instructor')}</span>
                    <span className="text-xl font-semibold text-gray-800">{tour.instructor}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          {Boolean(tour.galleryImagesCollection?.items?.length) && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('TourDetailPage.gallery')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tour.galleryImagesCollection?.items?.map((image, index) =>
                  image?.url ? (
                    <div key={index} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                      <ResponsiveImage
                        src={image.url}
                        alt={`Gallery image ${index + 1}`}
                        width={image.width || 400}
                        height={image.height || 300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : null
                )}
              </div>
            </section>
          )}

          {/* Full Description Section */}
          {Boolean(tour.fullDescription?.json) && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('TourDetailPage.fullDescription')}</h2>
              <div className="prose prose-lg max-w-none">
                {/* TODO: Add RichText component to render fullDescription.json */}
                <p className="text-gray-700 leading-relaxed">Rich text content will be displayed here when RichText component is implemented</p>
              </div>
            </section>
          )}

          {/* Key Highlights Section */}
          {Boolean(tour.keyHighlights?.length) && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('TourDetailPage.keyHighlights')}</h2>
              <ul className="space-y-3">
                {tour.keyHighlights?.map((highlight, index) =>
                  highlight ? (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ) : null
                )}
              </ul>
            </section>
          )}

          {/* Inclusions & Exclusions Section */}
          {Boolean(tour.inclusions?.length || tour.exclusions?.length) && (
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inclusions */}
                {Boolean(tour.inclusions?.length) && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t('TourDetailPage.inclusions')}</h3>
                    <ul className="space-y-2">
                      {tour.inclusions?.map((inclusion, index) =>
                        inclusion ? (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">✓</span>
                            <span className="text-gray-700">{inclusion}</span>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                )}

                {/* Exclusions */}
                {Boolean(tour.exclusions?.length) && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t('TourDetailPage.exclusions')}</h3>
                    <ul className="space-y-2">
                      {tour.exclusions?.map((exclusion, index) =>
                        exclusion ? (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2 mt-1">✗</span>
                            <span className="text-gray-700">{exclusion}</span>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Original Description Section as fallback */}
          {Boolean(tour.description) && (
            <section className="mb-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{tour.description}</p>
              </div>
            </section>
          )}

          <div className="flex justify-center mt-12">
            <Button href="/tours" text={t('TourDetailPage.backToTours')} variant="outline" borderRadius="rounded-md" />
          </div>
        </article>
      </div>
    </>
  )
}

export default TourDetailPage
