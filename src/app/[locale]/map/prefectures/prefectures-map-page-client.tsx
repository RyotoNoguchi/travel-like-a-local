'use client'

import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { JapanMap } from '@/app/ui/components/organisms/japan-map'
import { PrefectureArticleList } from '@/app/ui/components/organisms/prefecture-article-list'
import { usePathname } from '@/i18n/routing'
import type { BlogPostWithHref } from '@/types/blog-post'
import type { BreadcrumbItem } from '@/types/breadcrumbs'
import type { Prefecture } from '@/types/region'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { type FC, useState } from 'react'

type Props = {
  initialAllPosts: BlogPostWithHref[]
  initialPrefectures: Prefecture[]
  breadcrumbs: BreadcrumbItem[]
}

export const PrefecturesMapPageClient: FC<Props> = ({ initialPrefectures, initialAllPosts, breadcrumbs }) => {
  const params = useParams<{ locale: string }>()
  const locale = params?.locale
  const pathname = usePathname()
  const prefectureName = pathname.split('/').pop() // e.g /map/prefectures/hokkaido

  const t = useTranslations('PrefecturesMapPage')
  const [prefectures] = useState<Prefecture[]>(initialPrefectures)
  const [allPosts] = useState<BlogPostWithHref[]>(initialAllPosts)
  const [selectedPrefectureId, setSelectedPrefectureId] = useState<string | null>(prefectures.find((p) => p.name.toLowerCase() === prefectureName)?.id || null)
  const [_, setSelectedPrefecture] = useState<string | null>(prefectureName || null)

  const filteredPosts = selectedPrefectureId
    ? allPosts.filter((post) => post.contentfulMetadata?.concepts?.some((c) => c?.id === selectedPrefectureId))
    : allPosts

  const handlePrefectureSelect = (prefectureId: string) => {
    const isDeselecting = prefectureId === selectedPrefectureId
    const newPrefectureId = isDeselecting ? null : prefectureId
    const newPrefectureName = isDeselecting ? null : prefectures.find((p) => p.id === prefectureId)?.name.toLowerCase() || null

    setSelectedPrefectureId(newPrefectureId)
    setSelectedPrefecture(newPrefectureName)

    if (locale) {
      const newPath = newPrefectureName ? `/${locale}/map/prefectures/${newPrefectureName}` : `/${locale}/map/prefectures`
      window.history.pushState(null, '', newPath)
    }
  }

  return (
    <div className="container mx-auto flex flex-col gap-2 pb-10">
      <div className="flex pt-2">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <JapanMap prefectures={prefectures} onSelectRegion={handlePrefectureSelect} selectedRegionId={selectedPrefectureId} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold flex flex-col gap-3">
            {selectedPrefectureId
              ? t('articlesInPrefecture', { prefectureName: prefectures.find((r) => r.id === selectedPrefectureId)?.name || t('selectedRegionFallback') })
              : t('allArticles')}
          </h2>
          <PrefectureArticleList blogPosts={filteredPosts} />
        </div>
      </div>
    </div>
  )
}
