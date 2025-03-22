'use client'

import { GoogleIcon } from '@/app/ui/components/atoms/icons/google-icon'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

export const GoogleLoginButton: FC = () => {
  const t = useTranslations('Auth')
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className="flex w-full items-center text-2xl justify-center gap-2 rounded-lg bg-white px-4 py-2 text-gray-700 shadow-md hover:bg-gray-50"
    >
      <GoogleIcon width="w-5" height="h-5" />
      {t('signInWithGoogle')}
    </button>
  )
}
