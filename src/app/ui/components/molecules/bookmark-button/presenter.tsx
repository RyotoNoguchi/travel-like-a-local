import { COLORS } from '@/app/ui/colors'
import { BookmarkIcon } from '@/app/ui/components/atoms/icons/bookmark-icon'
import { SpinnerIcon } from '@/app/ui/components/atoms/icons/spinner-icon'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

type Props = {
  isBookmarked: boolean
  isLoading: boolean
  width: number
  height: number
  handleBookmark: () => void
}

export const BookmarkButton: FC<Props> = ({ isBookmarked, handleBookmark, isLoading, width, height }) => {
  const t = useTranslations('Bookmark')

  if (isLoading) {
    return <SpinnerIcon size={width} color={COLORS.GRAY} />
  }

  return (
    <button
      onClick={handleBookmark}
      aria-label={isBookmarked ? t('removeBookmark') : t('addBookmark')}
      aria-pressed={isBookmarked}
      title={isBookmarked ? t('removeBookmark') : t('addBookmark')}
      disabled={isLoading}
      className="focus:outline-none rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {isBookmarked ? (
        <BookmarkIcon width={width} height={height} color={COLORS.PRIMARY} fillColor={COLORS.PRIMARY} />
      ) : (
        <BookmarkIcon width={width} height={height} color={COLORS.GRAY} fillColor={COLORS.TRANSPARENT} />
      )}
      <span className="sr-only">{isBookmarked ? t('removeBookmark') : t('addBookmark')}</span>
    </button>
  )
}
