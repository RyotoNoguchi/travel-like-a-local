'use client'

import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import { JapanMap } from '@/app/ui/components/organisms/japan-map'
import { PrefectureArticleList } from '@/app/ui/components/organisms/prefecture-article-list'
import type { BlogPostWithHref } from '@/types/blog-post'
import type { BreadcrumbItem } from '@/types/breadcrumbs'
import type { Prefecture } from '@/types/region'
import { useTranslations } from 'next-intl'
import { type FC, useState } from 'react'

type Props = {
  initialAllPosts: BlogPostWithHref[]
  initialPrefectures: Prefecture[]
  breadcrumbs: BreadcrumbItem[]
}

export const MapPageClient: FC<Props> = ({ initialPrefectures, initialAllPosts, breadcrumbs }) => {
  const t = useTranslations('MapPage')
  const [prefectures] = useState<Prefecture[]>(initialPrefectures)
  const [allPosts] = useState<BlogPostWithHref[]>(initialAllPosts)
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null)

  const filteredPosts = selectedRegionId ? allPosts.filter((post) => post.contentfulMetadata?.concepts?.some((c) => c?.id === selectedRegionId)) : allPosts

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegionId(regionId === selectedRegionId ? null : regionId)
  }

  return (
    <div className="container mx-auto flex flex-col gap-2 pb-10">
      <div className="flex pt-2">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <JapanMap prefectures={prefectures} onSelectRegion={handleRegionSelect} selectedRegionId={selectedRegionId} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold flex flex-col gap-3">
            {selectedRegionId
              ? t('articlesInPrefecture', { prefectureName: prefectures.find((r) => r.id === selectedRegionId)?.name || t('selectedRegionFallback') })
              : t('allArticles')}
          </h2>
          <PrefectureArticleList blogPosts={filteredPosts} />
        </div>
      </div>
    </div>
  )
}
