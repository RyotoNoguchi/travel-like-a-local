import { createApolloClient } from '@/apolloClient'
import { TourCard } from '@/app/ui/components/atoms/tour-card'
import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { type LANGUAGE, LOCALE_CODE_MAP } from '@/constants'
import type { GetToursQuery, GetToursQueryVariables } from '@/generated/graphql'
import { GET_TOURS_QUERY } from '@/graphql/query'
import classNames from 'classnames'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: LANGUAGE }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: `${t('ToursPage.title')} | Travel Like a Local Japan`,
    description: t('ToursPage.metadataDescription')
  }
}

const ToursPage: NextPage<Props> = async ({ params }) => {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const client = createApolloClient()

  const { data } = await client.query<GetToursQuery, GetToursQueryVariables>({
    query: GET_TOURS_QUERY,
    variables: { locale: LOCALE_CODE_MAP[locale] }
  })

  const tours = data?.tourCollection?.items || []

  const breadcrumbs = [
    {
      label: t('Metadata.home'),
      href: '/'
    },
    {
      label: t('ToursPage.title'),
      href: '/tours'
    }
  ]

  return (
    <>
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <div className="py-8">
          <h1 className="text-4xl font-bold text-center mb-12">{t('ToursPage.title')}</h1>

          <ul className={classNames('grid gap-8 justify-items-center', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}>
            {tours.map(
              (tour) =>
                tour && (
                  <TourCard
                    key={tour.slug}
                    imageUrl={tour.featuredImage?.url || ''}
                    imageAlt={tour.featuredImage?.title || ''}
                    title={tour.title || ''}
                    description={tour.description || ''}
                    price={tour.price || 0}
                    approximateDuration={tour.approximateDuration || 0}
                    href={`/tours/${tour.slug}`}
                    locale={locale}
                  />
                )
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default ToursPage
