import { COLORS } from '@/app/ui/colors'
import type { FC } from 'react'

type Props = {
  width: number
  height: number
}

export const CalendarIcon: FC<Props> = ({ width, height }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="15" rx="2" stroke={COLORS.SLATE_400} strokeWidth="2" />
    <path
      d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z"
      fill={COLORS.GRAY}
      fillOpacity="0.25"
    />
    <path d="M7 3L7 6" stroke={COLORS.SLATE_400} strokeWidth="2" strokeLinecap="round" />
    <path d="M17 3L17 6" stroke={COLORS.SLATE_400} strokeWidth="2" strokeLinecap="round" />
  </svg>
)
