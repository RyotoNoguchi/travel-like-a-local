import { ThreadsIcon } from '@/app/ui/components/atoms/icons/threads-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ThreadsIcon> = {
  title: 'atoms/icons/ThreadsIcon',
  component: ThreadsIcon,
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
