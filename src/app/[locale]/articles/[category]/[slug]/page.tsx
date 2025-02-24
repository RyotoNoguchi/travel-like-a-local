import { createApolloClient } from '@/apolloClient'
import { LOGO_TITLE, type LANGUAGE } from '@/constants'
import type { ListArticleQueryVariables, Query } from '@/generated/graphql'
import { LIST_ARTICLE_QUERY } from '@/graphql/query'
import type { Metadata, NextPage } from 'next'

type Props = {
  params: Promise<{ locale: LANGUAGE; category: string; slug: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params
  const client = createApolloClient()
  const { data } = await client.query<Query, ListArticleQueryVariables>({
    query: LIST_ARTICLE_QUERY,
    variables: {
      slug
    }
  })
  const seoFields = data.pageBlogPostCollection?.items.find((item) => item?.slug === slug)?.seoFields
  return {
    title: `${seoFields?.pageTitle ?? ''} | ${LOGO_TITLE}`,
    description: seoFields?.pageDescription ?? ''
  }
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
