import type { LANGUAGE } from '@/constants'
import { type NextPage } from 'next'

type Props = {
  params: Promise<{ locale: LANGUAGE; category: string; slug: string }>
}

const ArticlePage: NextPage<Props> = async ({ params }) => {
  const { locale, category, slug } = await params
  return (
    <div className="">
      <div className="flex flex-col">
        <div className="">{locale}</div>
        <div className="">{category}</div>
        <div className="">{slug}</div>
      </div>
    </div>
  )
}

export default ArticlePage
