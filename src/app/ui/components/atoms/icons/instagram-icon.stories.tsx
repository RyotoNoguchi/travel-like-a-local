import { InstagramIcon } from '@/app/ui/components/atoms/icons/instagram-icon'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof InstagramIcon> = {
  title: 'atoms/icons/InstagramIcon',
  component: InstagramIcon,
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
    variant: {
      control: 'select',
      options: ['color', 'white']
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 48,
    height: 48,
    variant: 'color'
  }
}

export const White: Story = {
  args: {
    width: 48,
    height: 48,
    variant: 'white'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}

export const Small: Story = {
  args: {
    width: 24,
    height: 24,
    variant: 'color'
  }
}

export const Large: Story = {
  args: {
    width: 64,
    height: 64,
    variant: 'color'
  }
}

export const SmallWhite: Story = {
  args: {
    width: 24,
    height: 24,
    variant: 'white'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}

export const Medium: Story = {
  args: {
    width: 32,
    height: 32,
    variant: 'color'
  }
}

export const Comparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <InstagramIcon width={48} height={48} variant="color" />
        <div>Color</div>
      </div>
      <div style={{ textAlign: 'center', backgroundColor: '#333', padding: '10px', borderRadius: '8px' }}>
        <InstagramIcon width={48} height={48} variant="white" />
        <div style={{ color: 'white' }}>White</div>
      </div>
    </div>
  )
}
