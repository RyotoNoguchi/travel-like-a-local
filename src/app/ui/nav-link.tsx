import classNames from 'classnames'
import Link from 'next/link'
import type { FC } from 'react'

type Props = {
  icon: React.ReactNode
  label: string
  href: string
  withinHamburger?: boolean
}

export const NavLink: FC<Props> = ({ icon, label, href, withinHamburger }) => (
  <Link href={href} className={classNames('flex items-start lg:gap-1 hover-animation', Boolean(withinHamburger) && 'gap-2')} aria-label={label}>
    {icon}
    <span className={`${Boolean(withinHamburger) ? 'block' : 'hidden semi-lg:block'}`}>{label}</span>
  </Link>
)
