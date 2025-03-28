'use client'

import { LoginIcon } from '@/app/ui/components/atoms/icons/login-icon'
import { Link } from '@/i18n/routing'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { type FC, useState } from 'react'

type Props = {
  isHamburger?: boolean
}

export const LoginStatus: FC<Props> = ({ isHamburger = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const t = useTranslations('Auth')

  const handleSignOut = () => {
    setIsOpen(false)
    signOut()
  }

  if (!session) {
    return (
      <Link href="/auth/signin" className="flex items-center gap-2 md:gap-1 md:flex hover-animation h-8 sm:h-6">
        <LoginIcon width={isHamburger ? 28 : 24} height={isHamburger ? 28 : 24} />
        <span className="block sm:hidden semi-lg:block">{t('signIn')}</span>
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={t('loggedInUser')}
      >
        {session.user?.image !== null && session.user?.image !== undefined && (
          <Image src={session.user.image} alt="profile image" width={28} height={28} className="w-7 h-7 sm:w-6 sm:h-6 rounded-full" />
        )}
        <span className="flex sm:hidden md:flex">{session.user?.name}</span>
      </button>

      {isOpen === true && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg">
          <button onClick={handleSignOut} className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
            {t('signOut')}
          </button>
        </div>
      )}
    </div>
  )
}
