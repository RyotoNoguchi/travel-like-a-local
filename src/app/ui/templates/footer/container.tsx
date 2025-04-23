import { COLORS } from '@/app/ui/colors'
import { listSocialLinks } from '@/utils/socialLinks'
import { BriefcaseIcon, EnvelopeIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import { Footer } from './presenter'

type Props = {
  logo: {
    url: string
    title: string
  }
}

export const FooterContainer: FC<Props> = ({ logo }) => {
  const t = useTranslations()
  const navLinks = [
    { icon: <HomeIcon width={24} height={24} color={COLORS.WHITE} />, label: t('Metadata.home'), href: '/' },
    { icon: <UserIcon width={24} height={24} color={COLORS.WHITE} />, label: t('AboutPage.breadcrumbs.about'), href: '/about' },
    { icon: <BriefcaseIcon width={24} height={24} color={COLORS.WHITE} />, label: t('ServicesPage.breadcrumbs.services'), href: '/service-intro' },
    { icon: <EnvelopeIcon width={24} height={24} color={COLORS.WHITE} />, label: t('ServicesPage.contact.title'), href: '/service-intro#contact' }
  ]

  const socialLinks = listSocialLinks({ width: 32, height: 32 })
  const footerColumnTitles = {
    first: t('Footer.first'),
    second: t('Footer.second'),
    subtitle: t('Footer.subtitle')
  }

  return <Footer logo={logo} footerColumnTitles={footerColumnTitles} navLinks={navLinks} socialLinks={socialLinks} />
}
