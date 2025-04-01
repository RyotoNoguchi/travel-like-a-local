import { Link } from '@/i18n/routing'
import classNames from 'classnames'
import { type FC } from 'react'

type Props = {
  icon: React.ReactNode
  label: string
  href: string
  gap?: string
  withinHamburger?: boolean
  withinFooter?: boolean
  isNavVisible: boolean
  onHover: (isHovered: boolean) => void
}

export const RegionNav: FC<Props> = ({ icon, label, href, gap = 'gap-2', withinHamburger, withinFooter, isNavVisible, onHover }) => (
  <div
    className={classNames('relative', isNavVisible && 'after:content-[""] after:absolute after:w-full after:h-14 after:bottom-[-3.5rem]')}
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
  >
    <Link href={href} className={classNames('flex hover-animation gap-1 items-start', gap, 'hover:text-primary')}>
      {icon}
      <span className={classNames(`${Boolean(withinHamburger) || Boolean(withinFooter) ? 'block' : 'hidden semi-lg:block'}`, 'text-xl')}>{label}</span>
    </Link>
  </div>
)
