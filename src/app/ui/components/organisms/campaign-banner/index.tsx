import { type LANGUAGE } from '@/constants'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

type Props = {
  locale: LANGUAGE
}

export const CampaignBanner = async ({ locale }: Props) => {
  const t = await getTranslations({ locale, namespace: 'CampaignBanner' })

  return (
    <div className="w-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white py-4 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg md:text-xl font-bold mb-1">{t('title')}</h3>
          <p className="text-sm md:text-base opacity-90">{t('message')}</p>
        </div>
        <Link href="#pricing" className="bg-white text-orange-600 font-bold py-2 px-6 rounded-lg hover:bg-orange-50 transition duration-300 whitespace-nowrap">
          {t('cta')}
        </Link>
      </div>
    </div>
  )
}
