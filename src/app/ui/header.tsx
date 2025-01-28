import { FC } from 'react'
import { pacifico } from '@/app/ui/fonts'
import { LANGUAGE, LOGO_TITLE, LOGO_TITLE_PREFIX, LOGO_TITLE_SUFFIX } from '@/constants'
import { AreaIcon } from '@/app/ui/icons/area-icon'
import { CategoryIcon } from '@/app/ui/icons/category-icon'
import { SearchIcon } from '@/app/ui/icons/search-icon'
import { FavoriteIcon } from '@/app/ui/icons/favorite-icon'
import { NavLink } from '@/app/ui/nav-link'
import { useTranslations } from 'next-intl'
import { GlobeIcon } from '@/app/ui/icons/globe-icon'
import { LanguageNavLink } from '@/app/ui/language-nav-link'
import { NavLinkType } from '@/types/navLinks'
import { HamburgerMenu } from '@/app/ui/hamburger-menu'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'

type Props = {
  logo: {
    url: string
    title: string
  }
  locale: LANGUAGE
}

export const Header: FC<Props> = ({ logo, locale }) => {
  const t = useTranslations('Header')
  const getNavLinks = (width: number, height: number): NavLinkType[] => [
    { icon: <AreaIcon width={width} height={height} />, label: t('area'), href: '/area' },
    { icon: <CategoryIcon width={width} height={height} />, label: t('category'), href: '/category' },
    { icon: <SearchIcon width={width} height={height} />, label: t('search'), href: '/search' },
    { icon: <FavoriteIcon width={width} height={height} />, label: t('favorite'), href: '/favorite' }
  ]
  return (
    <header className={classNames('relative flex justify-between gap-2 bg-white drop-shadow-md h-14 px-3', 'sm:justify-between sm:px-1', 'md:px-2', 'lg:px-4 lg:justify-between')}>
      <h1 className='flex items-center'>
        <Link href='/' className='flex items-center gap-2 hover-animation' aria-label={LOGO_TITLE}>
          <Image src={logo.url} alt={logo.title} width={40} height={40} className={classNames('hidden', 'xs:block')} />
          <span className={`${pacifico.className} font-bold text-xl xs:text-2xl flex gap-2 `}>
            {LOGO_TITLE_PREFIX}
            <span className='text-primary'>{LOGO_TITLE_SUFFIX}</span>
          </span>
        </Link>
      </h1>
      <div className='flex gap-1'>
        <nav className='hidden sm:flex text-xl items-center'>
          <ul className='flex items-start gap-2'>
            {getNavLinks(24, 24).map(({ icon, label, href }) => (
              <li key={href}>
                <NavLink key={label} icon={icon} label={label} href={href} />
              </li>
            ))}
            <li className='h-7'>
              <LanguageNavLink icon={<GlobeIcon width={24} height={24} />} label={t('language')} href='/language' locale={locale} />
            </li>
          </ul>
        </nav>
        <HamburgerMenu navLinks={getNavLinks(36, 36)} locale={locale} />
      </div>
    </header>
  )
}
