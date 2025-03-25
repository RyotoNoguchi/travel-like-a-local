'use client'

import type { NextPage } from 'next'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

const ErrorPage: NextPage = () => {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const t = useTranslations('Auth')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center text-2xl font-bold text-red-600">{t('signInError')}</h2>
        <p className="text-center text-2xl text-gray-600">{error === 'AccessDenied' ? t('accessDenied') : t('somethingWentWrong')}</p>
      </div>
    </div>
  )
}

export default ErrorPage
