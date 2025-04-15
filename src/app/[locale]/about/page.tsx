import { InstagramIcon } from '@/app/ui/components/atoms/icons/instagram-icon'
import { MessengerIcon } from '@/app/ui/components/atoms/icons/messenger-icon'
import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import type { LANGUAGE } from '@/constants'
import { Link } from '@/i18n/routing'
import { getImageById } from '@/utils/assets'
import { ClipboardDocumentListIcon, MapPinIcon } from '@heroicons/react/24/solid'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

type Props = {
  params: {
    locale: LANGUAGE
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'AboutPage' })
  return {
    title: t('metadata.title'),
    description: t('metadata.description')
  }
}

const AboutPage: NextPage<Props> = async ({ params }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'AboutPage' })
  const instagramUrl = 'https://www.instagram.com/travel_like_a_local.jp'
  const messengerUrl = 'https://m.me/ryoto314.ng'
  const heroImage = await getImageById({ id: '4LrpPOCebvgYbkmmeVl3Ch', width: 1000, height: 563 })
  const breadcrumbs = [
    { label: t('breadcrumbs.home'), href: '' },
    { label: t('breadcrumbs.about'), href: '/about' }
  ]

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 pb-12 lg:px-3 pt-2 max-w-screen-lg mx-auto">
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <div className="w-full">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      {/* Hero Section */}
      <div className="flex flex-col gap-10 items-center justify-center">
        <section className="text-center flex flex-col items-center justify-center gap-3 w-full -mx-4">
          {heroImage ? <Image src={heroImage.url} alt={heroImage.title} width={1000} height={563} /> : null}
          <div className="w-full flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-none">{t('hero.title')}</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 rounded-lg text-left">{t('hero.intro')}</p>
          </div>
        </section>

        {/* Story Section */}
        <section className="flex flex-col bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold text-gray-700">{t('story.title')}</h2>
          <div className="flex flex-col gap-1 text-gray-600 text-base sm:text-lg md:text-xl">
            <p>{t('story.p1')}</p>
            <p>{t('story.p2')}</p>
          </div>
        </section>

        {/* Services Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-center text-gray-700">{t('services.title')}</h2>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-800">{t('services.consulting.title')}</h3>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl text-left">{t('services.consulting.desc')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-800">{t('services.booking.title')}</h3>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl text-left">{t('services.booking.desc')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-800">{t('services.tours.title')}</h3>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl text-left">{t('services.tours.desc')}</p>
            </div>
          </div>
          <p className="text-center text-gray-600 text-base sm:text-lg md:text-xl">{t('services.websiteResource')}</p>
        </section>

        {/* CTA Section */}
        <section className="flex flex-col gap-4 text-center bg-blue-50 rounded-lg shadow-sm p-4 w-full -mx-4 text-base sm:text-lg md:text-xl">
          <h2 className="text-3xl font-semibold text-gray-700">{t('cta.title')}</h2>
          <div className="flex flex-col gap-1">
            <p className="text-gray-600">{t('cta.connect')}</p>
            <div className="flex justify-center items-center gap-6">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition duration-300 flex items-center gap-2"
              >
                <InstagramIcon width={24} height={24} variant="color" />
                <span className="text-lg font-medium">Instagram</span>
              </a>
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition duration-300 flex items-center gap-2"
              >
                <MessengerIcon width={24} height={24} fill="#0080F7" />
                <span className="text-lg font-medium">Messenger</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-600">{t('cta.explore')}</p>
            <div className="flex gap-4 justify-center text-lg">
              <Link href="/articles" className="text-blue-600 hover:underline flex items-center gap-0.5">
                <ClipboardDocumentListIcon className="w-6 h-6" />
                {t('cta.browseArticles')}
              </Link>
              <Link href="/map" className="text-blue-600 hover:underline flex items-center gap-0.5">
                <MapPinIcon className="w-6 h-6" />
                {t('cta.exploreMap')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
