import type { Category } from '@/app/ui/templates/header/presenter'
import { Link } from '@/i18n/routing'
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
      'hidden h-14 w-full justify-center items-center fixed top-14 left-0 right-0 z-50 bg-white drop-shadow-md',
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
            className={classNames('flex text-sm hover:bg-gray-100 cursor-pointer leading-none', 'semi-lg:text-base', 'lg:text-lg')}
          >
            <span className="leading-none">{category.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)
