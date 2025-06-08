import { BlogPostCard } from '@/app/ui/components/molecules/blog-post-card/index'
import type { BlogPostWithHref } from '@/types/blog-post'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof BlogPostCard> = {
  title: 'molecules/BlogPostCard',
  component: BlogPostCard,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const mockBlogPost = {
  sys: {
    id: '1'
  },
  title: '東京の隠れた名所を発見する旅',
  href: '/articles/tokyo-hidden-spots',
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80',
    title: '東京の美しい街並み'
  },
  author: {
    name: '山田太郎',
    avatar: {
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      title: '山田太郎のアバター'
    }
  },
  publishedDate: '2024-01-15'
} as unknown as BlogPostWithHref

const mockBlogPostWithoutImage = {
  sys: {
    id: '2'
  },
  title: '京都の伝統文化体験ガイド',
  href: '/articles/kyoto-culture-guide',
  featuredImage: null,
  author: {
    name: '佐藤花子',
    avatar: {
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b412?w=100&q=80',
      title: '佐藤花子のアバター'
    }
  },
  publishedDate: '2024-02-20'
}

const mockBlogPostLongTitle = {
  sys: {
    id: '3'
  },
  title: '非常に長いタイトルの記事の例です。このようなタイトルがどのように表示されるかをテストします',
  href: '/articles/very-long-title-example',
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80',
    title: '京都の寺院'
  },
  author: {
    name: '田中一郎',
    avatar: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      title: '田中一郎のアバター'
    }
  },
  publishedDate: '2024-03-10'
}

const mockBlogPostMinimal = {
  sys: {
    id: '4'
  },
  title: '大阪グルメ',
  href: '/articles/osaka-food',
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80',
    title: '大阪の美味しい料理'
  },
  author: null,
  publishedDate: null
}

export const Primary: Story = {
  args: {
    blogPost: mockBlogPost
  }
}

export const WithoutImage: Story = {
  args: {
    blogPost: mockBlogPostWithoutImage as unknown as BlogPostWithHref
  }
}

export const LongTitle: Story = {
  args: {
    blogPost: mockBlogPostLongTitle as unknown as BlogPostWithHref
  }
}

export const Minimal: Story = {
  args: {
    blogPost: mockBlogPostMinimal as unknown as BlogPostWithHref
  }
}

export const Multiple: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BlogPostCard blogPost={mockBlogPost as unknown as BlogPostWithHref} />
      <BlogPostCard blogPost={mockBlogPostWithoutImage as unknown as BlogPostWithHref} />
      <BlogPostCard blogPost={mockBlogPostLongTitle as unknown as BlogPostWithHref} />
      <BlogPostCard blogPost={mockBlogPostMinimal as unknown as BlogPostWithHref} />
    </div>
  )
}
