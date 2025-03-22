'use client'

import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

export const LogoutButton: FC = () => {
  const t = useTranslations('Auth')
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })} className="px-2 py-1 leading-none bg-red-500 text-white rounded hover:bg-red-600">
      {t('logout')}
    </button>
  )
}
