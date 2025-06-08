import { COLORS } from '@/app/ui/colors'
import { BookmarkButton } from '@/app/ui/components/molecules/bookmark-button/presenter'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof BookmarkButton> = {
  title: 'molecules/BookmarkButton',
  component: BookmarkButton,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  argTypes: {
    isBookmarked: {
      control: 'boolean'
    },
    isLoading: {
      control: 'boolean'
    },
    width: {
      control: 'number'
    },
    height: {
      control: 'number'
    },
    handleBookmark: {
      action: 'bookmark clicked'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const defaultProps = {
  width: 28,
  height: 28,
  bookmarkActionTranslation: {
    add: 'ブックマークに追加',
    remove: 'ブックマークから削除'
  },
  strokeColor: {
    active: COLORS.PRIMARY,
    inactive: COLORS.GRAY
  },
  fillColor: {
    active: COLORS.PRIMARY,
    inactive: COLORS.WHITE
  },
  handleBookmark: () => {}
}

export const Default: Story = {
  args: {
    ...defaultProps,
    isBookmarked: false,
    isLoading: false
  }
}

export const Bookmarked: Story = {
  args: {
    ...defaultProps,
    isBookmarked: true,
    isLoading: false
  }
}

export const Loading: Story = {
  args: {
    ...defaultProps,
    isBookmarked: false,
    isLoading: true
  }
}

export const SmallSize: Story = {
  args: {
    ...defaultProps,
    width: 16,
    height: 16,
    isBookmarked: false,
    isLoading: false
  }
}

export const LargeSize: Story = {
  args: {
    ...defaultProps,
    width: 48,
    height: 48,
    isBookmarked: false,
    isLoading: false
  }
}

export const CustomColors: Story = {
  args: {
    ...defaultProps,
    isBookmarked: true,
    isLoading: false,
    strokeColor: {
      active: '#ef4444',
      inactive: '#94a3b8'
    },
    fillColor: {
      active: '#ef4444',
      inactive: '#ffffff'
    }
  }
}

export const InteractiveDemo: Story = {
  render: () => {
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleBookmark = () => {
      setIsLoading(true)
      setTimeout(() => {
        setIsBookmarked(!isBookmarked)
        setIsLoading(false)
      }, 1000)
    }

    return (
      <div style={{ padding: '20px' }}>
        <BookmarkButton {...defaultProps} isBookmarked={isBookmarked} isLoading={isLoading} handleBookmark={handleBookmark} />
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          状態: {isLoading ? '読み込み中...' : isBookmarked ? 'ブックマーク済み' : '未ブックマーク'}
        </div>
      </div>
    )
  }
}
