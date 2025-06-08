import { BlogPostItem } from '@/app/ui/components/molecules/blog-post-item/presenter'
import type { Meta, StoryObj } from '@storybook/react'
import { SessionProvider } from 'next-auth/react'

const meta: Meta<typeof BlogPostItem> = {
  title: 'molecules/BlogPostItem',
  component: BlogPostItem,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  decorators: [
    (Story) => (
      <SessionProvider>
        <Story />
      </SessionProvider>
    )
  ],
  argTypes: {
    onBookmarkChange: {
      action: 'bookmark changed'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const mockAuthor = {
  name: '山田太郎',
  avatar: {
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    title: 'Profile Image'
  }
}

const mockTags = [
  {
    name: '京都'
  },
  {
    name: '寺院'
  },
  {
    name: '桜'
  }
]

const defaultProps = {
  href: '/articles/kyoto-cherry-blossoms',
  slug: 'kyoto-cherry-blossoms',
  title: '京都の桜の名所：知られざる隠れスポット10選',
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
    title: 'Kyoto Cherry Blossoms'
  },
  seoFields: {
    pageDescription:
      '京都には多くの桜の名所がありますが、観光客にまだ知られていない美しい隠れスポットも数多く存在します。地元の人だけが知る桜の絶景をご紹介します。'
  },
  contentfulMetadata: {
    tags: mockTags,
    concepts: []
  },
  author: mockAuthor,
  publishedDate: '2024-03-15T10:00:00Z',
  isBookmarksPage: false,
  onBookmarkChange: () => {}
}

export const Default: Story = {
  args: defaultProps
}

export const WithoutImage: Story = {
  args: {
    ...defaultProps,
    featuredImage: null
  }
}

export const LongTitle: Story = {
  args: {
    ...defaultProps,
    title: '日本全国の温泉地を巡る究極の温泉旅行ガイド：秘湯から有名温泉まで、癒しの旅路を完全網羅した決定版ガイドブック'
  }
}

export const ManyTags: Story = {
  args: {
    ...defaultProps,
    contentfulMetadata: {
      tags: [{ name: '東京' }, { name: 'グルメ' }, { name: 'ラーメン' }, { name: '築地' }, { name: '食べ歩き' }, { name: '海鮮' }],
      concepts: []
    }
  }
}

export const BookmarksPage: Story = {
  args: {
    ...defaultProps,
    isBookmarksPage: true
  }
}

export const MobileView: Story = {
  args: defaultProps,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}

export const NoAuthor: Story = {
  args: {
    ...defaultProps,
    author: null
  }
}

export const OsakaFood: Story = {
  args: {
    ...defaultProps,
    href: '/articles/osaka-food-guide',
    slug: 'osaka-food-guide',
    title: '大阪グルメの真髄：たこ焼きから高級料理まで',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
      title: 'Osaka Food'
    },
    seoFields: {
      pageDescription: '大阪といえば「天下の台所」。たこ焼き、お好み焼きなどの庶民グルメから、高級懐石料理まで、大阪の食文化を深く探る美食ガイドです。'
    },
    contentfulMetadata: {
      tags: [{ name: '大阪' }, { name: 'グルメ' }, { name: 'たこ焼き' }],
      concepts: []
    },
    author: {
      name: '田中花子',
      avatar: {
        url: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face',
        title: 'Profile Image'
      }
    },
    publishedDate: '2024-02-20T14:30:00Z'
  }
}

export const TokyoTech: Story = {
  args: {
    ...defaultProps,
    href: '/articles/tokyo-tech-districts',
    slug: 'tokyo-tech-districts',
    title: '東京のテクノロジー地区：秋葉原から渋谷まで',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      title: 'Tokyo Tech'
    },
    seoFields: {
      pageDescription: '東京には秋葉原、渋谷、六本木ヒルズなど、テクノロジーとイノベーションの中心地が点在しています。それぞれの特色と魅力をご紹介します。'
    },
    contentfulMetadata: {
      tags: [{ name: '東京' }, { name: 'テクノロジー' }, { name: '秋葉原' }, { name: '渋谷' }],
      concepts: []
    },
    author: {
      name: '鈴木一郎',
      avatar: {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        title: 'Profile Image'
      }
    },
    publishedDate: '2024-01-10T09:15:00Z'
  }
}
