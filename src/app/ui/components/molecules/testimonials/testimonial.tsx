import type { GetTestimonialsQuery } from '@/generated/graphql'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { type FC } from 'react'

type Props = {
  testimonial: NonNullable<NonNullable<GetTestimonialsQuery['testimonialCollection']>['items'][0]>
  onClick: () => void
  t: (key: string) => string
}

export const Testimonial: FC<Props> = ({ testimonial, onClick, t }) => (
  <li className="bg-white rounded-lg shadow-md p-6 relative">
    <div className="absolute -top-5 left-6">
      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
        <Image src={testimonial.image?.url ?? ''} alt={testimonial.name ?? ''} width={80} height={80} className="object-cover" />
      </div>
    </div>
    <div className="pt-8">
      <p className="text-gray-600 italic mb-4">&quot;{testimonial.comment?.substring(0, 150)}...&quot;</p>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800">{testimonial.name}</p>
            <p className="text-gray-500 text-sm">{testimonial.country}</p>
          </div>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <button onClick={onClick} className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center">
          {t('seeAll')}
          <ArrowRightIcon className="w-3 h-3 ml-1" />
        </button>
      </div>
    </div>
  </li>
)
