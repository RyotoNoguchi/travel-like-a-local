import { ArticleLayout } from '@/app/ui/articles/layout/article-layout'
import { BlogPostsContainer } from '@/app/ui/components/organisms/blog-posts/container'
import type { LANGUAGE } from '@/constants'
import { getBlogPostsBySearchTerm } from '@/lib/contentful/get-blog-posts'
import type { BreadcrumbItem } from '@/types/breadcrumbs'
import type { NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: {
    locale: LANGUAGE
  }
  searchParams: {
    q: string
  }
}

const SearchPage: NextPage<Props> = async ({ params, searchParams }) => {
  const { locale } = await params
  const { q } = await searchParams
  const t = await getTranslations({ locale })
  const blogPosts = await getBlogPostsBySearchTerm(q ?? '')

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: t('Metadata.home'),
      href: '/'
    },
    {
      label: t('SearchPage.title'),
      href: '/search'
    }
  ]

  return (
    <ArticleLayout locale={locale} breadcrumbs={breadcrumbs}>
      <BlogPostsContainer
        blogPosts={blogPosts}
        title={t('SearchPage.title')}
        locale={locale}
        viewAllButtonText=""
        viewAllHref=""
        total={blogPosts.length}
        currentPage={1}
        totalPages={Math.ceil(blogPosts.length / 10)}
        noBlogPostsTitle={t('BlogPosts.noBlogPosts')}
        noBlogPostsMessage={t('BlogPosts.noBlogPostsMessage')}
        isBookmarksPage={false}
      />
    </ArticleLayout>
  )
}

export default SearchPage
