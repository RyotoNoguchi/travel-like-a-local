import type { FC } from 'react'

type Props = {
  size?: number
  color?: string
}

export const SpinnerIcon: FC<Props> = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="animate-spin" role="status" aria-label="読み込み中">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="4" fill="none" opacity="0.25" />
    <path fill="none" strokeWidth="4" strokeLinecap="round" stroke={color} d="M12 2a10 10 0 0 1 10 10" />
  </svg>
)
