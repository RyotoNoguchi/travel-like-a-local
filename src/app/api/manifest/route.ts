import { COLORS } from '@/app/ui/colors'
import { LANGUAGE, LOGO_TITLE, LOGO_TITLE_SHORT } from '@/constants'
import { getLogo } from '@/utils/assets'
import { getTranslations } from 'next-intl/server'
import { type NextRequest, NextResponse } from 'next/server'
import type { WebAppManifest } from 'web-app-manifest'

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') || LANGUAGE.EN
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const description = t('manifestDescription')
  const logo = await getLogo({ width: 192, height: 192 })

  const manifest: WebAppManifest = {
    name: LOGO_TITLE,
    short_name: LOGO_TITLE_SHORT,
    icons: [{ src: logo?.url ?? '', sizes: '192x192', type: 'image/png' }],
    id: process.env.METADATA_BASE_URL,
    start_url: process.env.METADATA_BASE_URL,
    scope: process.env.METADATA_BASE_URL,
    categories: ['travel', 'lifestyle', 'news'],
    orientation: 'any',
    display: 'standalone',
    background_color: COLORS.WHITE,
    theme_color: COLORS.PRIMARY,
    description,
    lang: t('locale'),
    shortcuts: [
      {
        name: LOGO_TITLE,
        short_name: LOGO_TITLE_SHORT,
        url: `${process.env.METADATA_BASE_URL}/bookmarks`,
        description: t('manifestShortcutsBookmark'),
        icons: [{ src: logo?.url ?? '', sizes: '192x192', type: 'image/png' }]
      }
    ],
    // TODO: Add screenshots
    screenshots: [
      {
        src: logo?.url ?? '',
        sizes: '192x192',
        type: 'image/png'
      }
    ]
  }
  return NextResponse.json(manifest)
}
