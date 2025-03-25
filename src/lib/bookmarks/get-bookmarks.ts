import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import clientPromise from '@/lib/mongodb'
import { getServerSession } from 'next-auth'

type Props = {
  slug?: string
}

export const getBookmarks = async ({ slug }: Props) => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  const query: { userId: string; isActive: boolean; slug?: string } = {
    userId: session.user.id,
    isActive: true
  }

  if (slug) {
    query.slug = slug
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'travel-like-a-local')

    const bookmarks = await db.collection('bookmarks').find(query).sort({ createdAt: -1 }).toArray()
    return bookmarks
  } catch (error) {
    console.error('Bookmark fetch error:', error)
    return null
  }
}
