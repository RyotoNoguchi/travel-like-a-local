import { TagList } from '@/app/ui/components/molecules/tag-list'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TagList> = {
  title: 'molecules/TagList',
  component: TagList,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const mockTags = [{ name: '観光' }, { name: '食べ物' }, { name: '文化' }, { name: '東京' }]

const mockManyTags = [
  { name: '観光' },
  { name: '食べ物' },
  { name: '文化' },
  { name: '東京' },
  { name: '京都' },
  { name: '大阪' },
  { name: '温泉' },
  { name: '神社' },
  { name: 'お寺' },
  { name: '祭り' },
  { name: 'ラーメン' },
  { name: '寿司' }
]

const mockLongNameTags = [{ name: '非常に長いタグ名の例' }, { name: 'もう一つの長いタグ名' }, { name: '短い' }]

export const Primary: Story = {
  args: {
    tags: mockTags
  }
}

export const ManyTags: Story = {
  args: {
    tags: mockManyTags
  }
}

export const SingleTag: Story = {
  args: {
    tags: [{ name: '観光' }]
  }
}

export const EmptyTags: Story = {
  args: {
    tags: []
  }
}

export const LongNames: Story = {
  args: {
    tags: mockLongNameTags
  }
}

export const WithNullTags: Story = {
  args: {
    tags: [{ name: '観光' }, null, { name: '食べ物' }, { name: null }, { name: '文化' }]
  }
}

export const FoodTags: Story = {
  args: {
    tags: [{ name: 'ラーメン' }, { name: '寿司' }, { name: 'たこ焼き' }, { name: '和食' }, { name: 'お好み焼き' }]
  }
}

export const LocationTags: Story = {
  args: {
    tags: [{ name: '東京' }, { name: '京都' }, { name: '大阪' }, { name: '北海道' }, { name: '沖縄' }]
  }
}
