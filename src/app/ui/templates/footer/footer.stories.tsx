import { COLORS } from '@/app/ui/colors'
import { AreaIcon } from '@/app/ui/components/atoms/icons/area-icon'
import { CategoryIcon } from '@/app/ui/components/atoms/icons/category-icon'
import { FavoriteIcon } from '@/app/ui/components/atoms/icons/favorite-icon'
import { SearchIcon } from '@/app/ui/components/atoms/icons/search-icon'
import { Footer } from '@/app/ui/templates/footer/presenter'
import { listSocialLinks } from '@/app/utils/socialLinks'
import { LANGUAGE } from '@/constants'
import type { Meta, StoryObj } from '@storybook/react'
import messages from '../../../../../messages/fr.json'

const meta = {
  title: 'templates/Footer',
  component: Footer
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  args: {
    locale: LANGUAGE.FR,
    logo: {
      url: 'https://images.ctfassets.net/rymv5s221jmx/5x2sMehGUOBlAhVBVzmWoB/a1b944998759e251e089384384f4585e/logo.png?w=500&h=500&fit=fill',
      title: 'Logo'
    },
    footerColumnTitles: {
      first: 'Menu de navigation',
      second: 'Réseaux sociaux',
      subtitle: '~ Votre boussole pour les découvertes locales ~'
    },
    headerNavLinkTitles: {
      language: 'Français'
    },
    socialLinks: listSocialLinks({ width: 32, height: 32 }),
    navLinks: [
      { icon: <SearchIcon width={24} height={24} color={COLORS.WHITE} />, label: messages.NavMenu.search, href: '/search' },
      { icon: <AreaIcon width={24} height={24} color={COLORS.WHITE} />, label: messages.NavMenu.area, href: '/area' },
      { icon: <CategoryIcon width={24} height={24} color={COLORS.WHITE} />, label: messages.NavMenu.category, href: '/category' },
      { icon: <FavoriteIcon width={24} height={24} color={COLORS.WHITE} />, label: messages.NavMenu.favorite, href: '/favorite' }
    ]
  }
}
