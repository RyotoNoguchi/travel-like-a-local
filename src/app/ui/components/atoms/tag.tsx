import { Link } from '@/i18n/routing'
import type { FC } from 'react'

type Props = {
  href: string
  title: string
}

export const Tag: FC<Props> = ({ href, title }) => (
  <Link href={href}>
    <span className="hover-text-primary">{title}</span>
  </Link>
)
