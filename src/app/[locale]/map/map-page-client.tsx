'use client' // This component handles state and interactivity

import { JapanMap } from '@/app/ui/components/organisms/japan-map/japan-map'
import { RegionArticleList } from '@/app/ui/components/organisms/region-article-list/region-article-list'
import type { BlogPostWithHref } from '@/types/blog-post'
import type { ConceptData } from '@/utils/concept-helper'
import { type FC, useState } from 'react'

type Props = {
  initialRegions: ConceptData[]
  initialAllPosts: BlogPostWithHref[]
}

export const MapPageClient: FC<Props> = ({ initialRegions, initialAllPosts }) => {
  // State is managed here
  const [regions] = useState<ConceptData[]>(initialRegions) // Use initial data
  const [allPosts] = useState<BlogPostWithHref[]>(initialAllPosts) // Use initial data
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null)

  // Filtering logic remains the same
  const filteredPosts = selectedRegionId ? allPosts.filter((post) => post.contentfulMetadata?.concepts?.some((c) => c?.id === selectedRegionId)) : allPosts

  // Handler for region selection remains the same
  const handleRegionSelect = (regionId: string) => {
    setSelectedRegionId(regionId === selectedRegionId ? null : regionId) // Toggle selection
  }

  // No useEffect needed here for initial data fetching as it's passed via props

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Articles by Region</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <JapanMap regions={regions} onSelectRegion={handleRegionSelect} selectedRegionId={selectedRegionId} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {selectedRegionId ? `Articles in ${regions.find((r) => r.id === selectedRegionId)?.label || 'Selected Region'}` : 'All Articles'}
          </h2>
          <RegionArticleList articles={filteredPosts} />
        </div>
      </div>
    </div>
  )
}
