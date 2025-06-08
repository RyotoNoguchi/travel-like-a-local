import { COLORS } from '@/app/ui/colors'
import { ArticleIcon } from '@/app/ui/components/atoms/icons/article-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ArticleIcon> = {
  title: 'atoms/icons/ArticleIcon',
  component: ArticleIcon,
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
  },
  render: (args) => (
    <div style={{ color: COLORS.DARK_GRAY }}>
      <ArticleIcon {...args} />
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
      <ArticleIcon {...args} />
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
      <ArticleIcon {...args} />
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
      <ArticleIcon {...args} />
    </div>
  )
}

export const CustomColor: Story = {
  args: {
    width: 32,
    height: 32
  },
  render: (args) => (
    <div style={{ color: '#ff6b6b' }}>
      <ArticleIcon {...args} />
    </div>
  )
}
