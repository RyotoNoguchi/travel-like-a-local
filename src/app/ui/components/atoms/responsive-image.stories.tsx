import { ResponsiveImage } from '@/app/ui/components/atoms/responsive-image'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ResponsiveImage> = {
  title: 'atoms/ResponsiveImage',
  component: ResponsiveImage,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  argTypes: {
    fill: {
      control: 'boolean'
    },
    className: {
      control: 'text'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const landscapeImageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
const portraitImageUrl = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80'
const squareImageUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'

export const Primary: Story = {
  args: {
    src: landscapeImageUrl,
    alt: '美しい山の風景',
    width: 800,
    height: 600
  }
}

export const WithFill: Story = {
  args: {
    src: landscapeImageUrl,
    alt: '美しい山の風景',
    fill: true
  }
}

export const Portrait: Story = {
  args: {
    src: portraitImageUrl,
    alt: '縦長の風景写真',
    width: 600,
    height: 800
  }
}

export const Square: Story = {
  args: {
    src: squareImageUrl,
    alt: '正方形の写真',
    width: 600,
    height: 600
  }
}

export const CustomClassName: Story = {
  args: {
    src: landscapeImageUrl,
    alt: 'カスタムクラス適用画像',
    width: 800,
    height: 600,
    className: 'object-contain rounded-lg border-2 border-primary'
  }
}

export const ObjectCover: Story = {
  args: {
    src: portraitImageUrl,
    alt: 'オブジェクトカバー画像',
    fill: true,
    className: 'object-cover'
  }
}

export const ObjectContain: Story = {
  args: {
    src: portraitImageUrl,
    alt: 'オブジェクトコンテイン画像',
    fill: true,
    className: 'object-contain bg-gray-100'
  }
}

export const RoundedImage: Story = {
  args: {
    src: squareImageUrl,
    alt: '丸い画像',
    width: 400,
    height: 400,
    className: 'object-cover rounded-full'
  }
}
