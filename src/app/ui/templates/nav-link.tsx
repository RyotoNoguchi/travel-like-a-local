import type { Tailwind } from '@/types/tailwind'
import classNames from 'classnames'
import Link from 'next/link'
import type { FC } from 'react'

type Props = {
  icon: React.ReactNode
  label: string
  href: string
  gap: Tailwind['gap']
  withinHamburger?: boolean
  withinFooter?: boolean
}

export const NavLink: FC<Props> = ({ icon, label, href, gap, withinHamburger, withinFooter }) => (
  <Link href={href} className={classNames('flex items-start lg:gap-1 hover-animation', gap)} aria-label={label}>
    {icon}
    <span className={`${Boolean(withinHamburger) || Boolean(withinFooter) ? 'block' : 'hidden semi-lg:block'}`}>{label}</span>
  </Link>
)
