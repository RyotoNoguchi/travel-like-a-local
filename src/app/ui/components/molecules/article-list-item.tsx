import { Author } from '@/app/ui/components/atoms/author'
import { DateComponent } from '@/app/ui/components/atoms/date'
import { ImageLink } from '@/app/ui/components/atoms/icons/image-link'
import { TagList } from '@/app/ui/components/molecules/tag-list'
import { DEFAULT_LOCALE } from '@/constants'
import { cmaClient } from '@/contentfulManagementClient'
import type { PageBlogPost } from '@/generated/graphql'
import { Link } from '@/i18n/routing'
import { type FC } from 'react'

type Props = PageBlogPost

export const ArticleListItem: FC<Props> = async ({ author, featuredImage, title, publishedDate, slug, contentfulMetadata, seoFields }) => {
  const articleConceptIds = contentfulMetadata.concepts.map((concept) => ({ id: concept?.id }))

  // If there is no concept (Taxonomy), return null because it will be an error when clicking the article without category as it doesn't create a proper href to open the page whose path is `/articles/${categoryName}/${slug}`
  if (!Boolean(articleConceptIds.length)) return null

  // Get all taxonomies
  const concepts = await cmaClient.concept.getMany({})

  // Get the category name (Taxonomy)
  const categoryName =
    concepts.items
      .map((item) => ({ id: item.sys.id, label: item.prefLabel[DEFAULT_LOCALE] })) // Create a map of taxonomy id and label
      .find((item) => item.id === articleConceptIds[0]?.id) // Find the category (Taxonomy) name by the article's first concept id
      ?.label.toLowerCase() ?? ''

  return (
    <li className="flex flex-col sm:flex-row gap-2 w-full item-center sm:justify-start sm:gap-3 max-w-[300px] sm:max-w-[640px] lg:max-w-[800px]">
      <ImageLink
        className="rounded-2xl w-[300px] h-[200px] sm:max-w-[216px] sm:max-h-[144px]"
        href={`/articles/${categoryName}/${slug}`}
        url={featuredImage?.url ?? ''}
        alt={featuredImage?.title ?? ''}
        width={300}
        height={200}
        wrapperClassName="sm:max-w-[216px]"
      />
      <div className="flex flex-col gap-1 justify-between w-full">
        <div className="flex flex-col gap-1">
          <Link href={`/articles/${categoryName}/${slug}`}>
            <h3 className="text-xl font-bold leading-none hover-text-primary">{title}</h3>
          </Link>
          <p className="hidden sm:block text-md text-gray-500">{seoFields?.pageDescription}</p>
          {Array.isArray(contentfulMetadata.tags) && contentfulMetadata.tags.length > 0 && <TagList tags={contentfulMetadata.tags} />}
        </div>
        <div className="flex gap-2 sm:justify-end">
          {author ? <Author author={author} /> : null}
          <DateComponent date={publishedDate as string} />
        </div>
      </div>
    </li>
  )
}
