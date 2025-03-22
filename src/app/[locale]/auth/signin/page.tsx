'use client'

import { GoogleIcon } from '@/app/ui/components/atoms/icons/google-icon'
import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'

const SignIn: NextPage = () => {
  const t = useTranslations('Auth')
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center text-2xl font-bold">{t('signIn')}</h2>

        {/* Googleログインボタン */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex w-full items-center text-2xl justify-center gap-2 rounded-lg bg-white px-4 py-2 text-gray-700 shadow-md hover:bg-gray-50"
        >
          <GoogleIcon width="w-5" height="h-5" />
          {t('signInWithGoogle')}
        </button>
      </div>
    </div>
  )
}

export default SignIn
