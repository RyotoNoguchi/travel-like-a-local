import { COLORS } from '@/app/ui/colors'
import { CultureIcon } from '@/app/ui/components/atoms/icons/culture-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CultureIcon> = {
  title: 'atoms/icons/CultureIcon',
  component: CultureIcon,
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
    strokeColor: COLORS.DARK_GRAY
  }
}

export const Large: Story = {
  args: {
    width: 48,
    height: 48,
    strokeColor: COLORS.PRIMARY
  }
}

export const Primary: Story = {
  args: {
    width: 24,
    height: 24,
    strokeColor: COLORS.PRIMARY
  }
}

export const White: Story = {
  args: {
    width: 32,
    height: 32,
    strokeColor: COLORS.WHITE
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}
