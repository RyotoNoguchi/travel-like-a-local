'use client'
import { COLORS } from '@/app/ui/colors'
import { SearchIcon } from '@/app/ui/components/atoms/icons/search-icon'
import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import type { ChangeEvent, FormEvent, RefObject } from 'react'

type Props = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent) => void
  onClose: () => void
  inputRef: RefObject<HTMLInputElement | null>
}

export const SearchBar: React.FC<Props> = ({ value, onChange, onSubmit, onClose, inputRef }) => {
  const t = useTranslations()

  return (
    <form
      onSubmit={onSubmit}
      className={classNames(
        'flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5',
        'w-full max-w-md transition-all duration-300 ease-in-out',
        'border border-solid',
        'focus-within:ring focus-within:ring-gray-700 focus-within:ring-opacity-50'
      )}
    >
      <SearchIcon width={24} height={24} color={COLORS.GRAY} />
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={onChange}
        placeholder={t('NavMenu.searchPlaceholder')}
        className="bg-transparent border-none outline-none flex-1 text-base"
        aria-label={t('NavMenu.search')}
      />
      <button
        type="button"
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
        aria-label={t('NavMenu.closeSearch')}
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </form>
  )
}
