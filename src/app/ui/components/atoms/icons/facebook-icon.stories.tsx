import { FacebookIcon } from '@/app/ui/components/atoms/icons/facebook-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof FacebookIcon> = {
  title: 'atoms/icons/FacebookIcon',
  component: FacebookIcon,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  argTypes: {
    width: {
      control: 'number'
    },
    height: {
      control: 'number'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 48,
    height: 48
  },
  parameters: {
    backgrounds: { default: 'facebook' }
  }
}

export const Small: Story = {
  args: {
    width: 24,
    height: 24
  },
  parameters: {
    backgrounds: { default: 'facebook' }
  }
}

export const Large: Story = {
  args: {
    width: 64,
    height: 64
  },
  parameters: {
    backgrounds: { default: 'facebook' }
  }
}

export const Medium: Story = {
  args: {
    width: 32,
    height: 32
  },
  parameters: {
    backgrounds: { default: 'facebook' }
  }
}

export const OnDark: Story = {
  args: {
    width: 48,
    height: 48
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}
