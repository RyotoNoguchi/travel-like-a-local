import type { FC } from 'react'

type Props = {
  date: number | string | Date
  className?: string
}

export const DateComponent: FC<Props> = ({ date, className }) => <p className={className}>{new Date(date).toLocaleDateString()}</p>
