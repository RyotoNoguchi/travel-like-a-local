'use client' // Required for event handlers and state

import JapanSvgMap from '@/app/ui/components/atoms/japan-svg-map' // Import the SVG component
import type { ConceptData } from '@/utils/concept-helper'
import React from 'react'

// Define props type
interface JapanMapProps {
  regions: ConceptData[] // Expecting region concepts (prefectures for now)
  onSelectRegion: (regionId: string) => void
  selectedRegionId: string | null
}

export const JapanMap: React.FC<JapanMapProps> = ({ regions, onSelectRegion, selectedRegionId }) => {
  // Click handler passed down to the SVG component
  const handleRegionClick = (event: React.MouseEvent<SVGPathElement>) => {
    const regionId = event.currentTarget.dataset.regionId
    if (regionId) {
      onSelectRegion(regionId) // Call the handler passed from the page
    }
  }

  // Optional: Hover handler for future use (e.g., custom tooltips)
  const handleRegionHover = (event: React.MouseEvent<SVGPathElement>) => {
    // console.log('Hovered region ID:', event.currentTarget.dataset.regionId);
  }

  return (
    <div className="relative w-full border rounded-lg overflow-hidden shadow-md bg-white p-4">
      {/* Render the actual SVG map component */}
      <JapanSvgMap
        onClick={handleRegionClick}
        onHover={handleRegionHover} // Pass hover handler (optional)
        selectedRegionId={selectedRegionId}
        regions={regions} // Pass regions data for mapping and styling
      />
      {/* Removed placeholder text */}
      {/* Tooltip logic is now handled within JapanSvgMap if needed, or could be managed here */}
    </div>
  )
}
