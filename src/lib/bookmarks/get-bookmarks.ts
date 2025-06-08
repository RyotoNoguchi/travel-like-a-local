/* eslint-disable no-console */
import { authOptions } from '@/lib/auth/authOptions'
import clientPromise from '@/lib/mongodb'
import type { Bookmark } from '@/types/bookmark'
import type { WithId } from 'mongodb'
import { getServerSession } from 'next-auth'

type Props = {
  blogPostSlug?: string
}

export const getBookmarks = async ({ blogPostSlug }: Props): Promise<WithId<Bookmark>[] | null> => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  const query: { userId: string; isActive: boolean; blogPostSlug?: string } = {
    userId: session.user.id,
    isActive: true
  }

  if (blogPostSlug) {
    query.blogPostSlug = blogPostSlug
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'travel-like-a-local')

    const bookmarks = await db.collection('bookmarks').find(query).sort({ createdAt: -1 }).toArray()
    return bookmarks as WithId<Bookmark>[]
  } catch (error) {
    console.error('Bookmark fetch error:', error)
    return null
  }
}
