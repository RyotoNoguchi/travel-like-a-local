import { useFormatter } from 'next-intl'
import type { FC } from 'react'

type Props = {
  date: number | string | Date
  className?: string
}

export const DateComponent: FC<Props> = ({ date, className }) => {
  const format = useFormatter()

  return (
    <p className={className}>
      {format.dateTime(new Date(date), {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })}
    </p>
  )
}
