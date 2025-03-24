/* eslint-disable no-console */
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import clientPromise from '@/lib/mongodb'
import type { Bookmark } from '@/types/bookmark'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

// ブックマークを追加するAPI
export async function POST(req: Request) {
  // ログインチェック
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  try {
    const { blogPostSlug, blogPostTitle } = await req.json()

    // バリデーション
    if (!blogPostSlug) {
      return new NextResponse('Blog post slug is required', { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'travel-like-a-local')

    // 既存のブックマークをチェック
    const existingBookmark = await db.collection('bookmarks').findOne({
      userId: session.user.id,
      blogPostSlug,
      isActive: true
    })

    if (existingBookmark) {
      return new NextResponse('Already bookmarked', { status: 400 })
    }

    // 新しいブックマークを作成
    const bookmark: Bookmark = {
      userId: session.user.id,
      blogPostSlug,
      blogPostTitle,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('bookmarks').insertOne(bookmark)
    return NextResponse.json({ id: result.insertedId })
  } catch (error) {
    console.error('Bookmark creation error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// ブックマーク一覧を取得するAPI
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'travel-like-a-local')

    const bookmarks = await db
      .collection('bookmarks')
      .find({
        userId: session.user.id,
        isActive: true
      })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(bookmarks)
  } catch (error) {
    console.error('Bookmark fetch error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// ブックマークを削除（論理削除）するAPI
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const { blogPostSlug } = await req.json()

    // バリデーション
    if (!blogPostSlug) {
      return new NextResponse('Blog post slug is required', { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'travel-like-a-local')

    const result = await db.collection('bookmarks').updateOne(
      {
        userId: session.user.id,
        blogPostSlug,
        isActive: true
      },
      {
        $set: {
          isActive: false,
          updatedAt: new Date()
        }
      }
    )

    if (result.matchedCount === 0) {
      return new NextResponse('Bookmark not found', { status: 404 })
    }

    return new NextResponse('OK')
  } catch (error) {
    console.error('Bookmark deletion error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
