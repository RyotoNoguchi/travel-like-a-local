import { WhatsAppIcon } from '@/app/ui/components/atoms/icons/whats-app-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof WhatsAppIcon> = {
  title: 'atoms/icons/WhatsAppIcon',
  component: WhatsAppIcon,
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
    width: 48,
    height: 48
  },
  parameters: {
    backgrounds: {
      default: 'custom',
      values: [{ name: 'custom', value: '#25D366' }]
    }
  }
}

export const Small: Story = {
  args: {
    width: 24,
    height: 24
  },
  parameters: {
    backgrounds: {
      default: 'custom',
      values: [{ name: 'custom', value: '#25D366' }]
    }
  }
}

export const Large: Story = {
  args: {
    width: 64,
    height: 64
  },
  parameters: {
    backgrounds: {
      default: 'custom',
      values: [{ name: 'custom', value: '#25D366' }]
    }
  }
}

export const OnDark: Story = {
  args: {
    width: 48,
    height: 48
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}
