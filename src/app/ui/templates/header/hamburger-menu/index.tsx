'use client'

import { COLORS } from '@/app/ui/colors'
import { CloseIcon } from '@/app/ui/components/atoms/icons/close-icon'
import { GlobeIcon } from '@/app/ui/components/atoms/icons/globe-icon'
import { HamburgerIcon } from '@/app/ui/components/atoms/icons/hamburger-icon'
import { LoginStatus } from '@/app/ui/components/molecules/login-status'
import { CategoryList } from '@/app/ui/templates/header/hamburger-menu/category-list'
import { RegionsList } from '@/app/ui/templates/header/hamburger-menu/regions-list' // Added import
import { LanguageNavLink } from '@/app/ui/templates/language-nav-link'
import { NavLink } from '@/app/ui/templates/nav-link'
import { type LANGUAGE } from '@/constants'
import type { Category } from '@/types/category'
import { type NavLinkType } from '@/types/navLinks'
import type { RegionHierarchy } from '@/types/region' // Added import
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { type FC, useEffect, useState } from 'react'

type Props = {
  navLinks: NavLinkType[]
  locale: LANGUAGE
  categories: Category[]
  regionsHierarchy: RegionHierarchy[] // Added prop
  handleClick: (e: React.MouseEvent, href: string) => void
}

export const HamburgerMenu: FC<Props> = ({ navLinks, locale, categories, regionsHierarchy, handleClick }) => {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isRegionOpen, setIsRegionOpen] = useState(false) // Added state for regions

  useEffect(() => {
    document.body.style.overflow = isOpen || isCategoryOpen || isRegionOpen ? 'hidden' : 'auto' // Updated overflow logic
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

  // Handlers for Regions List
  const handleRegionClick = (e: React.MouseEvent) => {
    console.log('%csrc/app/ui/templates/header/hamburger-menu/index.tsx:54 isRegionOpen', 'color: #26bfa5;', isRegionOpen)
    e.preventDefault()
    setIsRegionOpen(true)
    console.log('%csrc/app/ui/templates/header/hamburger-menu/index.tsx:57 isRegionOpen', 'color: #047857;', isRegionOpen)
  }
  const handleRegionBack = () => {
    setIsRegionOpen(false)
  }
  const handleRegionClose = () => {
    setIsRegionOpen(false)
    setIsOpen(false)
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
          {navLinks.map(
            (
              { icon, label, href, isCategory, isRegion } // Added isRegion check
            ) => (
              <li key={href} className="h-8 sm:h-7">
                {isCategory ? (
                  <button className="flex items-center gap-2 w-full h-8 sm:h-7" onClick={handleCategoryClick}>
                    {icon}
                    <span>{label}</span>
                  </button>
                ) : isRegion ? ( // Handle region link
                  <button className="flex items-center gap-2 w-full h-8 sm:h-7" onClick={handleRegionClick}>
                    {icon}
                    <span>{label}</span>
                  </button>
                ) : (
                  <NavLink
                    icon={icon}
                    label={label}
                    href={href}
                    gap="gap-2"
                    withinHamburger
                    onClick={(e: React.MouseEvent) => {
                      toggleHamburgerMenu()
                      handleClick(e, href)
                    }}
                  />
                )}
              </li>
            )
          )}
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
