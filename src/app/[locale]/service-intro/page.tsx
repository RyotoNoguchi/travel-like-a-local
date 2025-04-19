import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import type { LANGUAGE } from '@/constants'
import { Link } from '@/i18n/routing'
import { getImageById } from '@/utils/assets'
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

const HERO_IMAGE_ID = '2AM6uYinV5m9K4PKBKroWs'
const PORTRAIT_IMAGE_ID = '2I6HjTmgfo41UYj57BqOtH'

type Props = {
  params: {
    locale: LANGUAGE
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ServicesPage' })
  return {
    title: t('metadata.title'),
    description: t('metadata.description')
  }
}

const ServiceIntroductionPage: NextPage<Props> = async ({ params }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ServicesPage' })
  const breadcrumbs = [
    { label: t('breadcrumbs.home'), href: '' },
    { label: t('breadcrumbs.services'), href: '/services' }
  ]
  const instagramUrl = 'https://www.instagram.com/travel_like_a_local.jp'
  const messengerUrl = 'https://m.me/ryoto314.ng'
  const heroImage = await getImageById({ id: HERO_IMAGE_ID, width: 1000, height: 564 })
  const guideImage = await getImageById({ id: PORTRAIT_IMAGE_ID, width: 500, height: 500 })

  // 例のテスティモニアル画像
  const testimonial1Image = await getImageById({ id: 'testimonial1ID', width: 80, height: 80 })
  const testimonial2Image = await getImageById({ id: 'testimonial2ID', width: 80, height: 80 })

  // サービスプロセスの各ステップ
  const serviceProcess = [
    { number: 1, title: 'Initial Consultation', description: 'We start with a free Google Meet call to understand your travel preferences and needs.' },
    { number: 2, title: 'Custom Plan Draft', description: 'Based on your input, I create a tailored travel plan designed specifically for you.' },
    { number: 3, title: 'Plan Refinement', description: 'We review the plan together and make adjustments until it perfectly matches your vision.' },
    { number: 4, title: 'Booking & Arrangements', description: 'I handle all bookings and logistics, ensuring everything is set for your arrival.' },
    { number: 5, title: 'Guided Experience', description: 'I accompany you throughout your journey, providing guidance, translation, and local insights.' }
  ]

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 pb-12 lg:px-3 pt-2 max-w-screen-lg mx-auto">
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <div className="w-full">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* 1. Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden rounded-xl">
        {heroImage ? <Image src={heroImage.url} alt={heroImage.title} fill className="object-cover brightness-75" priority /> : null}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">{t('hero.title')}</h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mb-8">{t('hero.intro')}</p>
          <a href="#contact" className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-full text-lg hover:bg-blue-50 transition duration-300 shadow-lg">
            Plan Your Authentic Journey
          </a>
        </div>
      </section>

      {/* 2. Guide Introduction */}
      <section className="w-full grid md:grid-cols-2 gap-8 py-12 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-800">Your Licensed Guide to Authentic Japan</h2>
          <p className="text-lg text-gray-600">
            Hi, I&apos;m Ryoto, a National Government Licensed Guide Interpreter passionate about sharing the real Japan beyond tourist spots.
          </p>
          <p className="text-lg text-gray-600">
            After years of guiding visitors and living as both a local and traveler, I&apos;ve created a service that bridges cultural gaps and offers truly
            immersive experiences.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://instagram.com/travel_like_a_local.jp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
          {guideImage ? (
            <Image src={guideImage.url} alt="Ryoto - Licensed Japan Tour Guide" fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Guide Image</span>
            </div>
          )}
        </div>
      </section>

      {/* 3. Service Features */}
      <section className="w-full py-12 bg-gray-50 rounded-xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('overview.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('overview.description')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fully Customized Itineraries</h3>
            <p className="text-gray-600">Tailored specifically for experienced Japan travelers seeking authentic experiences.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Access to Hidden Gems</h3>
            <p className="text-gray-600">Discover places only known to locals and experience Japan beyond the typical tourist route.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Language & Cultural Bridge</h3>
            <p className="text-gray-600">Break through language barriers and cultural differences with expert guidance.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Extended Stay Support</h3>
            <p className="text-gray-600">Comprehensive assistance for longer journeys (2+ weeks) for deep cultural immersion.</p>
          </div>
        </div>
      </section>

      {/* 4. Service Process */}
      <section className="w-full py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">How We&apos;ll Create Your Authentic Japan Experience</h2>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>

          <div className="space-y-12">
            {serviceProcess.map((step, index) => (
              <div key={step.number} className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:translate-y-6 z-10 hidden md:block">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">{step.number}</div>
                </div>

                <div className={`md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:order-2'}`}>
                  <div className="bg-white rounded-lg shadow-md p-6 max-w-sm flex flex-col gap-4">
                    <div className="flex justify-center md:hidden">
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">{step.number}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl text-center font-semibold text-gray-800 md:mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>

                <div className={`md:w-1/2 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>{/* Empty div for layout */}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Service Details */}
      <section className="w-full py-12 bg-gray-50 rounded-xl px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t('services.title')}</h2>

        <div className="space-y-12">
          {/* Service 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-3 gap-0">
              <div className="md:col-span-1 bg-blue-600 text-white p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">{t('services.consulting.title')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{t('services.consulting.feature1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{t('services.consulting.feature2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{t('services.consulting.feature3')}</span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-2 p-8">
                <p className="text-gray-600 mb-6 text-lg">{t('services.consulting.description')}</p>
                <a href="#contact" className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-800 group">
                  {t('services.consulting.cta')}
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-3 gap-0">
              <div className="md:col-span-1 bg-green-600 text-white p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">{t('services.booking.title')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{t('services.booking.feature1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{t('services.booking.feature2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{t('services.booking.feature3')}</span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-2 p-8">
                <p className="text-gray-600 mb-6 text-lg">{t('services.booking.description')}</p>
                <a href="#contact" className="inline-flex items-center gap-1 text-green-600 font-semibold hover:text-green-800 group">
                  {t('services.booking.cta')}
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-3 gap-0">
              <div className="md:col-span-1 bg-purple-600 text-white p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">{t('services.tours.title')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{t('services.tours.feature1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{t('services.tours.feature2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{t('services.tours.feature3')}</span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-2 p-8">
                <p className="text-gray-600 mb-6 text-lg">{t('services.tours.description')}</p>
                <a href="#contact" className="inline-flex items-center gap-1 text-purple-600 font-semibold hover:text-purple-800 group">
                  {t('services.tours.cta')}
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="w-full py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{t('testimonials.title')}</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 relative">
            <div className="absolute -top-5 left-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                {testimonial1Image ? (
                  <Image src={testimonial1Image.url} alt={t('testimonials.traveler1.name')} width={80} height={80} className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200"></div>
                )}
              </div>
            </div>
            <div className="pt-8">
              <p className="text-gray-600 italic mb-4">&quot;{t('testimonials.traveler1.quote')}&quot;</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{t('testimonials.traveler1.name')}</p>
                  <p className="text-gray-500 text-sm">{t('testimonials.traveler1.country')}</p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 relative">
            <div className="absolute -top-5 left-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                {testimonial2Image ? (
                  <Image src={testimonial2Image.url} alt={t('testimonials.traveler2.name')} width={80} height={80} className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200"></div>
                )}
              </div>
            </div>
            <div className="pt-8">
              <p className="text-gray-600 italic mb-4">&quot;{t('testimonials.traveler2.quote')}&quot;</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{t('testimonials.traveler2.name')}</p>
                  <p className="text-gray-500 text-sm">{t('testimonials.traveler2.country')}</p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section - Simplified */}
      <section className="w-full py-12 bg-gray-50 rounded-xl px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">How does the booking process work?</h3>
            <p className="text-gray-600">
              We start with a free consultation call to understand your needs, then create a custom itinerary proposal. Once approved, we handle all the
              bookings and provide you with a final detailed plan.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">What is the typical cost for your services?</h3>
            <p className="text-gray-600">
              Our services are customized based on your specific needs, trip duration, and complexity. Guided tour services typically start from $500 USD per
              day, with discounts available for longer bookings.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">What languages do you speak?</h3>
            <p className="text-gray-600">I am fluent in English and Japanese, and can communicate at a basic level in French.</p>
          </div>
        </div>
      </section>

      {/* 8. Contact Form */}
      <section id="contact" className="w-full py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t('cta.title')}</h2>
          <p className="text-gray-600 text-center mb-8">{t('cta.description')}</p>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us about your travel plans and how we can help..."
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-700 transition duration-300 shadow-md">
                {t('cta.contactButton')}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready for Your Authentic Japan Adventure?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">Limited availability for the upcoming season. Secure your personalized Japan experience today!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition duration-300 shadow-md">
            Contact Now
          </a>
          <Link
            href="/about"
            className="border-2 border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Learn More About Me
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ServiceIntroductionPage
