'use client'

import { BlogPostCard } from '@/app/ui/components/molecules/blog-post-card'
import type { Asset } from '@/generated/graphql'
import type { BlogPostWithHref } from '@/types/blog-post'
import type { Region } from '@/types/region'
import { capitalizeFirstLetter } from '@/utils/string-helper'
import Image from 'next/image'
import { useState, type FC } from 'react'

type Props = {
  regionMapImages: Pick<Asset, 'url' | 'title' | 'fileName'>[]
  regionImages: Pick<Asset, 'url' | 'title' | 'fileName'>[]
  initialBlogPosts: BlogPostWithHref[]
  regions: Region[]
}

export const RegionPageClient: FC<Props> = ({ regionMapImages, regionImages, regions, initialBlogPosts }) => {
  const [hoveredRegionTitle, setHoveredRegionTitle] = useState<string | null>(null)
  const [selectedRegionName, setSelectedRegionName] = useState<string | null>(null)
  const selectedRegionMapImage = regionMapImages.find((regionMapImage) => regionMapImage.title === selectedRegionName)
  const hoveredRegionMapImage = regionMapImages.find((regionMapImage) => regionMapImage.title === hoveredRegionTitle)
  const japanMapImage = regionMapImages.find((regionMapImage) => regionMapImage.title === 'japan')

  const selectedRegionId = regions.find((region) => region.name === selectedRegionName)?.id
  const filteredBlogPosts = selectedRegionId
    ? initialBlogPosts.filter((blogPost) => blogPost.contentfulMetadata?.concepts?.some((c) => c?.id === selectedRegionId))
    : initialBlogPosts

  return (
    <div className="lg:container mx-auto px-4 py-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center">Explore articles by region</h1>
      <div className="flex flex-col gap-8 md:gap-6">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-2 flex justify-center items-center relative mb-4 md:mb-0">
            {hoveredRegionTitle ? (
              <Image
                src={hoveredRegionMapImage?.url ?? japanMapImage?.url ?? ''}
                alt={hoveredRegionMapImage?.title ?? japanMapImage?.title ?? ''}
                width={400}
                height={400}
              />
            ) : (
              <Image
                src={selectedRegionMapImage?.url ?? japanMapImage?.url ?? ''}
                alt={selectedRegionMapImage?.title ?? japanMapImage?.title ?? ''}
                width={400}
                height={400}
              />
            )}
          </div>
          <div className="col-span-3">
            <ul className="grid grid-cols-3 gap-4">
              {regionImages.map((image) => (
                <li
                  key={image.url}
                  className="cursor-pointer hover-animation flex items-center shadow-md px-2 gap-1.5"
                  onMouseEnter={() => setHoveredRegionTitle(image.title ?? '')}
                  onMouseLeave={() => setHoveredRegionTitle(null)}
                  role="button"
                  onClick={() => setSelectedRegionName(image.title ?? '')}
                >
                  <Image src={image.url ?? ''} alt={image.title ?? ''} width={80} height={80} />
                  <div className="flex flex-col">
                    <p className="text-xl">{capitalizeFirstLetter(image.title ?? '')}</p>
                    <ul className=""></ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="text-slate-300" />
        {filteredBlogPosts.length === 0 ? (
          <p className="text-center text-3xl">No articles found for {selectedRegionName}.</p>
        ) : (
          <div className="flex flex-col">
            <h2 className="text-3xl text-center font-bold mb-4">
              {selectedRegionName ? `Articles in ${capitalizeFirstLetter(selectedRegionName)}` : 'All articles'}
            </h2>
            <ul className="min-h-[400px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredBlogPosts.map((blogPost) => (
                <li key={blogPost.sys.id} className="">
                  <BlogPostCard blogPost={blogPost} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
