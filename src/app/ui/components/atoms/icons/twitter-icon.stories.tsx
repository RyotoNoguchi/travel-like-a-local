import { TwitterIcon } from '@/app/ui/components/atoms/icons/twitter-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TwitterIcon> = {
  title: 'atoms/icons/TwitterIcon',
  component: TwitterIcon,
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
    backgrounds: { default: 'dark' }
  }
}

export const Small: Story = {
  args: {
    width: 24,
    height: 24
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}

export const Large: Story = {
  args: {
    width: 64,
    height: 64
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}

export const OnTwitterBlue: Story = {
  args: {
    width: 48,
    height: 48
  },
  parameters: {
    backgrounds: {
      default: 'custom',
      values: [{ name: 'custom', value: '#1DA1F2' }]
    }
  }
}
