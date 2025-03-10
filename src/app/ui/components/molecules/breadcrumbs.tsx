import { ChevronIcon } from '@/app/ui/components/atoms/icons/chevron-icon'
import { HomeIcon } from '@/app/ui/components/atoms/icons/home-icon'
import { Link } from '@/i18n/routing'
import type { FC } from 'react'

type Props = {
  breadcrumbs: {
    label: string
    href: string
  }[]
}

export const Breadcrumbs: FC<Props> = ({ breadcrumbs }) => (
  <nav aria-label="breadcrumb" className="flex items-center overflow-x-scroll hidden-scrollbar">
    <ol className="flex items-center text-slate-500 pt-1">
      {breadcrumbs.map((breadcrumb, i) => {
        const isFirst = i === 0
        return (
          <li key={breadcrumb.href} className="flex items-center">
            {!isFirst && <ChevronIcon width={20} height={20} />}
            {isFirst ? (
              <Link href={breadcrumb.href} className="flex items-center cursor-pointer hover-animation">
                <HomeIcon width={24} height={24} />
              </Link>
            ) : (
              <Link href={breadcrumb.href} className="whitespace-nowrap cursor-pointer hover:text-dark-gray">
                {breadcrumb.label}
              </Link>
            )}
          </li>
        )
      })}
    </ol>
  </nav>
)
