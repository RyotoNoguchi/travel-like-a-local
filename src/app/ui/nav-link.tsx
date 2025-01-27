import Link from 'next/link'
import { FC } from 'react'

type Props = {
  icon: React.ReactNode
  label: string
  href: string
}

export const NavLink: FC<Props> = ({ icon, label, href }) => (
  <Link href={href} className='flex items-start lg:gap-1 hover-animation' aria-label={label}>
    {icon}
    <span className='hidden md:block'>{label}</span>
  </Link>
)
