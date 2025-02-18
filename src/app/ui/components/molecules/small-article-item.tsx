import { DateComponent } from '@/app/ui/components/atoms/date'
import { ImageLink } from '@/app/ui/components/atoms/icons/image-link'
import type { PageBlogPost } from '@/generated/graphql'
import { Link } from '@/i18n/routing'
import type { FC } from 'react'

type Props = PageBlogPost

export const SmallArticleItem: FC<Props> = ({ featuredImage, title, publishedDate, slug }) => (
  <li className="flex gap-2 max-h-20">
    <ImageLink
      className="w-[120px] h-[80px] rounded-lg"
      wrapperClassName="sm:max-w-[120px]"
      href={`/blog/${slug}`}
      url={featuredImage?.url ?? ''}
      alt={featuredImage?.title ?? ''}
      width={120}
      height={80}
    />
    <div className="flex flex-col gap-1 justify-between">
      <Link href={`/blog/${slug}`}>
        <h4 className="text-md font-bold leading-none hover-text-primary line-clamp-3">{title}</h4>
      </Link>
      <DateComponent date={publishedDate as string} className="text-right" />
    </div>
  </li>
)
