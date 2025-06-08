import { COLORS } from '@/app/ui/colors'
import { SpinnerIcon } from '@/app/ui/components/atoms/icons/spinner-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SpinnerIcon> = {
  title: 'atoms/icons/SpinnerIcon',
  component: SpinnerIcon,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  argTypes: {
    size: {
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
  args: {}
}

export const Small: Story = {
  args: {
    size: 16,
    color: COLORS.DARK_GRAY
  }
}

export const Large: Story = {
  args: {
    size: 48,
    color: COLORS.PRIMARY
  }
}

export const Primary: Story = {
  args: {
    size: 24,
    color: COLORS.PRIMARY
  }
}

export const White: Story = {
  args: {
    size: 32,
    color: COLORS.WHITE
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}

export const CustomColor: Story = {
  args: {
    size: 28,
    color: '#22c55e'
  }
}

export const LoadingButton: Story = {
  render: (args) => (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: COLORS.PRIMARY, color: 'white', borderRadius: '4px' }}
    >
      <SpinnerIcon size={16} color="white" />
      読み込み中...
    </div>
  )
}
