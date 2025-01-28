'use client'

import { CloseIcon } from '@/app/ui/icons/close-icon'
import { HamburgerIcon } from '@/app/ui/icons/hamburger-icon'
import { NavLink } from '@/app/ui/nav-link'
import { LANGUAGE } from '@/constants'
import { NavLinkType } from '@/types/navLinks'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'
import { GlobeIcon } from './icons/globe-icon'
import { LanguageNavLink } from './language-nav-link'

type Props = {
  navLinks: NavLinkType[]
  locale: LANGUAGE
}

export const HamburgerMenu: FC<Props> = ({ navLinks, locale }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }
  const t = useTranslations('Header')

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
              <NavLink icon={icon} label={label} href={href} withinHamburger />
            </li>
          ))}
          <li className="h-7">
            <LanguageNavLink icon={<GlobeIcon width={36} height={36} />} label={t('language')} href="/language" locale={locale} withinHamburger />
          </li>
        </ul>
      </div>
    </>
  )
}
