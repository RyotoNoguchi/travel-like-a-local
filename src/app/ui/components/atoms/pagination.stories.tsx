import { Pagination } from '@/app/ui/components/atoms/pagination'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Pagination> = {
  title: 'atoms/Pagination',
  component: Pagination,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  argTypes: {
    currentPage: {
      control: 'number'
    },
    totalPages: {
      control: 'number'
    },
    baseUrl: {
      control: 'text'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    baseUrl: '/articles'
  }
}

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    baseUrl: '/articles'
  }
}

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    baseUrl: '/articles'
  }
}

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    baseUrl: '/articles'
  }
}

export const TwoPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 2,
    baseUrl: '/articles'
  }
}

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    baseUrl: '/search'
  }
}

export const BlogArticles: Story = {
  args: {
    currentPage: 3,
    totalPages: 8,
    baseUrl: '/blog'
  }
}

export const SearchResults: Story = {
  args: {
    currentPage: 2,
    totalPages: 6,
    baseUrl: '/search?q=tokyo'
  }
}
