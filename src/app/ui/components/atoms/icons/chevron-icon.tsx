import { COLORS } from '@/app/ui/colors'
import type { FC } from 'react'

type Props = {
  width: number
  height: number
}

export const ChevronIcon: FC<Props> = ({ width, height }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke={COLORS.SLATE_300} strokeWidth="2" />
  </svg>
)
