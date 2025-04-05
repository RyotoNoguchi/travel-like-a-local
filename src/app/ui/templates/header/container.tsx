import { COLORS } from '@/app/ui/colors'
import { AreaIcon } from '@/app/ui/components/atoms/icons/area-icon'
import { BookmarkIcon } from '@/app/ui/components/atoms/icons/bookmark-icon'
import { CategoryIcon } from '@/app/ui/components/atoms/icons/category-icon'
import { MapIcon } from '@/app/ui/components/atoms/icons/map-icon'
import { SearchIcon } from '@/app/ui/components/atoms/icons/search-icon'
import { Header } from '@/app/ui/templates/header/presenter'
import { BOOKMARKS_PATH, type LANGUAGE } from '@/constants'
import type { Category } from '@/types/category'
import { getCategories, getRegionsHierarchy } from '@/utils/concept-helper'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  logo: {
    url: string
    title: string
  }
  locale: LANGUAGE
}

export const HeaderContainer: FC<Props> = async ({ logo, locale }) => {
  const t = await getTranslations({ locale })
  const regionsHierarchy = await getRegionsHierarchy()
  const categories = await getCategories(locale)
  const topLevelCategories: Category[] = categories.filter((category) => category.parentIds.length === 0)

  const listNavLinks = (px: number) => [
    { icon: <SearchIcon width={px} height={px} color={COLORS.GRAY} />, label: t('NavMenu.search'), href: '/search' },
    { icon: <MapIcon width={px} height={px} color={COLORS.GRAY} />, label: t('NavMenu.map'), href: '/map' },
    { icon: <AreaIcon width={px} height={px} color={COLORS.GRAY} />, label: t('NavMenu.area'), href: '/#', isRegion: true },
    {
      icon: <CategoryIcon width={px} height={px} color={COLORS.GRAY} />,
      label: t('NavMenu.category'),
      href: '#',
      isCategory: true
    },
    {
      icon: <BookmarkIcon width={px} height={px} strokeColor={COLORS.GRAY} fillColor={COLORS.TRANSPARENT} strokeWidth={2} />,
      label: t('NavMenu.bookmarks'),
      href: `/${BOOKMARKS_PATH}`
    }
  ]
  return (
    <Header
      logo={logo}
      locale={locale}
      categories={topLevelCategories}
      regionsHierarchy={regionsHierarchy}
      navLinks={listNavLinks(24)}
      hamburgerMenuNavLinks={listNavLinks(32)}
      languageTitle={t('NavMenu.language')}
      subtitle={t('Footer.subtitle')}
    />
  )
}
