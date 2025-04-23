import { InstagramIcon } from '@/app/ui/components/atoms/icons/instagram-icon'
import { MessengerIcon } from '@/app/ui/components/atoms/icons/messenger-icon'
import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { PROFILE_IMAGE_ID, type LANGUAGE } from '@/constants'
import { Link } from '@/i18n/routing'
import { getImageById } from '@/utils/assets'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

const SATOYAMA_LINK = 'https://satoyama-experience.com/'
const INSTAGRAM_LINK = 'https://www.instagram.com/travel_like_a_local.jp'
const MESSENGER_LINK = 'https://m.me/ryoto314.ng'
const HERO_IMAGE_ID = '4LrpPOCebvgYbkmmeVl3Ch'

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
  const instagramUrl = INSTAGRAM_LINK
  const messengerUrl = MESSENGER_LINK
  const heroImage = await getImageById({ id: HERO_IMAGE_ID, width: 1000, height: 563 })
  const portraitImage = await getImageById({ id: PROFILE_IMAGE_ID, width: 500, height: 500 })
  const breadcrumbs = [
    { label: t('breadcrumbs.home'), href: '' },
    { label: t('breadcrumbs.about'), href: '/about' }
  ]

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 pb-12 lg:px-3 pt-2 max-w-screen-lg mx-auto">
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <div className="w-full">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden rounded-xl">
        {heroImage ? <Image src={heroImage.url} alt={heroImage.title} fill className="object-cover brightness-75" priority /> : null}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">{t('hero.title')}</h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl">{t('hero.intro')}</p>
        </div>
      </section>

      {/* My Story Section */}
      <section className="w-full grid md:grid-cols-2 gap-8 py-12 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-800">{t('story.title')}</h2>
          <p className="text-lg text-gray-600">{t('story.p1')}</p>
          <p className="text-lg text-gray-600">{t('story.p2')}</p>
        </div>
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
          {portraitImage ? <Image src={portraitImage.url} alt="Ryoto - Licensed Japan Tour Guide" fill className="object-cover" /> : null}
        </div>
      </section>

      {/* My Philosophy Section */}
      <section className="w-full py-12 bg-gray-50 rounded-xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('philosophy.title') || 'My Travel Philosophy'}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('philosophy.description') || 'What makes travel truly meaningful and how I approach showing others the real Japan'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-primary-100 p-3 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('philosophy.value1.title') || 'Connect With Locals'}</h3>
            <p className="text-gray-600">
              {t('philosophy.value1.description') ||
                'True travel experiences come from meaningful connections with locals who share their culture and daily life.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-primary-100 p-3 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('philosophy.value2.title') || 'Beyond Tourist Spots'}</h3>
            <p className="text-gray-600">
              {t('philosophy.value2.description') || 'The real magic of Japan lies beyond guidebooks in the everyday places where authentic culture thrives.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-primary-100 p-3 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('philosophy.value3.title') || 'Sustainable Travel'}</h3>
            <p className="text-gray-600">
              {t('philosophy.value3.description') ||
                'I believe in travel that respects local communities, supports small businesses, and preserves cultural traditions.'}
            </p>
          </div>
        </div>
      </section>

      {/* My Background Section */}
      <section className="w-full py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t('background.title') || 'My Background & Qualifications'}</h2>

        <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="bg-primary-100 p-2 rounded-full h-min">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {t('background.qualification1.title') || 'Licensed National Government Guide Interpreter'}
                </h3>
                <p className="text-gray-600">
                  {t('background.qualification1.description') ||
                    'Official certification by the Japanese government to provide guide and interpretation services to foreign visitors.'}
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="bg-primary-100 p-2 rounded-full h-min">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{t('background.qualification2.title') || 'Multilingual Communication'}</h3>
                <p className="text-gray-600">
                  {t('background.qualification2.description') ||
                    'Fluent in Japanese, English, and conversational French, allowing me to bridge cultural and language barriers effectively.'}
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="bg-primary-100 p-2 rounded-full h-min">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{t('background.qualification3.title') || 'Extensive Travel Experience'}</h3>
                <p className="text-gray-600">
                  {t('background.qualification3.description') ||
                    'Experienced traveler through Japan and internationally, with deep knowledge of what makes travel experiences meaningful and memorable.'}
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="bg-primary-100 p-2 rounded-full h-min">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{t('background.qualification4.title')}</h3>
                <p className="text-gray-600">
                  {t('background.qualification4.descriptionPart1')}
                  <a href={SATOYAMA_LINK} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    {t('background.qualification4.satoyamaText')}
                  </a>
                  {t('background.qualification4.descriptionPart2')}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-primary-600 to-orange-500 rounded-xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">{t('cta.connect')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/service-intro"
            className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition duration-300 shadow-md flex justify-center items-center"
          >
            {t('cta.serviceButton') || 'View My Services'}
          </Link>
          <div className="flex gap-4">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white p-3 rounded-full hover:bg-white hover:text-primary-600 transition"
            >
              <InstagramIcon width={24} height={24} variant="white" />
            </a>
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white p-3 rounded-full hover:bg-white hover:text-primary-600 transition"
            >
              <MessengerIcon width={24} height={24} fill="currentColor" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
