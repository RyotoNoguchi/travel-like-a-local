import { createApolloClient } from '@/apolloClient'
import { Card } from '@/app/ui/components/atoms/card'
import { type LANGUAGE, LOCALE_CODE_MAP } from '@/constants'
import type { GetToursQuery, GetToursQueryVariables } from '@/generated/graphql'
import { GET_TOURS_QUERY } from '@/graphql/query'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

type Props = {
  locale: LANGUAGE
}

export const FeaturedToursSection = async ({ locale }: Props) => {
  const t = await getTranslations({ locale })

  const client = createApolloClient()
  const { data } = await client.query<GetToursQuery, GetToursQueryVariables>({
    query: GET_TOURS_QUERY,
    variables: { locale: LOCALE_CODE_MAP[locale] }
  })

  const tours = data?.tourCollection?.items || []

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Our Signature Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.length > 0 &&
            tours
              .slice(0, 1)
              .map(
                (item) =>
                  item && (
                    <Card
                      key={item.slug}
                      imageUrl={item.featuredImage?.url || ''}
                      imageAlt={item.featuredImage?.title || ''}
                      imageWidth={item.featuredImage?.width || 0}
                      imageHeight={item.featuredImage?.height || 0}
                      title={item.title || ''}
                      description={item.description?.substring(0, 100) || ''}
                      href={`/tours/${item.slug}`}
                    />
                  )
              )}
        </div>
        <Link href="/tours" className="inline-block mt-8 bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-700 transition-colors duration-300">
          View All Tours
        </Link>
      </div>
    </section>
  )
}
