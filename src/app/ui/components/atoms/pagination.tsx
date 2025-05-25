import { Link } from '@/i18n/routing'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import type { FC } from 'react'

type Props = {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export const Pagination: FC<Props> = ({ currentPage, totalPages, baseUrl }) => {
  const previousPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  return (
    <div className="flex justify-center items-center gap-4">
      {previousPage ? (
        <Link href={`${baseUrl}?page=${previousPage}`} className="px-2 py-2 bg-gray-200 rounded-md">
          <ChevronLeftIcon className="h-5 w-5" />
        </Link>
      ) : null}
      <span>
        {currentPage} / {totalPages}
      </span>
      {nextPage ? (
        <Link href={`${baseUrl}?page=${nextPage}`} className="px-2 py-2 bg-gray-200 rounded-md">
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
      ) : null}
    </div>
  )
}
