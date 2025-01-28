'use client'

import { LANGUAGE } from '@/constants'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FC } from 'react'

type Props = {
  icon: React.ReactNode
  label: string
  href: string
  locale: LANGUAGE
  withinHamburger?: boolean
}

export const LanguageNavLink: FC<Props> = ({ icon, label, href, locale, withinHamburger = false }) => {
  const t = useTranslations('Header')
  const router = useRouter()

  const handleMouseEnter = () => {
    router.prefetch(href)
  }

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value
    router.push(`/${language}`)
  }

  return (
    <div className={classNames('flex items-start hover-animation h-full', withinHamburger && 'gap-2')}>
      {icon}
      <label htmlFor="language-select" className="sr-only">
        {t('selectLanguage')}
      </label>
      <select
        id="language-select"
        className="all-appearance-none cursor-pointer focus:outline-none h-full"
        value={locale}
        name="language"
        aria-label={label}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleLanguageChange(e)}
        onMouseEnter={handleMouseEnter}
      >
        <option value={LANGUAGE.FR}>{LANGUAGE.FR.toUpperCase()}</option>
        <option value={LANGUAGE.EN}>{LANGUAGE.EN.toUpperCase()}</option>
      </select>
    </div>
  )
}
