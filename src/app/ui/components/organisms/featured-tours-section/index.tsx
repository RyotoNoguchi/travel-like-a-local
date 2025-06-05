import { createApolloClient } from '@/apolloClient'
import { Button } from '@/app/ui/components/atoms/button'
import { Card } from '@/app/ui/components/atoms/card'
import { type LANGUAGE, LOCALE_CODE_MAP } from '@/constants'
import type { GetToursQuery, GetToursQueryVariables } from '@/generated/graphql'
import { GET_TOURS_QUERY } from '@/graphql/query'
import classNames from 'classnames'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
}

export const FeaturedToursSection: FC<Props> = async ({ locale }) => {
  const t = await getTranslations({ locale })
  const client = createApolloClient()
  const { data } = await client.query<GetToursQuery, GetToursQueryVariables>({
    query: GET_TOURS_QUERY,
    variables: { locale: LOCALE_CODE_MAP[locale] }
  })

  const tours = data?.tourCollection?.items || []

  return (
    <section className="py-12 w-full">
      <div className="text-center flex flex-col gap-5">
        <h2 className="text-3xl font-semibold">{t('FeaturedToursSection.title')}</h2>
        <ul className={classNames('flex flex-col gap-4 items-center', 'md:flex-row md:justify-center md:gap-8')}>
          {tours.length > 0 &&
            tours.map(
              (item) =>
                item && (
                  <Card
                    key={item.slug}
                    imageUrl={item.featuredImage?.url || ''}
                    imageAlt={item.featuredImage?.title || ''}
                    title={item.title || ''}
                    description={item.description?.substring(0, 100) || ''}
                    href={`/tours/${item.slug}`}
                    linkButtonText={t('FeaturedToursSection.linkButtonText')}
                  />
                )
            )}
        </ul>
        <div className="w-fit mx-auto">
          <Button borderRadius="rounded-md" text={t('FeaturedToursSection.viewAllTours')} href="/tours" />
        </div>
      </div>
    </section>
  )
}
