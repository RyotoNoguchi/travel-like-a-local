import { CalendarIcon } from '@/app/ui/components/atoms/icons/calendar-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CalendarIcon> = {
  title: 'atoms/icons/CalendarIcon',
  component: CalendarIcon,
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
    width: 24,
    height: 24
  }
}

export const Small: Story = {
  args: {
    width: 16,
    height: 16
  }
}

export const Large: Story = {
  args: {
    width: 48,
    height: 48
  }
}

export const ExtraLarge: Story = {
  args: {
    width: 64,
    height: 64
  }
}

export const Medium: Story = {
  args: {
    width: 32,
    height: 32
  }
}

export const Tiny: Story = {
  args: {
    width: 12,
    height: 12
  }
}

export const DifferentDimensions: Story = {
  args: {
    width: 30,
    height: 20
  }
}
