import type { FC } from 'react'

type Props = {
  width: number
  height: number
  className?: string
}

export const ChevronIcon: FC<Props> = ({ width, height, className }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" />
  </svg>
)
