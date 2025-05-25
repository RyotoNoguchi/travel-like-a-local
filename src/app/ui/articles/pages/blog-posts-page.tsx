import { ArticleLayout } from '@/app/ui/articles/layout/article-layout'
import { BlogPostCards } from '@/app/ui/components/organisms/blog-post-cards'
import { BlogPostsContainer } from '@/app/ui/components/organisms/blog-posts/container'
import { ExploreMapSection } from '@/app/ui/components/organisms/explore-map-section'
import { LOCALE_CODE_MAP, PROFILE_IMAGE_ID, type LANGUAGE } from '@/constants'
import type { GetBlogPostsQuery } from '@/generated/graphql'
import { getBlogPosts } from '@/lib/contentful/get-blog-posts'
import type { BreadcrumbItem } from '@/types/breadcrumbs'
import { getImageById } from '@/utils/assets'
import { getBlogPostsWithHref } from '@/utils/blog-post-helper'
import { categorizeBlogPosts } from '@/utils/category-helper'
import { getCategories, loadConcepts } from '@/utils/concept-helper'
import { formatNameForUrl } from '@/utils/url-helpers'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
  breadcrumbs: BreadcrumbItem[]
  category?: string
  region?: string
  area?: string
  prefecture?: string
  path: string[]
}

export const BlogPostListPage: FC<Props> = async ({ locale, breadcrumbs, category, region, area, prefecture, path }) => {
  const t = await getTranslations({ locale })
  const concepts = await loadConcepts()
  const where: Record<string, unknown> = {}
  const filters: Array<Record<string, unknown>> = []
  const limit = 10
  const skip = 0

  const getConceptIdByLabel = (label: string): string | undefined => {
    const concept = concepts.find((c) => c.label.toLowerCase() === label.toLowerCase() || formatNameForUrl(c.label.toLowerCase()) === label.toLowerCase())
    return concept?.id
  }

  if (category) {
    const categoryId = getConceptIdByLabel(category)
    filters.push({
      contentfulMetadata: {
        concepts: {
          id_contains_some: [categoryId]
        }
      }
    })
  }

  if (region) {
    const regionId = getConceptIdByLabel(region)
    filters.push({
      contentfulMetadata: {
        concepts: {
          id_contains_some: [regionId]
        }
      }
    })
  }

  if (area) {
    const areaId = getConceptIdByLabel(area)
    filters.push({
      contentfulMetadata: {
        concepts: {
          id_contains_some: [areaId]
        }
      }
    })
  }

  if (prefecture) {
    const prefectureId = getConceptIdByLabel(prefecture)
    filters.push({
      contentfulMetadata: {
        concepts: {
          id_contains_some: [prefectureId]
        }
      }
    })
  }

  if (filters.length > 0) {
    where.AND = filters
  }

  const viewAllHref = path && path.length > 0 ? `/articles/${path.join('/')}` : '/articles'

  const getTitle = () => {
    if (prefecture) {
      return t('ArticleList.articlesOf', { region: prefecture.charAt(0).toUpperCase() + prefecture.slice(1), category: '' })
    } else if (area) {
      return t('ArticleList.articlesOf', { region: area.charAt(0).toUpperCase() + area.slice(1), category: '' })
    } else if (region) {
      return t('ArticleList.articlesOf', { region: region.charAt(0).toUpperCase() + region.slice(1), category: '' })
    } else if (category) {
      return t('ArticleList.articlesOf', { region: '', category: category.charAt(0).toUpperCase() + category.slice(1) })
    }
    return t('ArticleList.title')
  }

  const { blogPosts, total } = await getBlogPosts(LOCALE_CODE_MAP[locale])

  const filteredBlogPosts =
    blogPosts
      .filter((blogPost): blogPost is NonNullable<GetBlogPostsQuery['pageBlogPostCollection']>['items']['0'] => blogPost !== null)
      .filter((post) => post !== null) || []
  const categories = await getCategories(locale)
  const blogPostsWithHref = await getBlogPostsWithHref(blogPosts)
  const categorizedBlogPosts = categorizeBlogPosts(blogPostsWithHref, categories)
  const profileImage = await getImageById({ id: PROFILE_IMAGE_ID, width: 500, height: 500 })

  return (
    <ArticleLayout locale={locale} breadcrumbs={breadcrumbs} profileImageUrl={profileImage?.url || ''}>
      <div className="flex flex-col gap-5">
        <ExploreMapSection locale={locale} />
        <div className="flex flex-col gap-10">
          <BlogPostCards categorizedBlogPosts={categorizedBlogPosts} categories={categories} />
          <BlogPostsContainer
            blogPosts={filteredBlogPosts}
            title={getTitle()}
            locale={locale}
            viewAllButtonText={t('ArticleList.viewAll')}
            viewAllHref={viewAllHref}
            total={total}
            currentPage={Math.floor(skip / limit) + 1}
            totalPages={Math.ceil(total / limit)}
            noBlogPostsTitle={t('BlogPosts.noBlogPosts')}
            noBlogPostsMessage={t('BlogPosts.noBlogPostsMessage')}
            isBookmarksPage={false}
          />
        </div>
      </div>
    </ArticleLayout>
  )
}
