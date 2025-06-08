import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'molecules/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Simple: Story = {
  args: {
    breadcrumbs: [
      { label: '記事', href: '/articles' },
      { label: '東京観光ガイド', href: '/articles/tokyo-guide' }
    ]
  }
}

export const Deep: Story = {
  args: {
    breadcrumbs: [
      { label: '記事', href: '/articles' },
      { label: '観光', href: '/articles/category/tourism' },
      { label: '東京', href: '/articles/category/tourism/tokyo' },
      { label: '浅草寺ガイド', href: '/articles/tokyo/sensoji-temple' }
    ]
  }
}

export const Tours: Story = {
  args: {
    breadcrumbs: [
      { label: 'ツアー', href: '/tours' },
      { label: '京都文化体験ツアー', href: '/tours/kyoto-culture' }
    ]
  }
}

export const Search: Story = {
  args: {
    breadcrumbs: [
      { label: '検索', href: '/search' },
      { label: '検索結果: "温泉"', href: '/search?q=温泉' }
    ]
  }
}

export const VeryLong: Story = {
  args: {
    breadcrumbs: [
      { label: '記事', href: '/articles' },
      { label: 'カテゴリー', href: '/articles/category' },
      { label: '食べ物', href: '/articles/category/food' },
      { label: '地域料理', href: '/articles/category/food/regional' },
      { label: '関西', href: '/articles/category/food/regional/kansai' },
      { label: '大阪', href: '/articles/category/food/regional/kansai/osaka' },
      { label: '大阪の美味しいたこ焼き店ベスト10', href: '/articles/osaka-takoyaki-best-10' }
    ]
  }
}

export const SingleLevel: Story = {
  args: {
    breadcrumbs: [{ label: 'お気に入り', href: '/bookmarks' }]
  }
}

export const About: Story = {
  args: {
    breadcrumbs: [{ label: 'このサイトについて', href: '/about' }]
  }
}

export const LongLabels: Story = {
  args: {
    breadcrumbs: [
      { label: '非常に長いラベル名のカテゴリー', href: '/very-long-category' },
      { label: 'さらに長い記事のタイトルの例', href: '/very-long-article-title' }
    ]
  }
}
