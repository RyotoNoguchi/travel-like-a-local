'use client'

import { COLORS } from '@/app/ui/colors'
import { CloseIcon } from '@/app/ui/components/atoms/icons/close-icon'
import { GlobeIcon } from '@/app/ui/components/atoms/icons/globe-icon'
import { HamburgerIcon } from '@/app/ui/components/atoms/icons/hamburger-icon'
import { LoginStatus } from '@/app/ui/components/molecules/login-status'
import { CategoryList } from '@/app/ui/templates/header/hamburger-menu/category-list'
import { RegionsList } from '@/app/ui/templates/header/hamburger-menu/regions-list'
import { LanguageNavLink } from '@/app/ui/templates/language-nav-link'
import { NavLink } from '@/app/ui/templates/nav-link'
import { BOOKMARKS_PATH, type LANGUAGE } from '@/constants'
import type { Category } from '@/types/category'
import { type NavLinkType } from '@/types/navLinks'
import type { RegionHierarchy } from '@/types/region'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { type FC, useEffect, useRef, useState } from 'react'

type Props = {
  navLinks: NavLinkType[]
  locale: LANGUAGE
  categories: Category[]
  regionsHierarchy: RegionHierarchy[]
  handleClick: (e: React.MouseEvent, href: string) => void
}

export const HamburgerMenu: FC<Props> = ({ navLinks, locale, categories, regionsHierarchy, handleClick }) => {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isRegionOpen, setIsRegionOpen] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    document.body.style.overflow = isOpen || isCategoryOpen || isRegionOpen ? 'hidden' : 'auto'
  }, [isCategoryOpen, isOpen, isRegionOpen])

  const toggleHamburgerMenu = () => setIsOpen(!isOpen)

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsCategoryOpen(true)
  }
  const handleCategoryBack = () => {
    setIsCategoryOpen(false)
  }
  const handleCategoryClose = () => {
    setIsCategoryOpen(false)
    setIsOpen(false)
  }

  const handleRegionClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsRegionOpen(true)
  }
  const handleRegionBack = () => {
    setIsRegionOpen(false)
  }
  const handleRegionClose = () => {
    setIsRegionOpen(false)
    setIsOpen(false)
  }

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSearchVisible(true)
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, 100)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchVisible(false)
      setSearchQuery('')
      setIsOpen(false)
    }
  }

  return (
    <>
      <button className={classNames('flex items-center justify-center hover-animation', 'sm:hidden')} onClick={toggleHamburgerMenu}>
        <HamburgerIcon />
      </button>
      <div
        className={classNames(
          'absolute p-4 w-svw h-svh inset-0 z-40 flex flex-col gap-2 bg-white',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button className="flex justify-end" onClick={toggleHamburgerMenu}>
          <CloseIcon />
        </button>
        <ul className="text-3xl flex flex-col gap-3">
          {navLinks.map(({ icon, label, href, isCategory, isRegion, isSearch }) => (
            <li key={href} className="h-8 sm:h-7">
              {isCategory ? (
                <button className="flex items-center gap-2 w-full h-8 sm:h-7 hover-animation" onClick={handleCategoryClick}>
                  {icon}
                  <span>{label}</span>
                </button>
              ) : isRegion ? (
                <button className="flex items-center gap-2 w-full h-8 sm:h-7 hover-animation" onClick={handleRegionClick}>
                  {icon}
                  <span>{label}</span>
                </button>
              ) : isSearch ? (
                isSearchVisible ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('NavMenu.searchPlaceholder')}
                      className="flex-grow py-2 px-4 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button type="button" className="ml-2" onClick={() => setIsSearchVisible(false)}>
                      <CloseIcon width={24} height={24} />
                    </button>
                  </form>
                ) : (
                  <button className="flex items-center gap-2 w-full h-8 sm:h-7 hover-animation" onClick={handleSearchClick}>
                    {icon}
                    <span>{label}</span>
                  </button>
                )
              ) : (
                <NavLink
                  icon={icon}
                  label={label}
                  href={href}
                  gap="gap-2"
                  withinHamburger
                  onClick={(e: React.MouseEvent) => {
                    toggleHamburgerMenu()
                    if (href === `/${BOOKMARKS_PATH}`) {
                      handleClick(e, href)
                    }
                  }}
                />
              )}
            </li>
          ))}
          <li className="h-8 sm:h-7">
            <LanguageNavLink
              icon={<GlobeIcon width={32} height={32} color={COLORS.GRAY} />}
              label={t('NavMenu.language')}
              href="/language"
              locale={locale}
              gap="gap-2"
            />
          </li>
          <li className="h-8 sm:h-7">
            <LoginStatus isHamburger />
          </li>
        </ul>
      </div>
      <CategoryList categories={categories} isOpen={isCategoryOpen} onBack={handleCategoryBack} backLabel={t('NavMenu.back')} onClose={handleCategoryClose} />
      <RegionsList
        regionsHierarchy={regionsHierarchy}
        isOpen={isRegionOpen}
        onBack={handleRegionBack}
        backLabel={t('NavMenu.back')}
        onClose={handleRegionClose}
      />
    </>
  )
}
