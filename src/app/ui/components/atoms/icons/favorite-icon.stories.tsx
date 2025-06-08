import { COLORS } from '@/app/ui/colors'
import { FavoriteIcon } from '@/app/ui/components/atoms/icons/favorite-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof FavoriteIcon> = {
  title: 'atoms/icons/FavoriteIcon',
  component: FavoriteIcon,
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
    color: {
      control: 'color'
    },
    fillColor: {
      control: 'color'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 24,
    height: 24,
    color: COLORS.GRAY,
    fillColor: 'none'
  }
}

export const Filled: Story = {
  args: {
    width: 24,
    height: 24,
    color: COLORS.PRIMARY,
    fillColor: COLORS.PRIMARY
  }
}

export const Large: Story = {
  args: {
    width: 48,
    height: 48,
    color: COLORS.PRIMARY,
    fillColor: 'none'
  }
}

export const Small: Story = {
  args: {
    width: 16,
    height: 16,
    color: COLORS.DARK_GRAY,
    fillColor: 'none'
  }
}

export const RedHeart: Story = {
  args: {
    width: 32,
    height: 32,
    color: '#ef4444',
    fillColor: '#ef4444'
  }
}

export const PinkHeart: Story = {
  args: {
    width: 32,
    height: 32,
    color: '#ec4899',
    fillColor: 'rgba(236, 72, 153, 0.3)'
  }
}
