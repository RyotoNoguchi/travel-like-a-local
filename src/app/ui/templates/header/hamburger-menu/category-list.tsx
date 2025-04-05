'use client'
import { ChevronIcon } from '@/app/ui/components/atoms/icons/chevron-icon'
import { CATEGORY_ICONS } from '@/app/ui/templates/header/sub-header/category-icons'
import { Link } from '@/i18n/routing'
import type { Category } from '@/types/category'
import { formatNameForUrl } from '@/utils/url-helpers'
import classNames from 'classnames'
import { type FC } from 'react'

type Props = {
  categories: Category[]
  isOpen: boolean
  backLabel: string
  onBack: () => void
  onClose: () => void
}

export const CategoryList: FC<Props> = ({ categories, isOpen, onBack, backLabel, onClose }) => (
  <div
    className={classNames(
      'fixed inset-0 z-50 bg-white p-4 h-screen',
      'transform transition-transform duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    )}
  >
    <div className="flex items-center mb-6">
      <button onClick={onBack} className="flex items-center gap-2 text-lg hover:text-primary transition-colors">
        <span className="text-slate-400">
          <ChevronIcon width={24} height={24} />
        </span>
        <span>{backLabel}</span>
      </button>
    </div>
    <ul className="flex flex-col gap-4">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/articles/${formatNameForUrl(category.label.toLowerCase())}`}
            className="flex items-center xs:items-end gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors"
            onClick={onClose}
          >
            <span className="text-gray-600">{CATEGORY_ICONS[formatNameForUrl(category.label).toLowerCase()]}</span>
            <span className="text-2xl xs:text-3.5xl leading-none">{category.translatedLabel || category.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)
