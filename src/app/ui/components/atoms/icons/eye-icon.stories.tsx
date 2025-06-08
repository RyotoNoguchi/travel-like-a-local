import { EyeIcon } from '@/app/ui/components/atoms/icons/eye-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof EyeIcon> = {
  title: 'atoms/icons/EyeIcon',
  component: EyeIcon,
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
