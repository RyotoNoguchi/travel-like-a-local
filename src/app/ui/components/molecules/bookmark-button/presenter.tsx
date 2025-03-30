import { COLORS } from '@/app/ui/colors'
import { BookmarkIcon } from '@/app/ui/components/atoms/icons/bookmark-icon'
import { SpinnerIcon } from '@/app/ui/components/atoms/icons/spinner-icon'
import type { FC } from 'react'

type Props = {
  isBookmarked: boolean
  isLoading: boolean
  width: number
  height: number
  bookmarkActionTranslation: {
    add: string
    remove: string
  }
  strokeColor: {
    active: string
    inactive: string
  }
  fillColor: {
    active: string
    inactive: string
  }
  handleBookmark: () => void
}

export const BookmarkButton: FC<Props> = ({ isBookmarked, handleBookmark, isLoading, width, height, strokeColor, fillColor, bookmarkActionTranslation }) => {
  if (isLoading) {
    return <SpinnerIcon size={width} color={COLORS.GRAY} />
  }

  return (
    <button
      onClick={handleBookmark}
      aria-label={isBookmarked ? bookmarkActionTranslation.remove : bookmarkActionTranslation.add}
      aria-pressed={isBookmarked}
      title={isBookmarked ? bookmarkActionTranslation.remove : bookmarkActionTranslation.add}
      disabled={isLoading}
      className="group focus:outline-none rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {isBookmarked ? (
        <BookmarkIcon width={width} height={height} strokeColor={strokeColor.active} fillColor={fillColor.active} strokeWidth={1} />
      ) : (
        <BookmarkIcon width={width} height={height} strokeColor={strokeColor.inactive} fillColor={fillColor.inactive} strokeWidth={1} />
      )}
      <span className="sr-only">{isBookmarked ? bookmarkActionTranslation.remove : bookmarkActionTranslation.add}</span>
    </button>
  )
}
