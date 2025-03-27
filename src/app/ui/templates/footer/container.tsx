import { COLORS } from '@/app/ui/colors'
import { AreaIcon } from '@/app/ui/components/atoms/icons/area-icon'
import { BookmarkIcon } from '@/app/ui/components/atoms/icons/bookmark-icon'
import { CategoryIcon } from '@/app/ui/components/atoms/icons/category-icon'
import { SearchIcon } from '@/app/ui/components/atoms/icons/search-icon'
import { listSocialLinks } from '@/utils/socialLinks'
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
    { icon: <SearchIcon width={24} height={24} color={COLORS.WHITE} />, label: t('NavMenu.search'), href: '/search' },
    { icon: <AreaIcon width={24} height={24} color={COLORS.WHITE} />, label: t('NavMenu.area'), href: '/area' },
    { icon: <CategoryIcon width={24} height={24} color={COLORS.WHITE} />, label: t('NavMenu.category'), href: '/category' },
    {
      icon: <BookmarkIcon width={24} height={24} strokeColor={COLORS.WHITE} fillColor={COLORS.TRANSPARENT} strokeWidth={2} />,
      label: t('NavMenu.bookmarks'),
      href: '/bookmarks'
    }
  ]

  const socialLinks = listSocialLinks({ width: 32, height: 32 })
  const footerColumnTitles = {
    first: t('Footer.first'),
    second: t('Footer.second'),
    subtitle: t('Footer.subtitle')
  }

  return <Footer logo={logo} footerColumnTitles={footerColumnTitles} navLinks={navLinks} socialLinks={socialLinks} />
}
