'use client'

import { COLORS } from '@/app/ui/colors'
import { CloseIcon } from '@/app/ui/icons/close-icon'
import { GlobeIcon } from '@/app/ui/icons/globe-icon'
import { HamburgerIcon } from '@/app/ui/icons/hamburger-icon'
import { LanguageNavLink } from '@/app/ui/templates/language-nav-link'
import { NavLink } from '@/app/ui/templates/nav-link'
import { type LANGUAGE } from '@/constants'
import { type NavLinkType } from '@/types/navLinks'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { type FC, useEffect, useState } from 'react'

type Props = {
  navLinks: NavLinkType[]
  locale: LANGUAGE
}

export const HamburgerMenu: FC<Props> = ({ navLinks, locale }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => setIsOpen(!isOpen)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  const t = useTranslations('NavMenu')

  return (
    <>
      <button className={classNames('flex items-center justify-center hover-animation', 'sm:hidden')} onClick={handleClick}>
        <HamburgerIcon />
      </button>
      <div
        className={classNames(
          'absolute p-4 w-svw h-svh inset-0 z-50 flex flex-col gap-2 bg-white -translate-x-full transition-transform duration-300 ease-in-out',
          isOpen && 'translate-x-0'
        )}
      >
        <button className="flex justify-end" onClick={handleClick}>
          <CloseIcon />
        </button>
        <ul className="text-3xl flex flex-col gap-3">
          {navLinks.map(({ icon, label, href }) => (
            <li key={href}>
              <NavLink icon={icon} label={label} href={href} gap="gap-2" withinHamburger />
            </li>
          ))}
          <li className="h-7">
            <LanguageNavLink
              icon={<GlobeIcon width={32} height={32} color={COLORS.GRAY} />}
              label={t('language')}
              href="/language"
              locale={locale}
              gap="gap-2"
            />
          </li>
        </ul>
      </div>
    </>
  )
}
