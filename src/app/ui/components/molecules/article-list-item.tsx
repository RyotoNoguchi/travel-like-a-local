import { ImageLink } from '@/app/ui/components/atoms/icons/image-link'
import type { PageBlogPost } from '@/generated/graphql'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { type FC } from 'react'

type Props = PageBlogPost

export const ArticleListItem: FC<Props> = ({ author, featuredImage, title, publishedDate, slug, contentfulMetadata, seoFields }) => (
  <li className="flex flex-col sm:flex-row gap-2 w-full item-center justify-center max-w-[300px] sm:max-w-[640px] sm:justify-start sm:gap-3">
    <ImageLink href={`/blog/${slug}`} url={featuredImage?.url ?? ''} alt={featuredImage?.title ?? ''} width={300} height={200} />
    <div className="flex flex-col gap-1 justify-between w-full">
      <div className="flex flex-col gap-1">
        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-bold leading-none hover-text-primary">{title}</h3>
        </Link>
        <p className="hidden sm:block text-md text-gray-500">{seoFields?.pageDescription}</p>
        <ul className="flex flex-wrap gap-2">
          {contentfulMetadata.tags.map((tag) => (
            <li className="bg-light-gray rounded-sm px-2" key={tag?.name}>
              <Link href={`/tag/${tag?.name}`}>
                <span className="hover-text-primary">{tag?.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2 sm:justify-end">
        <Link href={`/author/${author?.name}`} className="flex gap-1 hover-text-primary">
          <Image src={author?.avatar?.url ?? ''} alt={author?.avatar?.title ?? ''} width={24} height={24} />
          <p className="">{author?.name}</p>
        </Link>
        <p className="">{new Date(publishedDate).toLocaleDateString()}</p>
      </div>
    </div>
  </li>
)
