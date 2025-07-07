import { type LANGUAGE } from '@/constants'
import { getTranslations } from 'next-intl/server'

type Props = {
  locale: LANGUAGE
}

export const ServiceModelSection = async ({ locale }: Props) => {
  const t = await getTranslations({ locale, namespace: 'ServiceModelSection' })

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Phase 1: Planning */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-primary-600">
          <div className="flex items-center mb-4">
            <div className="bg-primary-100 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{t('planning.title')}</h3>
          </div>
          <p className="text-gray-600 mb-4">{t('planning.description')}</p>
          <ul className="space-y-2">
            {[0, 1, 2, 3].map((index) => (
              <li key={index} className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">{t(`planning.features.${index}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Phase 2: Experience */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-600">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{t('experience.title')}</h3>
          </div>
          <p className="text-gray-600 mb-4">{t('experience.description')}</p>
          <ul className="space-y-2">
            {[0, 1, 2, 3].map((index) => (
              <li key={index} className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">{t(`experience.features.${index}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Phase 3: Appreciation */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-amber-600">
          <div className="flex items-center mb-4">
            <div className="bg-amber-100 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{t('appreciation.title')}</h3>
          </div>
          <p className="text-gray-600 mb-4">{t('appreciation.description')}</p>
          <ul className="space-y-2">
            {[0, 1, 2, 3].map((index) => (
              <li key={index} className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">{t(`appreciation.features.${index}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
