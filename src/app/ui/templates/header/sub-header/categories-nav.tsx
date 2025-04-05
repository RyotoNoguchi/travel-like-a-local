import { CATEGORY_ICONS } from '@/app/ui/templates/header/sub-header/category-icons'
import { Link } from '@/i18n/routing'
import type { Category } from '@/types/category'
import { formatNameForUrl } from '@/utils/url-helpers'
import classNames from 'classnames'
import type { Dispatch, FC, SetStateAction } from 'react'

type Props = {
  categories: Category[]
  isNavVisible: boolean
  setIsNavVisible: Dispatch<SetStateAction<boolean>>
}

export const CategoriesNav: FC<Props> = ({ categories, isNavVisible, setIsNavVisible }) => (
  <nav
    className={classNames(
      'hidden h-20 w-full justify-center items-center fixed top-14 left-0 right-0 z-50 bg-white drop-shadow-md',
      'transition-all duration-300 ease-in-out',
      'sm:flex',
      isNavVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-1 pointer-events-none'
    )}
    onMouseEnter={() => setIsNavVisible(true)}
    onMouseLeave={() => setIsNavVisible(false)}
  >
    <ul className="w-full flex items-center gap-4 px-4">
      {categories.map((category) => (
        <li key={category.id} className="flex flex-1 justify-center hover-animation cursor-pointer text-center hover:text-primary">
          <Link
            href={`/articles/${formatNameForUrl(category.label).toLowerCase()}`}
            className={classNames('flex flex-col gap-0.5 items-center justify-center text-md hover:bg-gray-100 cursor-pointer leading-none', 'semi-lg:text-lg')}
          >
            <span className="flex items-center transition-colors duration-300 group-hover:text-primary">
              {CATEGORY_ICONS[formatNameForUrl(category.label).toLowerCase()]}
            </span>
            <span className="leading-none h-8 flex items-center">{category.translatedLabel}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)
