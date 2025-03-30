'use client'

/* eslint-disable no-console */
import { BookmarkButton } from '@/app/ui/components/molecules/bookmark-button/presenter'
import { PopupContainer } from '@/app/ui/components/molecules/popup/container'
import { useRouter } from '@/i18n/routing'
import type { ButtonConfig } from '@/types/button'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState, type FC } from 'react'

type Props = {
  blogPostSlug: string
  blogPostTitle: string
  width: number
  height: number
  strokeColor: {
    active: string
    inactive: string
  }
  fillColor: {
    active: string
    inactive: string
  }
  isBookmarksPage: boolean
  onBookmarkChange?: (blogPostSlug: string, isBookmarked: boolean) => void
}

export const BookmarkButtonContainer: FC<Props> = ({ blogPostSlug, blogPostTitle, strokeColor, fillColor, isBookmarksPage, onBookmarkChange, ...props }) => {
  const { data: session } = useSession()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const t = useTranslations()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      const checkBookmarkStatus = async () => {
        try {
          const response = await fetch(`/api/bookmarks?blogPostSlug=${blogPostSlug}`)
          if (response.ok) {
            const data = await response.json()
            setIsBookmarked(data.length > 0)
          }
        } catch (error) {
          console.error('Failed to check bookmark status:', error)
        }
      }

      checkBookmarkStatus()
    }
  }, [session, blogPostSlug])

  const handleLogin = () => {
    router.push('/auth/signin')
  }

  const handleBookmark = async () => {
    if (!session) {
      setIsPopupOpen(true)
      return
    }

    setIsLoading(true)

    try {
      if (isBookmarked) {
        await fetch('/api/bookmarks', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ blogPostSlug })
        })
        setIsBookmarked(false)
        if (isBookmarksPage && onBookmarkChange) {
          onBookmarkChange(blogPostSlug, false)
        }
      } else {
        // 追加処理
        await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ blogPostSlug, blogPostTitle })
        })
        setIsBookmarked(true)
      }
    } catch (error) {
      console.error('Bookmark action failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const popupButtons: ButtonConfig[] = [
    { text: t('Popup.cancel'), onClick: () => {}, variant: 'secondary' },
    { text: t('Popup.login'), onClick: handleLogin, variant: 'primary' }
  ]

  return (
    <>
      <BookmarkButton
        isBookmarked={isBookmarked}
        handleBookmark={handleBookmark}
        isLoading={isLoading}
        strokeColor={strokeColor}
        bookmarkActionTranslation={{ add: t('Bookmark.addBookmark'), remove: t('Bookmark.removeBookmark') }}
        fillColor={fillColor}
        {...props}
      />
      <PopupContainer
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={t('Popup.loginRequired')}
        message={t('Popup.loginToBookmark')}
        buttons={popupButtons}
      />
    </>
  )
}
