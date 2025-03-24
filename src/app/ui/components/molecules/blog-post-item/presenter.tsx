import { COLORS } from '@/app/ui/colors'
import { Author } from '@/app/ui/components/atoms/author'
import { DateComponent } from '@/app/ui/components/atoms/date'
import { ImageLink } from '@/app/ui/components/atoms/icons/image-link'
import { BookmarkButtonContainer } from '@/app/ui/components/molecules/bookmark-button/container'
import { TagList } from '@/app/ui/components/molecules/tag-list'
import type { GetBlogPostsQuery } from '@/generated/graphql'
import { Link } from '@/i18n/routing'
import type { FC } from 'react'

type Props = NonNullable<NonNullable<GetBlogPostsQuery['pageBlogPostCollection']>['items'][0]> & {
  href: string
}

export const BlogPostItem: FC<Props> = ({ href, featuredImage, title, seoFields, contentfulMetadata, author, publishedDate, slug }) => {
  if (!slug || !title) return null
  return (
    <li className="flex flex-col sm:flex-row gap-2 w-full item-center sm:justify-start sm:gap-3 max-w-[300px] sm:max-w-[640px] lg:max-w-[800px]">
      <div className="relative">
        <ImageLink
          className="rounded-2xl w-[300px] h-[200px] sm:max-w-[216px] sm:max-h-[144px]"
          href={href}
          url={featuredImage?.url ?? ''}
          alt={featuredImage?.title ?? ''}
          width={300}
          height={200}
          wrapperClassName="sm:max-w-[216px]"
        />
        <div className="absolute top-2 right-2">
          <BookmarkButtonContainer
            blogPostSlug={slug}
            blogPostTitle={title}
            width={28}
            height={28}
            strokeColor={{ active: COLORS.GRAY, inactive: COLORS.GRAY }}
            fillColor={{ active: COLORS.PRIMARY, inactive: COLORS.WHITE }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 justify-between w-full">
        <div className="flex flex-col gap-1">
          <Link href={href}>
            <h3 className="text-xl font-bold leading-none hover-text-primary">{title}</h3>
          </Link>
          <p className="hidden sm:block text-md text-gray-500">{seoFields?.pageDescription}</p>
          {Array.isArray(contentfulMetadata.tags) && contentfulMetadata.tags.length > 0 && <TagList tags={contentfulMetadata.tags} />}
        </div>
        <div className="flex gap-2 sm:justify-end">
          {author !== null && author !== undefined && <Author author={author} />}
          <DateComponent date={publishedDate as string} />
        </div>
      </div>
    </li>
  )
}
