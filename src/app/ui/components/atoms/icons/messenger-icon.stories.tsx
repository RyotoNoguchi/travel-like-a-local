import { MessengerIcon } from '@/app/ui/components/atoms/icons/messenger-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MessengerIcon> = {
  title: 'atoms/icons/MessengerIcon',
  component: MessengerIcon,
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
    },
    fill: {
      control: 'color'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 48,
    height: 48,
    fill: '#0084FF'
  }
}

export const Small: Story = {
  args: {
    width: 24,
    height: 24,
    fill: '#0084FF'
  }
}

export const Large: Story = {
  args: {
    width: 64,
    height: 64,
    fill: '#0084FF'
  }
}

export const White: Story = {
  args: {
    width: 48,
    height: 48,
    fill: 'white'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}
