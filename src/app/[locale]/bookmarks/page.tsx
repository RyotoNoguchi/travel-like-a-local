import { createApolloClient } from '@/apolloClient'
import { ArticleLayout } from '@/app/ui/articles/layout/article-layout'
import { BlogPostsContainer } from '@/app/ui/components/organisms/blog-posts/container'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { BOOKMARKS_PATH, type LANGUAGE } from '@/constants'
import type { GetBlogPostsBySlugsQuery, GetBlogPostsBySlugsQueryVariables } from '@/generated/graphql'
import { GET_BLOG_POSTS_BY_SLUGS_QUERY } from '@/graphql/query'
import { getBookmarks } from '@/lib/bookmarks/get-bookmarks'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{
    locale: LANGUAGE
  }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'BookmarksPage' })
  return {
    title: t('title'),
    description: t('description')
  }
}

const BookmarksPage: NextPage<Props> = async ({ params }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'BookmarksPage' })
  const metaDataT = await getTranslations({ locale, namespace: 'Metadata' })
  const bookmarks = await getBookmarks({ blogPostSlug: undefined })
  const slugs = bookmarks?.map((bookmark) => bookmark.blogPostSlug)
  const breadcrumbs = [
    { label: metaDataT('home'), href: '' },
    { label: t('title'), href: `/${BOOKMARKS_PATH}` }
  ]
  if (!slugs) return <div>No bookmarks</div>

  const client = createApolloClient()
  const { data } = await client.query<GetBlogPostsBySlugsQuery, GetBlogPostsBySlugsQueryVariables>({
    query: GET_BLOG_POSTS_BY_SLUGS_QUERY,
    variables: { slugs }
  })

  const blogPosts = data.pageBlogPostCollection?.items.filter((post) => post !== null)

  if (!blogPosts) return <div>No blog posts</div>

  return (
    <>
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <main>
        <ArticleLayout locale={locale} breadcrumbs={breadcrumbs}>
          <BlogPostsContainer title={t('title')} locale={locale} blogPosts={blogPosts} />
        </ArticleLayout>
      </main>
    </>
  )
}

export default BookmarksPage
