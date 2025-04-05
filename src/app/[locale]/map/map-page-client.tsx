'use client'

import { JapanMap } from '@/app/ui/components/organisms/japan-map'
import { RegionArticleList } from '@/app/ui/components/organisms/region-article-list'
import type { BlogPostWithHref } from '@/types/blog-post'
import type { Prefecture } from '@/types/region'
import { type FC, useState } from 'react'

type Props = {
  initialAllPosts: BlogPostWithHref[]
  initialPrefectures: Prefecture[]
}

export const MapPageClient: FC<Props> = ({ initialPrefectures, initialAllPosts }) => {
  const [prefectures] = useState<Prefecture[]>(initialPrefectures)
  const [allPosts] = useState<BlogPostWithHref[]>(initialAllPosts)
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null)

  const filteredPosts = selectedRegionId ? allPosts.filter((post) => post.contentfulMetadata?.concepts?.some((c) => c?.id === selectedRegionId)) : allPosts

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegionId(regionId === selectedRegionId ? null : regionId)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Articles by Prefecture</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <JapanMap prefectures={prefectures} onSelectRegion={handleRegionSelect} selectedRegionId={selectedRegionId} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {selectedRegionId ? `Articles in ${prefectures.find((r) => r.id === selectedRegionId)?.name || 'Selected Region'}` : 'All Articles'}
          </h2>
          <RegionArticleList blogPosts={filteredPosts} />
        </div>
      </div>
    </div>
  )
}
