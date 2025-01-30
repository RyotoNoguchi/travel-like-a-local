import type { FC } from 'react'

type Props = {
  width: number
  height: number
}

export const FacebookIcon: FC<Props> = ({ width, height }) => (
  <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_17_61)">
      <path
        d="M24 0C10.7453 0 0 10.7453 0 24C0 35.255 7.74912 44.6995 18.2026 47.2934V31.3344H13.2538V24H18.2026V20.8397C18.2026 12.671 21.8995 8.8848 29.9194 8.8848C31.44 8.8848 34.0637 9.18336 35.137 9.48096V16.129C34.5706 16.0694 33.5866 16.0397 32.3645 16.0397C28.4294 16.0397 26.9088 17.5306 26.9088 21.4061V24H34.7482L33.4013 31.3344H26.9088V47.8243C38.7926 46.3891 48.001 36.2707 48.001 24C48 10.7453 37.2547 0 24 0Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_17_61">
        <rect width="48" height="48" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
