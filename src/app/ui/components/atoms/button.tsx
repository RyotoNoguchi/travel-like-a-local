import { Link } from '@/i18n/routing'
import type { Tailwind } from '@/types/tailwind'
import classNames from 'classnames'
import type { FC } from 'react'

type Props = {
  borderRadius: Tailwind['borderRadius']
  textColor?: Tailwind['color']
  text: string
  href: string
  variant?: 'outline' | 'solid'
}

export const Button: FC<Props> = ({ borderRadius, text, textColor, href, variant = 'outline' }) => {
  const baseClasses = 'flex items-center justify-center text-md px-2 py-1 hover-animation'

  const variantClasses = variant === 'solid' ? 'bg-primary text-white' : 'border border-solid border-primary'

  return (
    <Link href={href} className={classNames(baseClasses, variantClasses, borderRadius, variant === 'outline' ? textColor : '')} role="button">
      {text}
    </Link>
  )
}
