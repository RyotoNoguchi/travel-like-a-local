'use client'
import { ChevronIcon } from '@/app/ui/components/atoms/icons/chevron-icon'
import { Link } from '@/i18n/routing'
import type { RegionHierarchy } from '@/types/region'
import { formatNameForUrl } from '@/utils/url-helpers'
import classNames from 'classnames'
import { type FC, useEffect, useState } from 'react'

type Props = {
  regionsHierarchy: RegionHierarchy[]
  isOpen: boolean
  backLabel: string
  onBack: () => void
  onClose: () => void
}

export const RegionsList: FC<Props> = ({ regionsHierarchy, isOpen, onBack, backLabel, onClose }) => {
  // State for expanded regions and divisions
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({})
  const [expandedDivisions, setExpandedDivisions] = useState<Record<string, boolean>>({})

  // State for visibility animations (similar to RegionsNav, simplified for mobile)
  const [visibleDivisions, setVisibleDivisions] = useState<Record<string, boolean>>({})
  const [visibleSubDivisions, setVisibleSubDivisions] = useState<Record<string, boolean>>({})

  // Toggle region expansion
  const toggleRegion = (regionId: string) => {
    setExpandedRegions((prev) => ({
      ...prev,
      [regionId]: !prev[regionId]
    }))
    // Collapse divisions when region is collapsed
    if (expandedRegions[regionId]) {
      const region = regionsHierarchy.find((r) => r.id === regionId)
      region?.divisions.forEach((d) => {
        setExpandedDivisions((prev) => ({ ...prev, [d.id]: false }))
      })
    }
  }

  // Toggle division expansion (only one division open per region)
  const toggleDivision = (regionId: string, divisionId: string) => {
    setExpandedDivisions((prev) => {
      const isCurrentlyExpanded = prev[divisionId]
      const newExpandedState: Record<string, boolean> = {}
      const region = regionsHierarchy.find((r) => r.id === regionId)

      region?.divisions.forEach((d) => {
        if (d.id === divisionId && !isCurrentlyExpanded) {
          newExpandedState[d.id] = true // Open the clicked one if it was closed
        } else {
          newExpandedState[d.id] = false // Close others in the same region or the clicked one if it was open
        }
      })

      // Keep state for other regions
      Object.keys(prev).forEach((id) => {
        if (!region?.divisions.some((d) => d.id === id)) {
          newExpandedState[id] = prev[id]
        }
      })

      return newExpandedState
    })
  }

  // Effects for staggered animation (simplified from RegionsNav)
  useEffect(() => {
    regionsHierarchy.forEach((region) => {
      region.divisions.forEach((division) => {
        setVisibleDivisions((prev) => ({
          ...prev,
          [division.id]: expandedRegions[region.id] ?? false
        }))
      })
    })
  }, [expandedRegions, regionsHierarchy])

  useEffect(() => {
    regionsHierarchy.forEach((region) => {
      region.divisions.forEach((division) => {
        division.subDivisions.forEach((subDivision) => {
          setVisibleSubDivisions((prev) => ({
            ...prev,
            [subDivision.id]: expandedDivisions[division.id] ?? false
          }))
        })
      })
    })
  }, [expandedDivisions, regionsHierarchy])

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setExpandedRegions({})
      setExpandedDivisions({})
      setVisibleDivisions({})
      setVisibleSubDivisions({})
    }
  }, [isOpen])

  return (
    <div
      className={classNames(
        'fixed inset-0 z-50 bg-white p-4 h-screen overflow-y-auto', // Added overflow-y-auto
        'transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex items-center mb-6 sticky top-0 bg-white pt-4 pb-2 z-10">
        {' '}
        {/* Made header sticky */}
        <button onClick={onBack} className="flex items-center gap-2 text-lg hover:text-primary transition-colors">
          <span className="text-slate-400">
            <ChevronIcon width={24} height={24} />
          </span>
          <span>{backLabel}</span>
        </button>
      </div>
      <ul className="flex flex-col gap-1 pb-4">
        {' '}
        {/* Reduced gap */}
        {regionsHierarchy.map((region) => (
          <li key={region.id} className="flex flex-col items-start w-full">
            {/* Region Item */}
            <div className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-md">
              <Link
                href={`/articles/${formatNameForUrl(region.label).toLowerCase()}`}
                className="text-2xl xs:text-3xl leading-none flex-grow"
                onClick={() => {
                  if (region.divisions.length === 0) {
                    onClose() // Close menu if it's a direct link
                  } else {
                    toggleRegion(region.id) // Toggle if it has children
                  }
                }}
              >
                {region.label}
              </Link>
              {region.divisions.length > 0 && (
                <button onClick={() => toggleRegion(region.id)} className="p-1 text-slate-400">
                  <ChevronIcon
                    width={20}
                    height={20}
                    className={classNames('transition-transform duration-300', expandedRegions[region.id] ? 'rotate-90' : '')}
                  />
                </button>
              )}
            </div>
            {/* Divisions List (Accordion) */}
            {expandedRegions[region.id] === true && region.divisions.length > 0 === true && (
              <ul className="flex flex-col justify-start items-start gap-1 pl-4 mt-1 w-full">
                {region.divisions.map((division, index) => (
                  <li
                    key={division.id}
                    className="w-full transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: visibleDivisions[division.id] ? '1000px' : '0', // Simple height transition
                      opacity: visibleDivisions[division.id] ? 1 : 0,
                      overflow: 'hidden',
                      transitionDelay: `${index * 50}ms` // Stagger animation
                    }}
                  >
                    {/* Division Item */}
                    <div className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-md">
                      <Link
                        href={`/articles/${formatNameForUrl(region.label).toLowerCase()}/${formatNameForUrl(division.label).toLowerCase()}`}
                        className="text-xl xs:text-2xl leading-none flex-grow"
                        onClick={() => {
                          if (division.subDivisions.length === 0) {
                            onClose() // Close menu if it's a direct link
                          } else {
                            toggleDivision(region.id, division.id) // Toggle if it has children
                          }
                        }}
                      >
                        {division.label}
                      </Link>
                      {division.subDivisions.length > 0 && (
                        <button onClick={() => toggleDivision(region.id, division.id)} className="p-1 text-slate-400">
                          <ChevronIcon
                            width={18}
                            height={18}
                            className={classNames('transition-transform duration-300', expandedDivisions[division.id] ? 'rotate-90' : '')}
                          />
                        </button>
                      )}
                    </div>

                    {/* SubDivisions List (Accordion) */}
                    {expandedDivisions[division.id] === true && division.subDivisions.length > 0 === true && (
                      <ul className="flex flex-col justify-start items-start gap-1 pl-4 mt-1 w-full">
                        {division.subDivisions.map((subDivision, subIndex) => (
                          <li
                            key={subDivision.id}
                            className="w-full transition-all duration-300 ease-in-out"
                            style={{
                              maxHeight: visibleSubDivisions[subDivision.id] ? '1000px' : '0', // Simple height transition
                              opacity: visibleSubDivisions[subDivision.id] ? 1 : 0,
                              overflow: 'hidden',
                              transitionDelay: `${subIndex * 50}ms` // Stagger animation
                            }}
                          >
                            {/* SubDivision Item */}
                            <Link
                              href={`/articles/${formatNameForUrl(region.label).toLowerCase()}/${formatNameForUrl(division.label).toLowerCase()}/${formatNameForUrl(subDivision.label).toLowerCase()}`}
                              className="block p-2 hover:bg-gray-50 rounded-md text-lg xs:text-xl leading-none"
                              onClick={onClose}
                            >
                              {subDivision.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
