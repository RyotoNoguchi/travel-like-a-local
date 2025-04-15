import type { NextPage } from 'next'

import { InstagramIcon } from '@/app/ui/components/atoms/icons/instagram-icon'
import { MessengerIcon } from '@/app/ui/components/atoms/icons/messenger-icon'
import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import type { LANGUAGE } from '@/constants'
import { Link } from '@/i18n/routing'
import { getImageById } from '@/utils/assets'
import { ClipboardDocumentListIcon, MapPinIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

export const generateMetadata = async () => {
  // TODO: Add localization for title
  return {
    title: 'About - Travel Like a Local Japan',
    description:
      'Learn about the guide behind Travel Like a Local Japan, offering authentic travel experiences, consulting, booking, and personalized tours across Japan.'
  }
}

type Props = {
  params: {
    locale: LANGUAGE
  }
}

const AboutPage: NextPage<Props> = async ({ params }) => {
  const { locale } = await params
  const instagramUrl = 'https://www.instagram.com/travel_like_a_local.jp'
  const messengerUrl = 'https://m.me/ryoto314.ng'
  const heroImage = await getImageById({ id: '4LrpPOCebvgYbkmmeVl3Ch', width: 1000, height: 563 })
  const breadcrumbsData = [
    { label: 'Home', href: '' },
    { label: 'About', href: '/about' }
  ]

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 pb-12 lg:px-3 pt-2 max-w-screen-lg mx-auto">
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbsData} />
      <div className="w-full">
        <Breadcrumbs breadcrumbs={breadcrumbsData} />
      </div>
      {/* Hero Section */}
      <div className="flex flex-col gap-10 items-center justify-center">
        <section className="text-center flex flex-col items-center justify-center gap-3 w-full -mx-4">
          {heroImage ? <Image src={heroImage.url} alt={heroImage.title} width={1000} height={563} /> : null}
          <div className="w-full flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-none">Travel Like a Local Japan: Your Authentic Journey Begins</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 rounded-lg text-left">
              Hi, I&apos;m Ryoto, founder of Travel Like a Local Japan. As a National Government Licensed Guide Interpreter, I&apos;m passionate about sharing
              the real Japan. This site offers insights for your travels, and I provide personalized trip consulting, booking assistance, and guided tours to
              help you experience Japan authentically.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="flex flex-col bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold text-gray-700">More Than Just a Tour Guide: The Story Behind It All</h2>
          <div className="flex flex-col gap-1 text-gray-600 text-base sm:text-lg md:text-xl">
            <p>
              My journey started with a simple idea: travel is richer when you connect with locals. Inspired by experiences like CouchSurfing and guiding
              friends visiting Japan, I saw how much more meaningful travel becomes when you step off the beaten path and experience a place through local eyes.
            </p>
            <p>
              That&apos;s the heart of &quot;Travel Like a Local Japan.&quot; It&apos;s not just about seeing sights; it&apos;s about understanding the culture,
              discovering hidden gems, and creating genuine memories. As a licensed guide who has explored extensively throughout Japan, I use my firsthand
              knowledge to craft these unique experiences for you.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-center text-gray-700">What &quot;Traveling Like a Local&quot; Means for You</h2>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-800">Trip Consulting</h3>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl text-left">
                Let&apos;s craft an itinerary beyond the guidebooks, tailored to your interests but open to the kind of spontaneous local encounters and hidden
                gems that make a trip truly memorable.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-800">Booking Assistance</h3>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl text-left">
                From navigating complex transport to finding unique stays, I&apos;ll handle the logistics smoothly, freeing you up to simply enjoy the journey
                and embrace unexpected opportunities.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-800">Personalized Guided Tours</h3>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl text-left">
                Go beyond sightseeing. I&apos;ll guide you to authentic experiences, facilitate connections with locals, and help you discover the true heart of
                Japan, just like my own inspiring encounters.
              </p>
            </div>
          </div>
          <p className="text-center text-gray-600 text-base sm:text-lg md:text-xl">
            This website also serves as your resource for planning an authentic Japanese adventure, filled with tips and articles based on real experiences.
          </p>
        </section>

        {/* CTA Section */}
        <section className="flex flex-col gap-4 text-center bg-blue-50 rounded-lg shadow-sm p-4 w-full -mx-4 text-base sm:text-lg md:text-xl">
          <h2 className="text-3xl font-semibold text-gray-700">Ready for Your Adventure? Let&apos;s Plan Your Trip!</h2>
          <div className="flex flex-col gap-1">
            <p className="text-gray-600">Connect with me directly to discuss your dream trip to Japan:</p>
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
            <p className="text-gray-600">Or, continue exploring the site:</p>
            <div className="flex gap-4 justify-center text-lg">
              <Link href="/articles" className="text-blue-600 hover:underline flex items-center gap-0.5">
                <ClipboardDocumentListIcon className="w-6 h-6" />
                Browse Articles
              </Link>
              <Link href="/map" className="text-blue-600 hover:underline flex items-center gap-0.5">
                <MapPinIcon className="w-6 h-6" />
                Explore the Map
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
