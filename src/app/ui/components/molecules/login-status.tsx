'use client'

import { Link } from '@/i18n/routing'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import type { FC } from 'react'

export const LoginStatus: FC = () => {
  const { data: session } = useSession()
  const t = useTranslations('Auth')
  return (
    <div className="flex items-center sm:items-start pl-0.5 sm:p-0 gap-2">
      {session ? (
        <div className="flex items-center gap-2">
          {session.user?.image !== null && session.user?.image !== undefined && (
            <Image src={session.user?.image} alt="profile image" width={28} height={28} className="w-7 h-7 sm:w-6 sm:h-6 rounded-full" />
          )}
          <p className="flex sm:hidden md:flex">{session.user?.name}</p>
        </div>
      ) : (
        <Link href="/auth/signin">{t('signIn')}</Link>
      )}
    </div>
  )
}
