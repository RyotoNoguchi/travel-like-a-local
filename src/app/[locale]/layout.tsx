import '@/app/globals.css'
import AuthProvider from '@/app/providers'
import { zain } from '@/app/ui/fonts'
import { FooterContainer } from '@/app/ui/templates/footer/container'
import { HeaderContainer } from '@/app/ui/templates/header/container'
import { LayoutWrapper } from '@/app/ui/templates/layout-wrapper'
import { EMAIL, LANGUAGE, LOGO_TITLE, PHONE_NUMBER, TWITTER_HANDLE, TWITTER_ID } from '@/constants'
import { routing } from '@/i18n/routing'
import { getLogo } from '@/utils/logo'
import classNames from 'classnames'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { FC } from 'react'

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const logo = await getLogo({ width: 192, height: 192 })
  const manifestUrl = `${process.env.METADATA_BASE_URL}/api/manifest?locale=${locale}`
  const keywords = t('keywords')
    .split(',')
    .map((keyword) => keyword.trim())
  return {
    title: {
      template: `%s | ${LOGO_TITLE}`,
      default: LOGO_TITLE
    },
    metadataBase: new URL(process.env.METADATA_BASE_URL || 'https://example.com'),
    manifest: manifestUrl,
    keywords,
    alternates: {
      canonical: '/',
      languages: {
        en: LANGUAGE.EN,
        fr: LANGUAGE.FR
      }
    },
    applicationName: LOGO_TITLE,
    authors: [{ name: LOGO_TITLE, url: process.env.METADATA_BASE_URL }],
    icons: [{ rel: 'icon', url: logo?.url ?? '' }],
    generator: 'Next.js',
    creator: t('creator'),
    referrer: 'no-referrer-when-downgrade',
    openGraph: {
      title: LOGO_TITLE,
      siteName: LOGO_TITLE,
      locale: t('locale'),
      alternateLocale: t('alternateLocale'),
      url: `${new URL(process.env.METADATA_BASE_URL || 'https://example.com')}${locale}`,
      countryName: t('countryName'),
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
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      siteId: TWITTER_ID,
      creator: TWITTER_HANDLE,
      creatorId: TWITTER_ID,
      description: t('manifestDescription'),
      title: LOGO_TITLE,
      images: [{ url: logo?.url ?? '', alt: LOGO_TITLE }]
    },
    // TODO: Add facebook
    facebook: undefined,
    // TODO: Add verification
    verification: undefined,
    // TODO: Add appleWebApp
    appleWebApp: undefined,
    // TODO: Add viewport
    viewport: undefined,
    // TODO: Add formatDetection
    formatDetection: undefined,
    // TODO: Add itunes
    itunes: undefined,
    // TODO: Add appLinks
    appLinks: undefined,
    // TODO: Add archives
    archives: undefined,
    // TODO: Add assets
    assets: undefined,
    // TODO: Add bookmarks
    bookmarks: undefined,
    // TODO: Add category
    category: undefined,
    // TODO: Add classification
    classification: undefined
    // TODO: Add other
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
      <body className={classNames(zain.className, 'antialiased')}>
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            <LayoutWrapper
              header={logo !== null && logo !== undefined && <HeaderContainer logo={logo} locale={locale as LANGUAGE} />}
              footer={logo !== null && logo !== undefined && <FooterContainer logo={logo} />}
            >
              {children}
            </LayoutWrapper>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
