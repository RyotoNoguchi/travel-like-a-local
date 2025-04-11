import { createApolloClient } from '@/apolloClient'
import { RegionPageClient } from '@/app/[locale]/map/regions/regions-map-page-client'
import { BreadcrumbJsonLd } from '@/app/ui/components/seo/breadcrumbs-jsonld'
import { type LANGUAGE, LOCALE_CODE_MAP } from '@/constants'
import type { GetBlogPostsQuery, GetBlogPostsQueryVariables, PageBlogPost } from '@/generated/graphql'
import { GET_BLOG_POSTS_QUERY } from '@/graphql/query'
import { getImagesByTag } from '@/utils/assets'
import { getRegionsHierarchy } from '@/utils/concept-helper'
import { generatePrefecturesData } from '@/utils/prefecture-helper'
import { extractTaxonomyInfo } from '@/utils/taxonomy-helper'
import { generateHref } from '@/utils/url-helpers'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: {
    locale: LANGUAGE
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return {
    title: t('RegionsMapPage.title'),
    description: t('RegionsMapPage.metadataDescription')
  }
}

const RegionsPage: NextPage<Props> = async ({ params }) => {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const breadcrumbs = [
    { label: t('Metadata.home'), href: '' },
    { label: t('MapPage.map'), href: '/map' },
    { label: t('RegionsMapPage.title'), href: '/map/regions' }
  ]

  const regionImages = await getImagesByTag({ width: 300, height: 300, tag: 'region' })
  const sortedRegionImages = regionImages.sort((a, b) => {
    const regionA = parseInt(a.fileName.split('_')[1].split(' ')[0])
    const regionB = parseInt(b.fileName.split('_')[1].split(' ')[0])
    return regionA - regionB
  })

  const regionMapImages = await getImagesByTag({ width: 300, height: 300, tag: 'regionFocusedMap' })
  const regionHierarchy = await getRegionsHierarchy()
  const prefectures = generatePrefecturesData(regionHierarchy)
  const regions = regionHierarchy
    .map((region) => {
      if (region.label === 'Chubu') {
        return region.divisions.map((division) => ({
          id: division.id,
          name: division.label.toLowerCase(),
          prefectures: prefectures[division.label.toLowerCase()]
        }))
      }
      return {
        id: region.id,
        name: region.label.toLowerCase(),
        prefectures: prefectures[region.label.toLowerCase()]
      }
    })
    .flat()

  const client = createApolloClient()
  const { data } = await client.query<GetBlogPostsQuery, GetBlogPostsQueryVariables>({
    query: GET_BLOG_POSTS_QUERY,
    variables: {
      locale: LOCALE_CODE_MAP[locale],
      where: {
        contentfulMetadata: {
          concepts: {
            id_contains_some: regions.map((region) => region.id)
          }
        }
      }
    }
  })

  const blogPosts = data.pageBlogPostCollection?.items.map((item) => item) || []

  const postsWithHref = await Promise.all(
    blogPosts
      .filter((blogPost): blogPost is PageBlogPost => blogPost !== null)
      .map(async (post) => {
        const blogPostConceptIds = post.contentfulMetadata.concepts.map((concept) => concept?.id ?? '')
        const { categoryName, regionName, areaName, prefectureName } = await extractTaxonomyInfo(blogPostConceptIds)
        const href = generateHref({ categoryName, regionName, areaName, prefectureName, slug: post.slug as string })
        return {
          ...post,
          href
        }
      })
  )

  return (
    <>
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />
      <RegionPageClient
        regionMapImages={regionMapImages}
        regionImages={sortedRegionImages}
        regions={regions}
        initialBlogPosts={postsWithHref}
        breadcrumbs={breadcrumbs}
      />
    </>
  )
}

export default RegionsPage
