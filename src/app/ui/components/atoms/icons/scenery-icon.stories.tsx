import { COLORS } from '@/app/ui/colors'
import { SceneryIcon } from '@/app/ui/components/atoms/icons/scenery-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SceneryIcon> = {
  title: 'atoms/icons/SceneryIcon',
  component: SceneryIcon,
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
    fillColor: {
      control: 'color'
    },
    strokeColor: {
      control: 'color'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Small: Story = {
  args: {
    width: 16,
    height: 16,
    fillColor: COLORS.DARK_GRAY,
    strokeColor: COLORS.DARK_GRAY
  }
}

export const Large: Story = {
  args: {
    width: 48,
    height: 48,
    fillColor: COLORS.PRIMARY,
    strokeColor: COLORS.PRIMARY
  }
}

export const Primary: Story = {
  args: {
    width: 24,
    height: 24,
    fillColor: COLORS.PRIMARY,
    strokeColor: COLORS.PRIMARY
  }
}

export const White: Story = {
  args: {
    width: 32,
    height: 32,
    fillColor: COLORS.WHITE,
    strokeColor: COLORS.WHITE
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}

export const CustomColors: Story = {
  args: {
    width: 32,
    height: 32,
    fillColor: '#22c55e',
    strokeColor: '#16a34a'
  }
}
