'use client'

import { COLORS } from '@/app/ui/colors'
import { CloseIcon } from '@/app/ui/components/atoms/icons/close-icon'
import { GlobeIcon } from '@/app/ui/components/atoms/icons/globe-icon'
import { HamburgerIcon } from '@/app/ui/components/atoms/icons/hamburger-icon'
import { LoginStatus } from '@/app/ui/components/molecules/login-status'
import { CategoryList } from '@/app/ui/templates/header/hamburger-menu/category-list'
import { LanguageNavLink } from '@/app/ui/templates/language-nav-link'
import { NavLink } from '@/app/ui/templates/nav-link'
import { type LANGUAGE } from '@/constants'
import type { Category } from '@/types/category'
import { type NavLinkType } from '@/types/navLinks'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { type FC, useEffect, useState } from 'react'

type Props = {
  navLinks: NavLinkType[]
  locale: LANGUAGE
  categories: Category[]
}

export const HamburgerMenu: FC<Props> = ({ navLinks, locale, categories }) => {
  const t = useTranslations('NavMenu')
  const [isOpen, setIsOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const handleClick = () => setIsOpen(!isOpen)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

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

  return (
    <>
      <button className={classNames('flex items-center justify-center hover-animation', 'sm:hidden')} onClick={handleClick}>
        <HamburgerIcon />
      </button>
      <div
        className={classNames(
          'absolute p-4 w-svw h-svh inset-0 z-40 flex flex-col gap-2 bg-white',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button className="flex justify-end" onClick={handleClick}>
          <CloseIcon />
        </button>
        <ul className="text-3xl flex flex-col gap-3">
          {navLinks.map(({ icon, label, href, isCategory }) => (
            <li key={href} className="h-8 sm:h-7">
              {isCategory ? (
                <button className="flex items-center gap-2 w-full h-8 sm:h-7" onClick={handleCategoryClick}>
                  {icon}
                  <span>{label}</span>
                </button>
              ) : (
                <NavLink icon={icon} label={label} href={href} gap="gap-2" withinHamburger />
              )}
            </li>
          ))}
          <li className="h-8 sm:h-7">
            <LanguageNavLink
              icon={<GlobeIcon width={32} height={32} color={COLORS.GRAY} />}
              label={t('language')}
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
      <CategoryList categories={categories} isOpen={isCategoryOpen} onBack={handleCategoryBack} backLabel={t('back')} onClose={handleCategoryClose} />
    </>
  )
}
