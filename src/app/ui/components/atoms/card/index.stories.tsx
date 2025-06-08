import { Card } from '@/app/ui/components/atoms/card/index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  title: 'atoms/Card',
  component: Card,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  argTypes: {
    showLinkButton: {
      control: 'boolean'
    },
    linkButtonText: {
      control: 'text'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const tokyoImageUrl = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80'
const osakaImageUrl = 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400&q=80'
const kyotoImageUrl = 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80'
const foodImageUrl = 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80'

export const Primary: Story = {
  args: {
    imageUrl: tokyoImageUrl,
    title: '東京観光ガイド',
    description: '日本の首都東京で体験できる素晴らしい観光スポットと文化をご紹介します。',
    href: '/articles/tokyo-guide',
    imageAlt: '東京の街並み',
    showLinkButton: true,
    linkButtonText: '詳細を見る'
  }
}

export const WithoutButton: Story = {
  args: {
    imageUrl: osakaImageUrl,
    title: '大阪の魅力',
    description: '美味しい食べ物と楽しい文化で知られる大阪の隠れた魅力を発見しましょう。',
    href: '/articles/osaka-guide',
    imageAlt: '大阪城',
    showLinkButton: false
  }
}

export const CustomButtonText: Story = {
  args: {
    imageUrl: kyotoImageUrl,
    title: '京都の伝統文化',
    description: '千年の歴史を持つ古都京都で、日本の伝統文化と美しい寺院を体験してください。',
    href: '/articles/kyoto-culture',
    imageAlt: '京都の寺院',
    showLinkButton: true,
    linkButtonText: '今すぐ予約'
  }
}

export const FoodCard: Story = {
  args: {
    imageUrl: foodImageUrl,
    title: '日本料理体験',
    description: '本格的な日本料理を学び、地元の食材で伝統的な料理を作ってみませんか。',
    href: '/tours/cooking-class',
    imageAlt: '日本料理',
    showLinkButton: true,
    linkButtonText: 'ツアーを見る'
  }
}

export const LongDescription: Story = {
  args: {
    imageUrl: tokyoImageUrl,
    title: '非常に長いタイトルのカード例',
    description:
      'これは非常に長い説明文の例です。カードのレイアウトがどのように長いテキストを処理するかをテストするためのものです。文字数が多い場合でも適切に表示されることを確認します。',
    href: '/articles/long-content',
    imageAlt: '長いコンテンツの例',
    showLinkButton: true,
    linkButtonText: '続きを読む'
  }
}

export const ShortContent: Story = {
  args: {
    imageUrl: kyotoImageUrl,
    title: '短い',
    description: '短い説明',
    href: '/short',
    imageAlt: '短いコンテンツ',
    showLinkButton: true,
    linkButtonText: '見る'
  }
}
