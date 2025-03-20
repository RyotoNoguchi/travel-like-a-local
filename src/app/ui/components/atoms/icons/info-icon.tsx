import { COLORS } from '@/app/ui/colors'
import type { FC } from 'react'

type Props = {
  width?: number
  height?: number
  strokeColor?: string
}

export const InfoIcon: FC<Props> = ({ width = 24, height = 24, strokeColor = COLORS.GRAY }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke={strokeColor} strokeWidth="2" />
    <path
      d="M12.5 7.5C12.5 7.77614 12.2761 8 12 8C11.7239 8 11.5 7.77614 11.5 7.5C11.5 7.22386 11.7239 7 12 7C12.2761 7 12.5 7.22386 12.5 7.5Z"
      fill={strokeColor}
      stroke={strokeColor}
    />
    <path d="M12 17V10" stroke={strokeColor} strokeWidth="2" />
  </svg>
)
