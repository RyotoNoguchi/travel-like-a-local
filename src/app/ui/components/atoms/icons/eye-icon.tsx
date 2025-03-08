import { COLORS } from '@/app/ui/colors'
import type { FC } from 'react'

type Props = {
  width: number
  height: number
}

export const EyeIcon: FC<Props> = ({ width, height }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 5C6.55576 5 3.53109 9.23425 2.45554 11.1164C2.23488 11.5025 2.12456 11.6956 2.1367 11.9836C2.14885 12.2716 2.27857 12.4598 2.53799 12.8362C3.8182 14.6935 7.29389 19 12 19C16.7061 19 20.1818 14.6935 21.462 12.8362C21.7214 12.4598 21.8511 12.2716 21.8633 11.9836C21.8754 11.6956 21.7651 11.5025 21.5445 11.1164C20.4689 9.23425 17.4442 5 12 5Z"
      stroke={COLORS.SLATE_400}
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="4" fill={COLORS.SLATE_400} />
  </svg>
)
