'use client'

import { GoogleIcon } from '@/app/ui/components/atoms/icons/google-icon'
import type { LANGUAGE } from '@/constants'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, type FC } from 'react'

type Props = {
  locale: LANGUAGE
}

export const GoogleLoginButton: FC<Props> = ({ locale }) => {
  const t = useTranslations('Auth')
  const searchParams = useSearchParams()
  const [previousUrl, setPreviousUrl] = useState<string>('')

  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl')
    const referrer = document.referrer
    const redirectUrl = callbackUrl || (referrer && !referrer.includes('/auth/signin') ? referrer : '/')

    setPreviousUrl(redirectUrl)
  }, [searchParams, locale])

  return (
    <button
      onClick={() => signIn('google', { callbackUrl: previousUrl })}
      className="flex w-full items-center text-2xl justify-center gap-2 rounded-lg bg-white px-4 py-2 text-gray-700 shadow-md hover:bg-gray-50"
    >
      <GoogleIcon width="w-5" height="h-5" />
      {t('signInWithGoogle')}
    </button>
  )
}
