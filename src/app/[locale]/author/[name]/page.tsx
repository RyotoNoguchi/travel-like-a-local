import { createApolloClient } from '@/apolloClient'
import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { type LANGUAGE } from '@/constants'
import { type GetAuthorByNameQuery } from '@/generated/graphql'
import { GET_AUTHOR_BY_NAME_QUERY } from '@/graphql/query'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{
    locale: LANGUAGE
    name: string
  }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale, name } = await params
  const t = await getTranslations({ locale, namespace: 'AuthorPage' })

  // デコードされた著者名を取得
  const authorName = decodeURIComponent(name)

  return {
    title: t('metadata.title', { authorName }),
    description: t('metadata.description', { authorName })
  }
}

const AuthorPage: NextPage<Props> = async ({ params }) => {
  const { locale, name } = await params
  const t = await getTranslations({ locale, namespace: 'AuthorPage' })

  const authorName = decodeURIComponent(name)

  const client = createApolloClient()
  const { data } = await client.query<GetAuthorByNameQuery>({
    query: GET_AUTHOR_BY_NAME_QUERY,
    variables: { name: authorName }
  })

  const author = data?.componentAuthorCollection?.items?.[0]

  if (!author) {
    notFound()
  }

  const breadcrumbs = [
    { label: t('breadcrumbs.home'), href: '' },
    { label: t('breadcrumbs.author'), href: `/author/${name}` }
  ]

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 pb-12 lg:px-3 pt-2 max-w-screen-lg mx-auto">
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <div className="w-full">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary-100 to-orange-50">
        <div className="flex flex-col items-center justify-center text-center px-4 z-10 py-16">
          {/* Author Avatar */}
          {author.avatar?.url ? (
            <div className="relative w-32 h-32 mb-8 rounded-full overflow-hidden shadow-xl border-4 border-white">
              <Image src={author.avatar.url} alt={author.avatar.title ?? author.name ?? ''} fill className="object-cover" priority />
            </div>
          ) : null}

          {/* Author Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">{t('title', { authorName: author.name })}</h1>

          {/* Placeholder for future content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-2xl">
            <p className="text-lg text-gray-600 mb-4">{t('placeholderMessage', { authorName: author.name })}</p>
          </div>
        </div>
      </section>

      {/* Future Content Placeholder */}
      <section className="w-full py-12 bg-gray-50 rounded-xl px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('profileSectionTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('profileSectionDescription', { authorName: author.name })}</p>
        </div>
      </section>
    </div>
  )
}

export default AuthorPage
