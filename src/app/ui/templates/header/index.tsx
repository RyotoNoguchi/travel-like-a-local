import { COLORS } from '@/app/ui/colors'
import { pacifico } from '@/app/ui/fonts'
import { AreaIcon } from '@/app/ui/icons/area-icon'
import { CategoryIcon } from '@/app/ui/icons/category-icon'
import { FavoriteIcon } from '@/app/ui/icons/favorite-icon'
import { GlobeIcon } from '@/app/ui/icons/globe-icon'
import { SearchIcon } from '@/app/ui/icons/search-icon'
import { HamburgerMenu } from '@/app/ui/templates/header/hamburger-menu'
import { LanguageNavLink } from '@/app/ui/templates/language-nav-link'
import { NavLink } from '@/app/ui/templates/nav-link'
import { getNavLinks } from '@/app/utils/navLink'
import { type LANGUAGE, LOGO_TITLE, LOGO_TITLE_PREFIX, LOGO_TITLE_SUFFIX } from '@/constants'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

type Props = {
  logo: {
    url: string
    title: string
  }
  locale: LANGUAGE
}

export const Header: FC<Props> = ({ logo, locale }) => {
  const t = useTranslations('NavMenu')
  const navLinks = (px: number) =>
    getNavLinks([
      { icon: <SearchIcon width={px} height={px} color={COLORS.GRAY} />, label: t('search'), href: '/search' },
      { icon: <AreaIcon width={px} height={px} color={COLORS.GRAY} />, label: t('area'), href: '/area' },
      { icon: <CategoryIcon width={px} height={px} color={COLORS.GRAY} />, label: t('category'), href: '/category' },
      { icon: <FavoriteIcon width={px} height={px} color={COLORS.GRAY} />, label: t('favorite'), href: '/favorite' }
    ])
  return (
    <header
      className={classNames(
        'relative flex justify-between gap-2 bg-white drop-shadow-md h-14 px-3',
        'sm:justify-between sm:px-1',
        'md:px-2',
        'lg:px-4 lg:justify-between'
      )}
    >
      <h1 className="flex items-center">
        <Link href="/" className="flex items-center gap-2 hover-animation" aria-label={LOGO_TITLE}>
          <Image src={logo.url} alt={logo.title} width={40} height={40} className={classNames('hidden', 'xs:block')} />
          <span className={`${pacifico.className} font-bold text-xl xs:text-2xl flex gap-2 `}>
            {LOGO_TITLE_PREFIX}
            <span className="text-primary">{LOGO_TITLE_SUFFIX}</span>
          </span>
        </Link>
      </h1>
      <div className="flex gap-1">
        <nav className="hidden sm:flex text-xl items-center">
          <ul className="flex items-start gap-2">
            {navLinks(24).map(({ icon, label, href }) => (
              <li key={href}>
                <NavLink key={label} icon={icon} label={label} href={href} gap="gap-0" />
              </li>
            ))}
            <li className="h-7">
              <LanguageNavLink
                icon={<GlobeIcon width={24} height={24} color={COLORS.GRAY} />}
                label={t('language')}
                href="/language"
                locale={locale}
                gap="gap-0"
              />
            </li>
          </ul>
        </nav>
        <HamburgerMenu navLinks={navLinks(32)} locale={locale} />
      </div>
    </header>
  )
}
