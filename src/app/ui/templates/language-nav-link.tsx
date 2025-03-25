'use client'

import { LANGUAGE } from '@/constants'
import type { Tailwind } from '@/types/tailwind'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { type FC, useEffect, useRef, useState } from 'react'

type Props = {
  icon: React.ReactNode
  label: string
  href: string
  locale: LANGUAGE
  gap: Tailwind['gap']
}

export const LanguageNavLink: FC<Props> = ({ icon, label, href, locale, gap }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMouseEnter = () => {
    router.prefetch(href)
  }

  const handleLanguageChange = (language: LANGUAGE) => {
    router.push(`/${language}`)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent, lang?: LANGUAGE) => {
    switch (e.key) {
      case 'Escape':
        setIsOpen(false)
        break
      case 'Enter':
      case ' ':
        if (lang) {
          handleLanguageChange(lang)
        } else {
          setIsOpen(!isOpen)
        }
        break
      case 'ArrowDown':
        if (!isOpen) {
          setIsOpen(true)
        }
        break
    }
  }

  return (
    <div className="relative h-full" ref={dropdownRef}>
      <div className={classNames('flex items-start h-full', gap)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className="flex items-center cursor-pointer hover-animation gap-2 sm:gap-0.5 lg:gap-1 h-full focus:outline-none"
          aria-label={label}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          onMouseEnter={handleMouseEnter}
        >
          {icon}
          <span className="block sm:hidden semi-lg:block h-full">{locale.toUpperCase()}</span>
        </button>
      </div>

      {isOpen === true && (
        <div
          className="absolute z-50 top-0 sm:top-full left-20 sm:left-0 sm:right-0 sm:mt-1 bg-white rounded-md shadow-lg sm:min-w-[40px] md:min-w-[60px] lg:min-w-[80px]"
          role="listbox"
        >
          {Object.values(LANGUAGE).map((lang) => (
            <button
              key={lang}
              className={classNames(
                'w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex justify-center focus:outline-none focus:border-2 focus:border-primary focus:rounded-sm',
                locale === lang && 'bg-gray-50'
              )}
              onClick={() => handleLanguageChange(lang)}
              onKeyDown={(e) => handleKeyDown(e, lang)}
              role="option"
              aria-selected={locale === lang}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
