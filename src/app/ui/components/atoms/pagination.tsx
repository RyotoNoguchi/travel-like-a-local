import { Link } from '@/i18n/routing'
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
        <Link href={`${baseUrl}?page=${previousPage}`} className="px-4 py-2 bg-gray-200 rounded-md">
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-200 rounded-md text-gray-500 cursor-not-allowed">Previous</span>
      )}
      <span>
        {currentPage} / {totalPages}
      </span>
      {nextPage ? (
        <Link href={`${baseUrl}?page=${nextPage}`} className="px-4 py-2 bg-gray-200 rounded-md">
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-200 rounded-md text-gray-500 cursor-not-allowed">Next</span>
      )}
    </div>
  )
}
