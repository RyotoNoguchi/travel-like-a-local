import { createApolloClient } from '@/apolloClient'
import { TourCard } from '@/app/ui/components/atoms/tour-card'
import { type LANGUAGE, LOCALE_CODE_MAP } from '@/constants'
import type { GetToursQuery, GetToursQueryVariables } from '@/generated/graphql'
import { GET_TOURS_QUERY } from '@/graphql/query'
import classNames from 'classnames'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  params: {
    locale: LANGUAGE
  }
}

const ToursPage: FC<Props> = async ({ params: { locale } }) => {
  const t = await getTranslations({ locale })
  const client = createApolloClient()

  const { data } = await client.query<GetToursQuery, GetToursQueryVariables>({
    query: GET_TOURS_QUERY,
    variables: { locale: LOCALE_CODE_MAP[locale] }
  })

  const tours = data?.tourCollection?.items || []

  return (
    <div className="container mx-auto px-4 py-12">
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
  )
}

export default ToursPage
