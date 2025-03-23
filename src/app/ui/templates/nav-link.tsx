import { Link } from '@/i18n/routing'
import type { Tailwind } from '@/types/tailwind'
import classNames from 'classnames'
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
    <span className={`${Boolean(withinHamburger) || Boolean(withinFooter) ? 'block h-8 sm:h-7' : 'hidden semi-lg:block'}`}>{label}</span>
  </Link>
)
