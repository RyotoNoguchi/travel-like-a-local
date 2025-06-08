import { COLORS } from '@/app/ui/colors'
import { OnsenIcon } from '@/app/ui/components/atoms/icons/onsen-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof OnsenIcon> = {
  title: 'atoms/icons/OnsenIcon',
  component: OnsenIcon,
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
    width: 100,
    height: 90,
    fillColor: COLORS.DARK_GRAY
  }
}

export const Medium: Story = {
  args: {
    width: 200,
    height: 180,
    fillColor: COLORS.PRIMARY
  }
}

export const Large: Story = {
  args: {
    width: 300,
    height: 270,
    fillColor: COLORS.PRIMARY
  }
}

export const Blue: Story = {
  args: {
    width: 150,
    height: 135,
    fillColor: '#3b82f6'
  }
}

export const Brown: Story = {
  args: {
    width: 150,
    height: 135,
    fillColor: '#8b5a3c'
  }
}

export const White: Story = {
  args: {
    width: 150,
    height: 135,
    fillColor: COLORS.WHITE
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}
