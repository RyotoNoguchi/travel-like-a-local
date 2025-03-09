import type { LANGUAGE } from '@/constants'
import type { NextPage } from 'next'

type Props = {
  params: Promise<{ locale: LANGUAGE; category: string }>
}

const ArticleCategoryPage: NextPage<Props> = async ({ params }) => {
  const { category, locale } = await params
  console.log('%csrc/app/[locale]/articles/[category]/page.tsx:10 category', 'color: #26bfa5;', category)
  console.log('%csrc/app/[locale]/articles/[category]/page.tsx:11 locale', 'color: #26bfa5;', locale)
  return (
    <div>
      <h1>Article Category</h1>
    </div>
  )
}

export default ArticleCategoryPage
