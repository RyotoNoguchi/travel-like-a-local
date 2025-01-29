import type { NavLinkType } from '@/types/navLinks'

export const getNavLinks = (navLinks: NavLinkType[]) => {
  return navLinks.map(({ icon, label, href }) => ({ icon, label, href }))
}
