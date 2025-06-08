import { Tag } from '@/app/ui/components/atoms/tag'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Tag> = {
  title: 'atoms/Tag',
  component: Tag,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: '観光',
    href: '/search?category=tourism'
  }
}

export const Culture: Story = {
  args: {
    title: '文化',
    href: '/search?category=culture'
  }
}

export const Food: Story = {
  args: {
    title: '食べ物',
    href: '/search?category=food'
  }
}

export const Nature: Story = {
  args: {
    title: '自然',
    href: '/search?category=nature'
  }
}

export const Festival: Story = {
  args: {
    title: '祭り',
    href: '/search?category=festival'
  }
}

export const LongText: Story = {
  args: {
    title: '非常に長いタグ名のテスト',
    href: '/search?category=long-text-test'
  }
}
