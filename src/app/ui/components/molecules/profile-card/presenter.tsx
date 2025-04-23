import { Link } from '@/i18n/routing'
import { UserIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  imageUrl: string
  name: string
  title: string
  description: string
  linkText: string
  linkHref: string
  isMobile?: boolean
  editorTitle: string
}

export const ProfileCard: FC<Props> = ({ imageUrl, name, title, description, linkText, linkHref, isMobile = false, editorTitle }) => (
  <div className={`bg-white rounded-lg shadow-lg p-4 ${isMobile ? 'flex flex-row items-center text-left' : 'flex flex-col items-center text-center'}`}>
    <div className={`${isMobile ? 'w-16 h-16 mr-4 flex-shrink-0' : 'w-24 h-24 mb-4'} rounded-full overflow-hidden border-2 border-primary-500`}>
      {imageUrl ? (
        <Image src={imageUrl} alt={name} width={isMobile ? 64 : 96} height={isMobile ? 64 : 96} className="object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <UserIcon className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-gray-400`} />
        </div>
      )}
    </div>

    <div className={isMobile ? 'flex-1 flex flex-col gap-2 semi-sm:flex-row semi-sm:items-end' : 'w-full'}>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {editorTitle} : {name}
        </h3>
        <p className="text-sm text-primary-600">{title}</p>
        <p className={`text-left text-gray-600 text-sm ${isMobile ? 'max-[479px]:hidden' : ''}`}>{description}</p>
      </div>

      <Link
        href={linkHref}
        className={`bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors text-center inline-block ${isMobile ? 'text-sm max-sm:w-full semi-sm:w-auto shrink-0 h-fit' : 'w-full'}`}
        role="button"
      >
        {linkText}
      </Link>
    </div>
  </div>
)
