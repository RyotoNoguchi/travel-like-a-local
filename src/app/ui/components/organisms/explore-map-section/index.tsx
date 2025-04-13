import { COLORS } from '@/app/ui/colors'
import { Button } from '@/app/ui/components/atoms/button'
import { AreaIcon } from '@/app/ui/components/atoms/icons/area-icon'
import { getJapanMapImage } from '@/utils/assets'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  locale: string
}

export const ExploreMapSection: FC<Props> = async ({ locale }) => {
  const t = await getTranslations({ locale, namespace: 'ExploreMapSection' })
  const japanMapImage = await getJapanMapImage({ width: 400, height: 400 })
  return (
    <section className="flex flex-col items-center sm:flex-row-reverse justify-center w-full bg-gray-100 pt-4 pb-8 px-4 bg-primary-50">
      {japanMapImage ? <Image src={japanMapImage.url} alt={japanMapImage.title} width={200} height={200} /> : null}
      <div className="flex w-fit flex-col items-center gap-4 text-center container">
        <div className="flex gap-2 justify-center items-center">
          <AreaIcon width={40} height={40} color={COLORS.PRIMARY} />
          <h2 className="text-3xl font-bold">{t('title')}</h2>
        </div>
        <p className="text-gray-600 max-w-md">{t('description')}</p>
        <Button href="/map" text={t('buttonText')} variant="solid" borderRadius="rounded-md" />
      </div>
    </section>
  )
}
