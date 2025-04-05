'use client' // Required for event handlers and state

import type { Prefecture, Region } from '@/app/[locale]/map/page'
import { type FC, useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

type Geo = {
  type: 'Feature'
  properties: {
    nam: string // e.g. 'Kanagawa Ken'
    nam_ja: string // e.g. '神奈川県'
    id: number // e.g. 14
  }
  geometry: {
    type: 'MultiPolygon'
    coordinates: Array<Array<Array<Array<number>>>>
  }
  rsmKey: string // e.g. "geo-46"
  svgPath: string
}

type Props = {
  regions: Region[]
  prefectures: Prefecture[]
  onSelectRegion: (regionId: string) => void
  selectedRegionId: string | null
}

const geoUrl = 'https://raw.githubusercontent.com/dataofjapan/land/master/japan.topojson'

const getPrefectureName = (fullName: string): string => {
  const lowerName = fullName.toLowerCase()
  if (lowerName.includes('hokkai do')) return 'hokkaido'
  return lowerName
    .replace(/ ken$/, '') // 県を削除
    .replace(/ fu$/, '') // 府を削除
    .replace(/ to$/, '') // 都を削除
    .replace(/ do$/, '') // 道を削除
}

export const JapanMap: FC<Props> = ({ regions, prefectures, onSelectRegion, selectedRegionId }) => {
  const [tooltipContent, setTooltipContent] = useState('')
  const regionMap = useMemo(() => new Map(regions.map((r) => [r.name.toLowerCase(), r])), [regions])
  const prefectureMap = useMemo(() => new Map(prefectures.map((p) => [p.name.toLowerCase(), p])), [prefectures]) // e.g. ["kanagawa", { "id": "74qnK1Oy5Oa5F8d2TpX6sL", "name": "Kanagawa" }]

  return (
    <div className="relative w-full border rounded-lg overflow-hidden shadow-md bg-white p-4">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1200, // Adjust scale as needed
          center: [137, 36] // Center on Japan
        }}
        style={{ width: '100%', height: 'auto' }}
        data-tooltip-id="region-tooltip" // Link to Tooltip component
        data-tooltip-content={tooltipContent} // Set content dynamically
        className="border-none border-transparent focus:outline-none focus:ring-0"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo: Geo) => {
              const prefName = getPrefectureName(geo.properties.nam)
              const prefectureData = prefectureMap.get(prefName)
              const isSelected = prefectureData?.id === selectedRegionId
              const isClickable = Boolean(prefectureData) // Only clickable if we found matching concept data

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => isClickable && onSelectRegion(prefectureData?.id || '')}
                  onMouseEnter={() => {
                    setTooltipContent(geo.properties.nam || 'Unknown Region')
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('') // Clear tooltip content
                  }}
                  style={{
                    default: {
                      fill: isSelected ? '#3b82f6' : '#D6D6DA', // Blue if selected, gray otherwise
                      stroke: '#FFF', // White borders
                      strokeWidth: 0.5,
                      outline: 'none',
                      cursor: isClickable ? 'pointer' : 'default' // Pointer if clickable
                    },
                    hover: {
                      fill: isClickable ? (isSelected ? '#2563eb' : '#A5A5A8') : '#D6D6DA', // Darker blue/gray on hover if clickable
                      outline: 'none'
                    },
                    pressed: {
                      fill: isClickable ? (isSelected ? '#1d4ed8' : '#88888A') : '#D6D6DA', // Even darker on press if clickable
                      outline: 'none'
                    }
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      {/* Tooltip component for hover info */}
      <Tooltip id="region-tooltip" />
    </div>
  )
}
