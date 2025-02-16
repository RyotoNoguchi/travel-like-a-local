import type { FC } from 'react'

type Props = {
  date: number | string | Date
}

export const DateComponent: FC<Props> = ({ date }) => <p>{new Date(date).toLocaleDateString()}</p>
