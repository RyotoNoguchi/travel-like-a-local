import { COLORS } from '@/app/ui/colors'
import { AreaIcon } from '@/app/ui/components/atoms/icons/area-icon'
import { CategoryIcon } from '@/app/ui/components/atoms/icons/category-icon'
import { FavoriteIcon } from '@/app/ui/components/atoms/icons/favorite-icon'
import { SearchIcon } from '@/app/ui/components/atoms/icons/search-icon'
import { listSocialLinks } from '@/app/utils/socialLinks'
import { type LANGUAGE } from '@/constants'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import { Footer } from './presenter'

type Props = {
  locale: LANGUAGE
  logo: {
    url: string
    title: string
  }
}

export const FooterContainer: FC<Props> = ({ locale, logo }) => {
  const tHeader = useTranslations('NavMenu')
  const tFooter = useTranslations('Footer')
  const navLinks = [
    { icon: <SearchIcon width={24} height={24} color={COLORS.WHITE} />, label: tHeader('search'), href: '/search' },
    { icon: <AreaIcon width={24} height={24} color={COLORS.WHITE} />, label: tHeader('area'), href: '/area' },
    { icon: <CategoryIcon width={24} height={24} color={COLORS.WHITE} />, label: tHeader('category'), href: '/category' },
    { icon: <FavoriteIcon width={24} height={24} color={COLORS.WHITE} />, label: tHeader('favorite'), href: '/favorite' }
  ]

  const socialLinks = listSocialLinks({ width: 32, height: 32 })
  const footerColumnTitles = {
    first: tFooter('first'),
    second: tFooter('second'),
    subtitle: tFooter('subtitle')
  }
  const headerNavLinkTitles = {
    language: tHeader('language')
  }

  return (
    <Footer
      locale={locale}
      logo={logo}
      footerColumnTitles={footerColumnTitles}
      headerNavLinkTitles={headerNavLinkTitles}
      navLinks={navLinks}
      socialLinks={socialLinks}
    />
  )
}
