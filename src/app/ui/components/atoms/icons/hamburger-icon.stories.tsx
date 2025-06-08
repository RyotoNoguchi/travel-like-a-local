import { HamburgerIcon } from '@/app/ui/components/atoms/icons/hamburger-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof HamburgerIcon> = {
  title: 'atoms/icons/HamburgerIcon',
  component: HamburgerIcon,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OnWhiteBackground: Story = {
  parameters: {
    backgrounds: { default: 'light' }
  }
}

export const OnDarkBackground: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  }
}

export const Centered: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
      <HamburgerIcon />
    </div>
  )
}

export const InContainer: Story = {
  render: () => (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', display: 'inline-block' }}>
      <HamburgerIcon />
    </div>
  )
}
