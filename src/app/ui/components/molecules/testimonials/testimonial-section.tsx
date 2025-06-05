'use client'

import { Testimonial } from '@/app/ui/components/molecules/testimonials/testimonial'
import type { GetTestimonialsQuery } from '@/generated/graphql'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { type FC, useState } from 'react'

type Props = {
  testimonials: NonNullable<NonNullable<GetTestimonialsQuery['testimonialCollection']>['items']>
  title: string
  sourceText: string
}

export const TestimonialSection: FC<Props> = ({ testimonials, title, sourceText }) => {
  const t = useTranslations('ServicesPage')
  const [selectedTestimonial, setSelectedTestimonial] = useState<NonNullable<NonNullable<GetTestimonialsQuery['testimonialCollection']>['items'][0]> | null>(
    null
  )

  if (!testimonials) return null

  return (
    <section className="w-full pb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{title}</h2>

      <ul className="grid md:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
        {testimonials.map(
          (testimonial) =>
            testimonial && <Testimonial key={testimonial.id} testimonial={testimonial} onClick={() => setSelectedTestimonial(testimonial)} t={t} />
        )}
      </ul>

      <div className="text-center mt-8">
        <p className="text-gray-600 italic" dangerouslySetInnerHTML={{ __html: sourceText }} />
      </div>

      {/* Modal for full testimonial */}
      {selectedTestimonial !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image src={selectedTestimonial.image?.url ?? ''} alt={selectedTestimonial.name ?? ''} width={80} height={80} className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedTestimonial.name}</h3>
                    <p className="text-gray-600">{selectedTestimonial.country}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTestimonial(null)} className="p-1 hover:bg-gray-100 rounded-full">
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line italic">{selectedTestimonial.comment}</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  {t('close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
