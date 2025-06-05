import { Button } from '@/app/ui/components/atoms/button'
import type { LANGUAGE } from '@/constants'
import classNames from 'classnames'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
}

export const CallToActionSection: FC<Props> = async ({ locale }) => {
  const t = await getTranslations({ locale })

  return (
    <section className="py-16 w-full bg-gradient-to-r from-primary-50 to-primary-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-gray-900 mb-6">{t('CallToActionSection.title')}</h2>
        <p className="text-lg text-dark-gray-600 mb-8 max-w-2xl mx-auto">{t('CallToActionSection.description')}</p>
        <div className={classNames('flex flex-col gap-4 items-center justify-center', 'sm:flex-row sm:gap-6')}>
          <Button
            borderRadius="rounded-lg"
            text={t('CallToActionSection.consultingButton')}
            href="/service-intro#contact"
            variant="solid"
            backgroundColor="bg-primary"
          />
          <Button
            borderRadius="rounded-lg"
            text={t('CallToActionSection.bookingButton')}
            href="/tours"
            variant="outline"
            backgroundColor="bg-white"
            textColor="text-primary"
          />
        </div>
      </div>
    </section>
  )
}
