'use client'

import { LANGUAGE } from '@/constants'
import type { Tailwind } from '@/types/tailwind'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { ChangeEvent, FC } from 'react'

type Props = {
  icon: React.ReactNode
  label: string
  href: string
  locale: LANGUAGE
  gap: Tailwind['gap']
}

export const LanguageNavLink: FC<Props> = ({ icon, label, href, locale, gap }) => {
  const t = useTranslations('NavMenu')
  const router = useRouter()

  const handleMouseEnter = () => {
    router.prefetch(href)
  }

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value
    router.push(`/${language}`)
  }

  return (
    <div className={classNames('flex items-start hover-animation h-full', gap)}>
      {icon}
      <label htmlFor="language-select" className="sr-only">
        {t('selectLanguage')}
      </label>
      <select
        id="language-select"
        className="all-appearance-none cursor-pointer focus:outline-none h-full bg-transparent"
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
