import { DateComponent } from '@/app/ui/components/atoms/date'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof DateComponent> = {
  title: 'atoms/DateComponent',
  component: DateComponent,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  argTypes: {
    className: {
      control: 'text'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    date: new Date('2024-01-15'),
    className: 'text-gray-600'
  }
}

export const StringDate: Story = {
  args: {
    date: '2024-03-20',
    className: 'text-gray-600'
  }
}

export const NumberDate: Story = {
  args: {
    date: 1640995200000, // 2022-01-01のタイムスタンプ
    className: 'text-gray-600'
  }
}

export const WithoutClassName: Story = {
  args: {
    date: new Date('2024-06-08')
  }
}

export const SmallText: Story = {
  args: {
    date: new Date('2024-12-25'),
    className: 'text-sm text-gray-500'
  }
}

export const LargeText: Story = {
  args: {
    date: new Date('2024-07-04'),
    className: 'text-lg font-semibold text-primary'
  }
}

export const ColoredText: Story = {
  args: {
    date: new Date('2024-09-15'),
    className: 'text-blue-600 font-medium'
  }
}

export const CurrentDate: Story = {
  args: {
    date: new Date(),
    className: 'text-green-600 font-bold'
  }
}
