import type { JSX } from 'react'

export type NavLinkType = {
  icon: JSX.Element
  label: string
  href: string
  isCategory?: boolean
  isRegion?: boolean
  isSearch?: boolean
}
