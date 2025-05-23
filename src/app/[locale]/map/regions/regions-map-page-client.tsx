'use client'

import { BlogPostCard } from '@/app/ui/components/molecules/blog-post-card'
import { Breadcrumbs } from '@/app/ui/components/molecules/breadcrumbs'
import type { Asset } from '@/generated/graphql'
import { Link, usePathname } from '@/i18n/routing'
import type { BlogPostWithHref } from '@/types/blog-post'
import type { BreadcrumbItem } from '@/types/breadcrumbs'
import type { Region } from '@/types/region'
import { capitalizeFirstLetter } from '@/utils/string-helper'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState, type FC } from 'react'

type Props = {
  regionMapImages: Pick<Asset, 'url' | 'title' | 'fileName'>[]
  regionImages: Pick<Asset, 'url' | 'title' | 'fileName'>[]
  initialBlogPosts: BlogPostWithHref[]
  regions: (Region & { prefectures: { prefecture: string; path: string }[] })[]
  breadcrumbs: BreadcrumbItem[]
}

export const RegionPageClient: FC<Props> = ({ regionMapImages, regionImages, regions, initialBlogPosts, breadcrumbs }) => {
  const params = useParams<{ locale: string }>()
  const locale = params?.locale
  const pathname = usePathname() // e.g /map/regions/koshinetsu
  const regionName = pathname.split('/').pop()

  const [hoveredRegionTitle, setHoveredRegionTitle] = useState<string | null>(null)
  const [selectedRegionName, setSelectedRegionName] = useState<string | null>(regionName ?? null)
  const selectedRegionMapImage = regionMapImages.find((regionMapImage) => regionMapImage.title === selectedRegionName)
  const hoveredRegionMapImage = regionMapImages.find((regionMapImage) => regionMapImage.title === hoveredRegionTitle)
  const japanMapImage = regionMapImages.find((regionMapImage) => regionMapImage.title === 'japan')

  const selectedRegionId = regions.find((region) => region.name === selectedRegionName)?.id
  const filteredBlogPosts = selectedRegionId
    ? initialBlogPosts.filter((blogPost) => blogPost.contentfulMetadata?.concepts?.some((c) => c?.id === selectedRegionId))
    : initialBlogPosts

  return (
    <div className="lg:container mx-auto px-4 py-2 flex flex-col gap-4">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-3xl font-bold text-center">Explore articles by region</h1>
      <div className="flex flex-col gap-8 md:gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-2 flex justify-center items-center relative mb-4 md:mb-0">
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
          <div className="lg:col-span-3">
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {regionImages.map((image) => {
                const regionName = image.title ?? ''
                return (
                  <li
                    key={image.url}
                    className="cursor-pointer hover-animation flex items-center shadow-md px-2 gap-1.5"
                    onMouseEnter={() => setHoveredRegionTitle(regionName)}
                    onMouseLeave={() => setHoveredRegionTitle(null)}
                    role="button"
                    onClick={() => {
                      setSelectedRegionName(regionName)
                      if (locale) {
                        const newPath = `/${locale}/map/regions/${regionName}`
                        window.history.pushState(null, '', newPath)
                      }
                      document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <Image src={image.url ?? ''} alt={regionName} width={80} height={80} />
                    <div className="flex flex-col">
                      <p className="text-base md:text-xl">{capitalizeFirstLetter(regionName)}</p>
                      <ul className="flex flex-wrap gap-x-0.5">
                        {regions
                          .find((region) => region.name === regionName)
                          ?.prefectures.map((prefecture, i) => (
                            <li key={prefecture.prefecture} className="text-xs md:text-sm">
                              <Link href={`/articles${prefecture.path}`} className="text-slate-500 hover:text-primary">
                                {i === 0 ? capitalizeFirstLetter(prefecture.prefecture) : `/ ${capitalizeFirstLetter(prefecture.prefecture)}`}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <hr className="text-slate-300" />
        {filteredBlogPosts.length === 0 ? (
          <p className="text-center text-3xl">No articles found for {selectedRegionName}.</p>
        ) : (
          <div className="flex flex-col">
            <h2 id="articles" className="text-3xl text-center font-bold mb-4">
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
