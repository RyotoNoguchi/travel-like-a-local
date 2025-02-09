import { Logo } from '@/app/ui/templates/logo'
import { LANGUAGE } from '@/constants'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'templates/Logo',
  component: Logo
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    logo: {
      url: 'https://images.ctfassets.net/rymv5s221jmx/5x2sMehGUOBlAhVBVzmWoB/a1b944998759e251e089384384f4585e/logo.png?w=500&h=500&fit=fill',
      title: 'Logo'
    },
    subtitle: LANGUAGE.FR
  }
}
