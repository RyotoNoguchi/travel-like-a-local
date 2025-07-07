import { type LANGUAGE } from '@/constants'
import { getTranslations } from 'next-intl/server'

type Props = {
  locale: LANGUAGE
}

export const ServicePricingSection = async ({ locale }: Props) => {
  const t = await getTranslations({ locale, namespace: 'ServicePricingSection' })

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Planning Fee */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('planningFee.title')}</h3>
          <div className="text-3xl font-bold text-blue-600 mb-4">{t('planningFee.price')}</div>
          <p className="text-gray-600 mb-4">{t('planningFee.description')}</p>
          <p className="text-sm text-gray-500 italic">{t('planningFee.note')}</p>
        </div>

        {/* Guiding Service */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('guidingService.title')}</h3>
          <div className="text-3xl font-bold text-green-600 mb-4">{t('guidingService.price')}</div>
          <p className="text-gray-600 mb-4">{t('guidingService.description')}</p>
          <p className="text-sm text-gray-500 italic">{t('guidingService.note')}</p>
        </div>

        {/* Additional Costs */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-600">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('additionalCosts.title')}</h3>
          <div className="text-3xl font-bold text-amber-600 mb-4">{t('additionalCosts.price')}</div>
          <p className="text-gray-600 mb-4">{t('additionalCosts.description')}</p>
          <p className="text-sm text-gray-500 italic">{t('additionalCosts.note')}</p>
        </div>
      </div>

      {/* Why This Model */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">{t('whyThisModel.title')}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-700">{t('whyThisModel.reason1')}</p>
          </div>
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-700">{t('whyThisModel.reason2')}</p>
          </div>
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-full p-2 mr-4 mt-1">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-700">{t('whyThisModel.reason3')}</p>
          </div>
          <div className="flex items-center">
            <div className="bg-amber-100 rounded-full p-2 mr-4 mt-1">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-700">{t('whyThisModel.reason4')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
