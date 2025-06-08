import { GoogleIcon } from '@/app/ui/components/atoms/icons/google-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof GoogleIcon> = {
  title: 'atoms/icons/GoogleIcon',
  component: GoogleIcon,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  argTypes: {
    width: {
      control: 'text'
    },
    height: {
      control: 'text'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 'w-6',
    height: 'h-6'
  },
  render: (args) => (
    <div style={{ color: '#4285f4' }}>
      <GoogleIcon {...args} />
    </div>
  )
}

export const Small: Story = {
  args: {
    width: 'w-4',
    height: 'h-4'
  },
  render: (args) => (
    <div style={{ color: '#4285f4' }}>
      <GoogleIcon {...args} />
    </div>
  )
}

export const Large: Story = {
  args: {
    width: 'w-12',
    height: 'h-12'
  },
  render: (args) => (
    <div style={{ color: '#4285f4' }}>
      <GoogleIcon {...args} />
    </div>
  )
}

export const ExtraLarge: Story = {
  args: {
    width: 'w-16',
    height: 'h-16'
  },
  render: (args) => (
    <div style={{ color: '#4285f4' }}>
      <GoogleIcon {...args} />
    </div>
  )
}

export const Dark: Story = {
  args: {
    width: 'w-8',
    height: 'h-8'
  },
  render: (args) => (
    <div style={{ color: '#333' }}>
      <GoogleIcon {...args} />
    </div>
  )
}

export const OnButton: Story = {
  args: {
    width: 'w-5',
    height: 'h-5'
  },
  render: (args) => (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: '#4285f4',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      <GoogleIcon {...args} />
      Sign in with Google
    </button>
  )
}
