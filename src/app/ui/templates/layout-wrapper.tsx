'use client'

import { usePathname } from 'next/navigation'
import type { FC } from 'react'

type Props = {
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
}

export const LayoutWrapper: FC<Props> = ({ children, header, footer }) => {
  const pathname = usePathname()
  const isAuthPage = pathname.includes('/auth/signin')

  return (
    <>
      {!isAuthPage && header}
      {children}
      {!isAuthPage && footer}
    </>
  )
}
