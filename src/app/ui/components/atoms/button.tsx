import { Link } from '@/i18n/routing'
import type { Tailwind } from '@/types/tailwind'
import classNames from 'classnames'
import type { FC } from 'react'

type Props = {
  borderRadius: Tailwind['borderRadius']
  textColor: Tailwind['color']
  text: string
  href: string
}

export const Button: FC<Props> = ({ borderRadius, text, textColor, href }) => (
  <Link
    href={href}
    className={classNames('flex items-center justify-center text-md border border-solid border-primary px-2 py-1 hover-animation', borderRadius, textColor)}
    role="button"
  >
    {text}
  </Link>
)
