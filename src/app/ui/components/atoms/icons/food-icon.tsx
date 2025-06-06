import { COLORS } from '@/app/ui/colors'
import type { FC } from 'react'

type Props = {
  width?: number
  height?: number
  strokeColor?: string
}

export const FoodIcon: FC<Props> = ({ width = 24, height = 24, strokeColor = COLORS.GRAY }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 6C14.9203 6 15.8283 6.21171 16.6537 6.61876C17.4791 7.02581 18.1999 7.61729 18.7601 8.34743C19.3204 9.07758 19.7052 9.92682 19.8847 10.8295C20.0643 11.7321 20.0338 12.6639 19.7956 13.5529C19.5574 14.4419 19.1179 15.2641 18.511 15.9561C17.9042 16.648 17.1464 17.1911 16.2961 17.5433C15.4458 17.8955 14.5259 18.0473 13.6076 17.9872C12.6892 17.927 11.797 17.6563 11 17.1962"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M7 19V5" stroke={strokeColor} strokeWidth="2" />
    <path d="M10 5V9.5C10 10.3284 9.32843 11 8.5 11V11C7.67157 11 7 10.3284 7 9.5V5" stroke={strokeColor} strokeWidth="2" />
    <path d="M4 5V9.5C4 10.3284 4.67157 11 5.5 11V11C6.32843 11 7 10.3284 7 9.5V5" stroke={strokeColor} strokeWidth="2" />
  </svg>
)
