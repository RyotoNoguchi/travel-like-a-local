import { Button } from '@/app/ui/components/atoms/button'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'atoms/Button',
  component: Button,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['outline', 'solid']
    },
    borderRadius: {
      control: 'select',
      options: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full']
    },
    textColor: {
      control: 'select',
      options: ['text-white', 'text-black', 'text-primary', 'text-gray-500', 'text-gray-700']
    },
    backgroundColor: {
      control: 'select',
      options: ['bg-primary', 'bg-secondary', 'bg-white', 'bg-gray-100', 'bg-gray-500']
    }
  }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const OutlinePrimary: Story = {
  args: {
    text: 'ボタン',
    href: '/search',
    variant: 'outline',
    borderRadius: 'rounded-md',
    textColor: 'text-primary',
    backgroundColor: 'bg-primary'
  }
}

export const SolidPrimary: Story = {
  args: {
    text: 'ボタン',
    href: '/search',
    variant: 'solid',
    borderRadius: 'rounded-md',
    backgroundColor: 'bg-primary'
  }
}

export const OutlineSecondary: Story = {
  args: {
    text: 'セカンダリボタン',
    href: '/about',
    variant: 'outline',
    borderRadius: 'rounded-lg',
    textColor: 'text-gray-700',
    backgroundColor: 'bg-gray-100'
  }
}

export const SolidSecondary: Story = {
  args: {
    text: 'セカンダリボタン',
    href: '/about',
    variant: 'solid',
    borderRadius: 'rounded-lg',
    backgroundColor: 'bg-gray-500'
  }
}

export const RoundedFull: Story = {
  args: {
    text: '丸いボタン',
    href: '/map',
    variant: 'solid',
    borderRadius: 'rounded-full',
    backgroundColor: 'bg-primary'
  }
}
