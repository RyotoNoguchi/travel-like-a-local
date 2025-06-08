import { COLORS } from '@/app/ui/colors'
import { BookmarkIcon } from '@/app/ui/components/atoms/icons/bookmark-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof BookmarkIcon> = {
  title: 'atoms/icons/BookmarkIcon',
  component: BookmarkIcon,
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
    strokeColor: {
      control: 'color'
    },
    fillColor: {
      control: 'color'
    },
    strokeWidth: {
      control: 'number'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 24,
    height: 24,
    strokeColor: COLORS.GRAY,
    fillColor: 'none',
    strokeWidth: 2
  }
}

export const Filled: Story = {
  args: {
    width: 24,
    height: 24,
    strokeColor: COLORS.PRIMARY,
    fillColor: COLORS.PRIMARY,
    strokeWidth: 2
  }
}

export const Large: Story = {
  args: {
    width: 48,
    height: 48,
    strokeColor: COLORS.PRIMARY,
    fillColor: 'none',
    strokeWidth: 2
  }
}

export const Small: Story = {
  args: {
    width: 16,
    height: 16,
    strokeColor: COLORS.DARK_GRAY,
    fillColor: 'none',
    strokeWidth: 1
  }
}

export const CustomColors: Story = {
  args: {
    width: 32,
    height: 32,
    strokeColor: '#ff6b6b',
    fillColor: 'rgba(255, 107, 107, 0.2)',
    strokeWidth: 2
  }
}
