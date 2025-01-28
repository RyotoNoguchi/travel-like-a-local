'use client'

import { ChangeEvent, FC } from 'react'
import { LANGUAGE } from '@/constants'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

type Props = {
  icon: React.ReactNode
  label: string
  href: string
  locale: LANGUAGE
}

export const LanguageNavLink: FC<Props> = ({ icon, label, href, locale }) => {
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
    <div className='flex items-start hover-animation h-full'>
      {icon}
      <label htmlFor='language-select' className='sr-only'>
        {t('selectLanguage')}
      </label>
      <select id='language-select' className='cursor-pointer focus:outline-none h-full' value={locale} name='language' aria-label={label} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleLanguageChange(e)} onMouseEnter={handleMouseEnter}>
        <option value={LANGUAGE.FR}>{LANGUAGE.FR.toUpperCase()}</option>
        <option value={LANGUAGE.EN}>{LANGUAGE.EN.toUpperCase()}</option>
      </select>
    </div>
  )
}
