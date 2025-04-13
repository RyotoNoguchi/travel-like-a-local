'use client'

import { COLORS } from '@/app/ui/colors'
import { GEO_URL } from '@/constants'
import type { Geo } from '@/types/geo'
import type { Prefecture } from '@/types/region'
import { type FC, useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

type Props = {
  prefectures: Prefecture[]
  onSelectRegion: (regionId: string) => void
  selectedRegionId: string | null
}

const getPrefectureName = (fullName: string): string => {
  const lowerName = fullName.toLowerCase()
  if (lowerName.includes('hokkai do')) return 'hokkaido'
  return lowerName
    .replace(/ ken$/, '') // 県を削除
    .replace(/ fu$/, '') // 府を削除
    .replace(/ to$/, '') // 都を削除
    .replace(/ do$/, '') // 道を削除
}

export const JapanMap: FC<Props> = ({ prefectures, onSelectRegion, selectedRegionId }) => {
  const prefectureMap = useMemo(() => new Map(prefectures.map((p) => [p.name.toLowerCase(), p])), [prefectures])
  const [position, setPosition] = useState({ coordinates: [137, 36.5], zoom: 1 })

  const handleZoomIn = () => {
    if (position.zoom >= 4) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.2 }))
  }

  const handleZoomOut = () => {
    if (position.zoom <= 0.8) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.2 }))
  }

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position)
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg drop-shadow-lg drop bg-white p-4">
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md text-xl font-bold"
          aria-label="ズームイン"
        >
          ＋
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md text-xl font-bold"
          aria-label="ズームアウト"
        >
          ―
        </button>
      </div>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1400, // Adjust scale as needed
          center: [137, 36.5] // Center on Japan
        }}
        style={{ width: '100%', height: 'auto' }}
        className="border-none border-transparent focus:outline-none focus:ring-0"
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates as [number, number]}
          onMoveEnd={handleMoveEnd}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filterZoomEvent={(evt: any) => (evt.type === 'wheel' ? false : true)}
          translateExtent={[
            [-300, -300],
            [900, 900]
          ]}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo: Geo) => {
                const prefName = getPrefectureName(geo.properties.nam)
                const prefectureData = prefectureMap.get(prefName)
                const isSelected = prefectureData?.id === selectedRegionId
                const isClickable = Boolean(prefectureData)

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    data-tooltip-id="region-tooltip" // Identifier for the tooltip anchor
                    data-tooltip-content={prefName.charAt(0).toUpperCase() + prefName.slice(1)}
                    onClick={() => isClickable && onSelectRegion(prefectureData?.id || '')}
                    style={{
                      default: {
                        fill: isSelected ? COLORS.PRIMARY : COLORS.GRAY_300,
                        stroke: '#FFF',
                        strokeWidth: 0.5,
                        outline: 'none',
                        cursor: isClickable ? 'pointer' : 'default'
                      },
                      hover: {
                        fill: isClickable ? (isSelected ? COLORS.PRIMARY_600 : COLORS.GRAY_400) : COLORS.GRAY_300,
                        outline: 'none'
                      },
                      pressed: {
                        fill: isClickable ? (isSelected ? COLORS.PRIMARY_400 : COLORS.GRAY_600) : COLORS.GRAY_300,
                        outline: 'none'
                      }
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip anchorSelect="[data-tooltip-id='region-tooltip']" place="top" style={{ fontSize: '1.25rem', fontWeight: 700, padding: '0.5rem 1rem' }} />
    </div>
  )
}
