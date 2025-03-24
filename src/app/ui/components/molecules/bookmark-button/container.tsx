'use client'

/* eslint-disable no-console */
import { BookmarkButton } from '@/app/ui/components/molecules/bookmark-button/presenter'
import { useRouter } from '@/i18n/routing'
import { useSession } from 'next-auth/react'
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
}

export const BookmarkButtonContainer: FC<Props> = ({ blogPostSlug, blogPostTitle, ...props }) => {
  const { data: session } = useSession()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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

  const handleBookmark = async () => {
    if (!session) {
      router.push('/auth/signin')
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

  return <BookmarkButton isBookmarked={isBookmarked} handleBookmark={handleBookmark} isLoading={isLoading} {...props} />
}
