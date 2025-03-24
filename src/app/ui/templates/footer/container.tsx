import { COLORS } from '@/app/ui/colors'
import { AreaIcon } from '@/app/ui/components/atoms/icons/area-icon'
import { BookmarkIcon } from '@/app/ui/components/atoms/icons/bookmark-icon'
import { CategoryIcon } from '@/app/ui/components/atoms/icons/category-icon'
import { SearchIcon } from '@/app/ui/components/atoms/icons/search-icon'
import { type LANGUAGE } from '@/constants'
import { listSocialLinks } from '@/utils/socialLinks'
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
    { icon: <BookmarkIcon width={24} height={24} color={COLORS.WHITE} fillColor={COLORS.TRANSPARENT} />, label: tHeader('bookmarks'), href: '/bookmarks' }
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
