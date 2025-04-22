'use client'

import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { type FC, useState } from 'react'

type Testimonial = {
  name: string
  imageUrl: string
  country: string
  sex: string
  ageGroup: string
  testimonial: string
}

type Props = {
  testimonials: Testimonial[]
  title: string
  sourceText: string
}

export const TestimonialSection: FC<Props> = ({ testimonials, title, sourceText }) => {
  const t = useTranslations('ServicesPage')
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)

  return (
    <section className="w-full py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{title}</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 relative">
            <div className="absolute -top-5 left-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image src={testimonial.imageUrl} alt={testimonial.name} width={80} height={80} className="object-cover" />
              </div>
            </div>
            <div className="pt-8">
              <p className="text-gray-600 italic mb-4">&quot;{testimonial.testimonial.substring(0, 150)}...&quot;</p>
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
                <button
                  onClick={() => setSelectedTestimonial(testimonial)}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
                >
                  {t('seeAll')}
                  <ArrowRightIcon className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
                    <Image src={selectedTestimonial.imageUrl} alt={selectedTestimonial.name} width={80} height={80} className="object-cover" />
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
                <p className="text-gray-700 whitespace-pre-line italic">{selectedTestimonial.testimonial}</p>
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
