import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs' // Assuming this can be used server-side
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { type LANGUAGE } from '@/constants'
import { Link } from '@/i18n/routing'
import { MapIcon, MapPinIcon } from '@heroicons/react/24/outline' // Assuming you have heroicons installed
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: LANGUAGE }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return {
    title: t('MapPage.title'),
    description: t('MapPage.metadataDescription')
  }
}

const MapPage: NextPage<Props> = async ({ params }) => {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const breadcrumbs = [
    { label: t('Metadata.home'), href: '' },
    { label: t('MapPage.map'), href: '/map' }
  ]

  return (
    <>
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <div className="container mx-auto px-4 pt-2 pb-16">
        <div className="mb-6">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">{t('MapPage.exploreTitle')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            href="/map/regions"
            className="block p-6 border rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center hover:border-primary"
          >
            <MapIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">{t('MapPage.exploreByRegionTitle')}</h2>
            <p className="text-gray-600">{t('MapPage.exploreByRegionDescription')}</p>
          </Link>

          <Link
            href="/map/prefectures"
            className="block p-6 border rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center hover:border-secondary"
          >
            <MapPinIcon className="h-16 w-16 mx-auto mb-4 text-secondary" />
            <h2 className="text-xl font-semibold mb-2">{t('MapPage.exploreByPrefectureTitle')}</h2>
            <p className="text-gray-600">{t('MapPage.exploreByPrefectureDescription')}</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default MapPage
