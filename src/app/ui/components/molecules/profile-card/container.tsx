import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'
import { ProfileCard } from './presenter'

type Props = {
  imageUrl: string
  isMobile?: boolean
}

export const ProfileCardContainer: FC<Props> = async ({ imageUrl, isMobile = false }) => {
  const t = await getTranslations()

  return (
    <ProfileCard
      imageUrl={imageUrl}
      name="Ryoto"
      title={t('AboutPage.hero.subtitle')}
      description={t('AboutPage.profileCard.shortBio')}
      linkText={t('AboutPage.profileCard.linkText')}
      linkHref="/about"
      isMobile={isMobile}
      editorTitle={t('Common.chiefEditor')}
    />
  )
}
