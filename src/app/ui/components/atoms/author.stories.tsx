import { Author } from '@/app/ui/components/atoms/author'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Author> = {
  title: 'atoms/Author',
  component: Author,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const maleAvatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
const femaleAvatarUrl = 'https://images.unsplash.com/photo-1494790108755-2616b612b412?w=100&q=80'
const longNameAvatarUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'

const mockAuthor = {
  name: '山田太郎',
  avatar: {
    url: maleAvatarUrl,
    title: '山田太郎のアバター'
  }
}

const mockAuthorFemale = {
  name: '佐藤花子',
  avatar: {
    url: femaleAvatarUrl,
    title: '佐藤花子のアバター'
  }
}

const mockAuthorWithoutAvatar = {
  name: '田中一郎',
  avatar: null
}

const mockAuthorLongName = {
  name: '非常に長い名前のライター太郎',
  avatar: {
    url: longNameAvatarUrl,
    title: '非常に長い名前のライター太郎のアバター'
  }
}

export const Primary: Story = {
  args: {
    author: mockAuthor
  }
}

export const Female: Story = {
  args: {
    author: mockAuthorFemale
  }
}

export const WithoutAvatar: Story = {
  args: {
    author: mockAuthorWithoutAvatar
  }
}

export const LongName: Story = {
  args: {
    author: mockAuthorLongName
  }
}

export const NoAuthor: Story = {
  args: {
    author: null
  }
}
