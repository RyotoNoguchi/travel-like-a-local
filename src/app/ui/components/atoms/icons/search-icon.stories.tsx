import { COLORS } from '@/app/ui/colors'
import { SearchIcon } from '@/app/ui/components/atoms/icons/search-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SearchIcon> = {
  title: 'atoms/icons/SearchIcon',
  component: SearchIcon,
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
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 24,
    height: 24,
    color: COLORS.GRAY
  }
}

export const Large: Story = {
  args: {
    width: 48,
    height: 48,
    color: COLORS.PRIMARY
  }
}

export const Small: Story = {
  args: {
    width: 16,
    height: 16,
    color: COLORS.DARK_GRAY
  }
}

export const White: Story = {
  args: {
    width: 32,
    height: 32,
    color: COLORS.WHITE
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}

export const Primary: Story = {
  args: {
    width: 24,
    height: 24,
    color: COLORS.PRIMARY
  }
}

export const CustomColor: Story = {
  args: {
    width: 32,
    height: 32,
    color: '#ff6b6b'
  }
}

export const ExtraLarge: Story = {
  args: {
    width: 64,
    height: 64,
    color: COLORS.PRIMARY
  }
}

export const DifferentDimensions: Story = {
  args: {
    width: 40,
    height: 20,
    color: COLORS.GRAY
  }
}
