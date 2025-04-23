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
}

export const ProfileCard: FC<Props> = ({ imageUrl, name, title, description, linkText, linkHref }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary-500 mb-4">
      {imageUrl ? (
        <Image src={imageUrl} alt={name} width={96} height={96} className="object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <UserIcon className="w-12 h-12 text-gray-400" />
        </div>
      )}
    </div>

    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    <p className="text-sm text-primary-600 mb-3">{title}</p>

    <p className="text-left text-gray-600 text-sm mb-4">{description}</p>

    <Link href={linkHref} className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors w-full text-center">
      {linkText}
    </Link>
  </div>
)
