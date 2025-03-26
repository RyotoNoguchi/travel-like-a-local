import type { LANGUAGE } from '@/constants'
import type { BreadcrumbItem } from '@/types/breadcrumbs'
import Script from 'next/script'

type Props = {
  locale: LANGUAGE
  breadcrumbs: BreadcrumbItem[]
}

export const BreadcrumbJsonLd: React.FC<Props> = ({ locale, breadcrumbs }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.label,
      item: `${siteUrl}/${locale}${breadcrumb.href}`
    }))
  }

  return <Script id="breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
