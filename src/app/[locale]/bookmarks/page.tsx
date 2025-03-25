import type { LANGUAGE } from '@/constants'
import { getBookmarks } from '@/lib/bookmarks/get-bookmarks'
import type { NextPage } from 'next'

type Props = {
  locale: LANGUAGE
}

const BookmarksPage: NextPage<Props> = async ({ locale }) => {
  const bookmarks = await getBookmarks({ slug: undefined })
  console.log(bookmarks)
  //  Call API src/app/api/bookmarks/route.ts from server component

  return <div>BookmarksPage</div>
}

export default BookmarksPage
