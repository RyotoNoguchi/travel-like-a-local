import { DateComponent } from '@/app/ui/components/atoms/date'
import { CalendarIcon } from '@/app/ui/components/atoms/icons/calendar-icon'
import { EyeIcon } from '@/app/ui/components/atoms/icons/eye-icon'
import { ImageLink } from '@/app/ui/components/atoms/icons/image-link'
import type { PageBlogPost } from '@/generated/graphql'
import { Link } from '@/i18n/routing'
import type { FC } from 'react'

type Props = Pick<PageBlogPost, 'featuredImage' | 'title' | 'publishedDate' | 'slug'> & { viewCount: number; viewCountText: string; href: string }

export const SmallArticleItem: FC<Props> = async ({ featuredImage, title, publishedDate, href, viewCount, viewCountText }) => (
  <li className="flex gap-2 max-h-20">
    <ImageLink
      className="w-[120px] h-[80px] rounded-lg"
      wrapperClassName="sm:max-w-[120px] shrink-0"
      href={href}
      url={featuredImage?.url ?? ''}
      alt={featuredImage?.title ?? ''}
      width={120}
      height={80}
    />
    <div className="flex flex-col gap-1 justify-between">
      <Link href={href}>
        <h4 className="text-md font-bold leading-none hover-text-primary line-clamp-3">{title}</h4>
      </Link>
      <div className="flex gap-2">
        <div className="flex gap-0.5 items-center px-1">
          <CalendarIcon width={16} height={16} />
          <DateComponent date={publishedDate as string} className="h-4 text-slate-500 text-sm" />
        </div>
        <div className="flex gap-0.5 items-center">
          <EyeIcon width={16} height={16} />
          <p className="text-sm text-slate-500 h-[18px] flex gap-0.5">
            {viewCount}
            <span>{viewCountText}</span>
          </p>
        </div>
      </div>
    </div>
  </li>
)
