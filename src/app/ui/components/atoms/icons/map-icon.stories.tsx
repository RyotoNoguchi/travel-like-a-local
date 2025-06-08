import { COLORS } from '@/app/ui/colors'
import { MapIcon } from '@/app/ui/components/atoms/icons/map-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MapIcon> = {
  title: 'atoms/icons/MapIcon',
  component: MapIcon,
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
    height: 24
  }
}

export const Small: Story = {
  args: {
    width: 16,
    height: 16,
    color: COLORS.DARK_GRAY
  }
}

export const Large: Story = {
  args: {
    width: 48,
    height: 48,
    color: COLORS.PRIMARY
  }
}

export const Primary: Story = {
  args: {
    width: 24,
    height: 24,
    color: COLORS.PRIMARY
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

export const CustomColor: Story = {
  args: {
    width: 32,
    height: 32,
    color: '#22c55e'
  }
}
