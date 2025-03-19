import { Link } from '@/i18n/routing'
import { formatNameForUrl } from '@/utils/url-helpers'
import classNames from 'classnames'
import { type FC } from 'react'

type Category = {
  id: string
  label: string
  parentIds: string[]
}

type Props = {
  icon: React.ReactNode
  label: string
  href: string
  gap?: string
  categories: Category[]
}

export const CategoryNav: FC<Props> = ({ icon, label, href, gap = 'gap-2', categories }) => (
  <div className="relative group ">
    <Link href={href} className={classNames('flex hover-animation gap-1 items-start', gap, 'hover:text-primary')}>
      {icon}
      <span className="text-xl">{label}</span>
    </Link>

    {/* カテゴリのサブナビ */}
    <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md py-2 min-w-[200px] z-50">
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="hover-animation cursor-pointer">
            <Link href={`/articles/${formatNameForUrl(category.label).toLowerCase()}`} className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
