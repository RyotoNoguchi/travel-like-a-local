import '@/app/globals.css'
import { zain } from '@/app/ui/fonts'
import { Footer } from '@/app/ui/templates/footer'
import { Header } from '@/app/ui/templates/header/'
import { getLogo } from '@/app/utils/logo'
import { EMAIL, LANGUAGE, LOGO_TITLE, PHONE_NUMBER } from '@/constants'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { FC } from 'react'

export const metadata: Metadata = {
  title: {
    template: `%s | ${LOGO_TITLE}`,
    default: LOGO_TITLE
  },
  metadataBase: new URL(process.env.METADATA_BASE_URL || 'https://example.com'),
  alternates: {
    canonical: '/',
    languages: {
      en: LANGUAGE.EN,
      fr: LANGUAGE.FR
    }
  },
  applicationName: LOGO_TITLE,
  authors: [{ name: LOGO_TITLE, url: process.env.METADATA_BASE_URL }],
  generator: 'Next.js',
  referrer: 'no-referrer-when-downgrade',
  openGraph: {
    title: LOGO_TITLE,
    siteName: LOGO_TITLE,
    type: 'website',
    determiner: undefined,
    emails: EMAIL,
    phoneNumbers: PHONE_NUMBER,
    faxNumbers: undefined,
    ttl: 3600
  },
  publisher: LOGO_TITLE,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

const LocaleLayout: FC<Props> = async ({ children, params }) => {
  // See: https://nextjs.org/docs/messages/sync-dynamic-apis#possible-ways-to-fix-it
  const { locale } = await params
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }
  const logo = await getLogo({ width: 500, height: 500 })
  // Providing all messages to the client　side is the easiest way to get started
  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <body className={`${zain.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {logo ? <Header logo={logo} locale={locale as LANGUAGE} /> : null}
          {children}
          {logo ? <Footer logo={logo} locale={locale as LANGUAGE} /> : null}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
