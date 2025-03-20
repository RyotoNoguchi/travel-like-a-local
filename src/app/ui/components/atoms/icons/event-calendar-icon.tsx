import { COLORS } from '@/app/ui/colors'
import type { FC } from 'react'

type Props = {
  width?: number
  height?: number
  strokeColor?: string
}

export const EventCalendarIcon: FC<Props> = ({ width = 24, height = 24, strokeColor = COLORS.GRAY }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="15" rx="2" stroke={strokeColor} strokeWidth="2" />
    <path d="M4 11H20" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    <path d="M9 16H15" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 3L8 7" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 3L16 7" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
)
