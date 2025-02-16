import { COLORS } from '@/app/ui/colors'
import type { FC } from 'react'
type Props = {
  width: number
  height: number
  color: string
}

export const GlobeIcon: FC<Props> = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke={color || COLORS.GRAY} strokeWidth="2" />
    <ellipse cx="12" cy="12" rx="3" ry="8" stroke={color || COLORS.GRAY} strokeWidth="2" />
    <path d="M4 12H20" stroke={color || COLORS.GRAY} strokeWidth="2" strokeLinecap="round" />
  </svg>
)
