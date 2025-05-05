'use client'
import { LoginStatus } from '@/app/ui/components/molecules/login-status'
import { PopupContainer } from '@/app/ui/components/molecules/popup/container'
import { CategoryNav } from '@/app/ui/templates/header/category-nav'
import { HamburgerMenu } from '@/app/ui/templates/header/hamburger-menu'
import { CategoriesNav } from '@/app/ui/templates/header/sub-header/categories-nav'
import { Logo } from '@/app/ui/templates/logo'
import { NavLink } from '@/app/ui/templates/nav-link'
import { BOOKMARKS_PATH, LOGO_TITLE, type LANGUAGE } from '@/constants'
import { Link, useRouter } from '@/i18n/routing'
import type { ButtonConfig } from '@/types/button'
import type { Category } from '@/types/category'
import type { NavLinkType } from '@/types/navLinks'
import type { RegionHierarchy } from '@/types/region'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRef, useState, type FC } from 'react'
import { RegionNav } from './region-nav'
import { SearchBar } from './search-bar'
import { RegionsNav } from './sub-header/regions-nav'

type Props = {
  categories: Category[]
  regionsHierarchy: RegionHierarchy[]
  locale: LANGUAGE
  navLinks: NavLinkType[]
  subtitle: string
  logo: {
    url: string
    title: string
  }
  hamburgerMenuNavLinks: NavLinkType[]
  languageTitle: string
}

export const Header: FC<Props> = ({ logo, locale, subtitle, categories, navLinks, hamburgerMenuNavLinks, languageTitle, regionsHierarchy }) => {
  const [isCategoryNavVisible, setIsCategoryNavVisible] = useState(false)
  const [isRegionNavVisible, setIsRegionNavVisible] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  const t = useTranslations()
  const { data: session } = useSession()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    if (session) {
      router.push(href)
    } else {
      setIsPopupOpen(true)
    }
  }

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSearchVisible(true)
    // 入力フィールドが表示された後にフォーカスを当てる
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, 100)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchVisible(false)
      setSearchQuery('')
    }
  }

  const popupButtons: ButtonConfig[] = [
    { text: t('Popup.cancel'), onClick: () => {}, variant: 'secondary' },
    { text: t('Popup.login'), onClick: () => router.push(`/${BOOKMARKS_PATH}`), variant: 'primary' }
  ]

  return (
    <>
      <header
        className={classNames(
          'fixed top-0 left-0 right-0 z-30',
          'flex justify-between gap-2 bg-white drop-shadow-md h-14 px-3',
          'sm:justify-between sm:px-1',
          'md:px-2',
          'lg:px-4 lg:justify-between'
        )}
      >
        <Link href="/" className="flex items-center gap-2 hover-animation" aria-label={LOGO_TITLE}>
          <Logo logo={logo} subtitle={subtitle} />
        </Link>
        <div className="flex gap-2 items-center">
          {isSearchVisible === true && (
            <SearchBar
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              onSubmit={handleSearchSubmit}
              onClose={() => {
                setIsSearchVisible(false)
                setSearchQuery('')
              }}
              inputRef={searchInputRef}
            />
          )}
          <nav className={classNames('hidden sm:flex text-xl items-center', isSearchVisible && 'sm:hidden xl:flex')}>
            <ul className="flex items-start gap-4 h-6">
              {navLinks.map(({ icon, label, href, isCategory, isRegion, isSearch }) => (
                <li key={href}>
                  {isCategory ? (
                    <CategoryNav icon={icon} label={label} href={href} gap="gap-0" isNavVisible={isCategoryNavVisible} onHover={setIsCategoryNavVisible} />
                  ) : isRegion ? (
                    <RegionNav icon={icon} label={label} href={href} gap="gap-0" isNavVisible={isRegionNavVisible} onHover={setIsRegionNavVisible} />
                  ) : isSearch ? (
                    !isSearchVisible && <NavLink key={label} icon={icon} label={label} href="#" gap="gap-0" onClick={handleSearchClick} />
                  ) : (
                    <NavLink
                      key={label}
                      icon={icon}
                      label={label}
                      href={href}
                      gap="gap-0"
                      onClick={href === `/${BOOKMARKS_PATH}` ? (e: React.MouseEvent) => handleClick(e, href) : undefined}
                    />
                  )}
                </li>
              ))}
              {/* TODO: フランス語が必要になったらコメント解除 */}
              {/* <li className="h-6">
                <LanguageNavLink
                  icon={<GlobeIcon width={24} height={24} color={COLORS.GRAY} />}
                  label={languageTitle}
                  href="/language"
                  locale={locale}
                  gap="gap-0.5"
                />
              </li> */}
              <li className="h-6">
                <LoginStatus />
              </li>
            </ul>
          </nav>
          <HamburgerMenu
            navLinks={hamburgerMenuNavLinks}
            locale={locale}
            categories={categories}
            regionsHierarchy={regionsHierarchy}
            handleClick={handleClick}
          />
        </div>
      </header>
      <CategoriesNav categories={categories} isNavVisible={isCategoryNavVisible} setIsNavVisible={setIsCategoryNavVisible} />
      <RegionsNav regionsHierarchy={regionsHierarchy} isNavVisible={isRegionNavVisible} setIsNavVisible={setIsRegionNavVisible} />
      <PopupContainer
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message={t('Popup.loginRequired')}
        title={t('Popup.loginRequired')}
        buttons={popupButtons}
      />
    </>
  )
}
