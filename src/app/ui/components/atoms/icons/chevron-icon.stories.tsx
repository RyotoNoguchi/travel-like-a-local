import { COLORS } from '@/app/ui/colors'
import { ChevronIcon } from '@/app/ui/components/atoms/icons/chevron-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ChevronIcon> = {
  title: 'atoms/icons/ChevronIcon',
  component: ChevronIcon,
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
    className: {
      control: 'text'
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
  },
  render: (args) => (
    <div style={{ color: COLORS.DARK_GRAY }}>
      <ChevronIcon {...args} />
    </div>
  )
}

export const Large: Story = {
  args: {
    width: 48,
    height: 48
  },
  render: (args) => (
    <div style={{ color: COLORS.PRIMARY }}>
      <ChevronIcon {...args} />
    </div>
  )
}

export const Primary: Story = {
  args: {
    width: 24,
    height: 24
  },
  render: (args) => (
    <div style={{ color: COLORS.PRIMARY }}>
      <ChevronIcon {...args} />
    </div>
  )
}

export const White: Story = {
  args: {
    width: 32,
    height: 32
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  render: (args) => (
    <div style={{ color: COLORS.WHITE }}>
      <ChevronIcon {...args} />
    </div>
  )
}

export const WithClassName: Story = {
  args: {
    width: 24,
    height: 24,
    className: 'rotate-90'
  },
  render: (args) => (
    <div style={{ color: COLORS.PRIMARY }}>
      <ChevronIcon {...args} />
    </div>
  )
}

export const Rotated180: Story = {
  args: {
    width: 24,
    height: 24,
    className: 'rotate-180'
  },
  render: (args) => (
    <div style={{ color: COLORS.GRAY }}>
      <ChevronIcon {...args} />
    </div>
  )
}
