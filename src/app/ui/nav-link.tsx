import classNames from 'classnames'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  icon: React.ReactNode
  label: string
  href: string
  withinHamburger?: boolean
}

export const NavLink: FC<Props> = ({ icon, label, href, withinHamburger }) => (
  <Link href={href} className={classNames('flex items-start lg:gap-1 hover-animation', withinHamburger && 'gap-2')} aria-label={label}>
    {icon}
    <span className={`${withinHamburger ? 'block' : 'hidden semi-lg:block'}`}>{label}</span>
  </Link>
)
