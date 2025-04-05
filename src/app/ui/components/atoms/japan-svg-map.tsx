'use client'

import type { ConceptData } from '@/utils/concept-helper'
import React from 'react'

interface JapanSvgMapProps {
  onClick: (event: React.MouseEvent<SVGPathElement>) => void
  onHover?: (event: React.MouseEvent<SVGPathElement>) => void // Optional hover handler
  selectedRegionId: string | null
  regions: ConceptData[] // Pass regions to map IDs to SVG paths
}

// TODO: Find and embed an actual SVG map of Japan here.
// The SVG should have <path> elements for each prefecture/region.
// Each relevant <path> should ideally have an id or title matching a region name/label.
// We will need to modify the SVG paths to add `data-region-id` attributes based on matching region data.

// Example structure representing simplified SVG paths and their expected IDs
// In a real scenario, you'd parse the actual SVG or have this structure defined based on it.
const svgPathsData = [
  { svgId: 'jp-01', pathData: 'M200,10 L250,50 L200,90 Z', name: 'Hokkaido' }, // Example path data
  { svgId: 'jp-13', pathData: 'M500,200 L550,250 L500,290 Z', name: 'Tokyo' },
  { svgId: 'jp-27', pathData: 'M400,300 L450,350 L400,390 Z', name: 'Osaka' }
  // ... add all other prefecture paths from the actual SVG
]

const JapanSvgMap: React.FC<JapanSvgMapProps> = ({ onClick, onHover, selectedRegionId, regions }) => {
  // Create a map for quick lookup of region data by label (lowercase)
  const regionMap = new Map(regions.map((r) => [r.label.toLowerCase(), r]))

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600" // Adjust viewBox based on actual SVG
      className="w-full h-auto"
      aria-label="Map of Japan"
    >
      <g>
        {svgPathsData.map((pathInfo) => {
          // Find corresponding region data by matching the path's name (adjust matching logic if needed)
          const regionData = regionMap.get(pathInfo.name.toLowerCase())
          const isSelected = regionData?.id === selectedRegionId
          const isClickable = Boolean(regionData)

          return (
            <path
              key={pathInfo.svgId}
              id={pathInfo.svgId} // Use the ID from the SVG data
              d={pathInfo.pathData} // Use the path data from the SVG data
              data-region-id={regionData?.id} // Add the concept ID as data attribute
              onClick={isClickable ? onClick : undefined} // Only attach onClick if clickable
              onMouseEnter={onHover} // Attach hover handler (optional)
              className={`transition-colors stroke-white stroke-[0.5] ${
                isClickable ? `cursor-pointer ${isSelected ? 'fill-blue-500' : 'fill-gray-300 hover:fill-gray-400'}` : 'fill-gray-200 cursor-default' // Style for non-clickable regions
              }`}
            />
          )
        })}
      </g>
      {/* Optional: Add labels or other SVG elements */}
    </svg>
  )
}

export default JapanSvgMap
