import { Logo } from '@/app/ui/templates/logo'
import { NavLink } from '@/app/ui/templates/nav-link'
import { LOGO_TITLE } from '@/constants'
import type { Logo as LogoType } from '@/types/logo'
import type { FC, JSX } from 'react'

type Props = {
  logo: LogoType
  footerColumnTitles: {
    first: string
    second: string
    subtitle: string
  }
  navLinks: {
    icon: JSX.Element
    label: string
    href: string
  }[]
  socialLinks: {
    icon: JSX.Element
    href: string
  }[]
}

export const Footer: FC<Props> = ({ logo, footerColumnTitles, navLinks, socialLinks }) => (
  <footer className="bg-dark-gray text-white h-full px-4 pt-10 pb-5">
    <div className="flex flex-col gap-14 justify-evenly">
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-evenly">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">{footerColumnTitles.first}</h3>
          <nav className="flex flex-col text-xl items-start w-full">
            <ul className="flex sm:flex-col flex-wrap items-start gap-2">
              {navLinks.map(({ icon, label, href }) => (
                <li key={href}>
                  <NavLink key={label} icon={icon} label={label} href={href} gap="gap-1" withinFooter />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">{footerColumnTitles.second}</h3>
          <ul className="flex flex-wrap sm:flex-row gap-4">
            {socialLinks.map(({ icon, href }) => (
              <li key={href} className="hover-animation">
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        <Logo logo={logo} subtitle={footerColumnTitles.subtitle} withinFooter />
      </div>
      <div className="text-center text-xs">
        <small className="text-gray-500">
          © {new Date().getFullYear()} {LOGO_TITLE}. All rights reserved.
        </small>
      </div>
    </div>
  </footer>
)
