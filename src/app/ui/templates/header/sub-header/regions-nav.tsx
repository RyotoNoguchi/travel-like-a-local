'use client'
import { ChevronIcon } from '@/app/ui/components/atoms/icons/chevron-icon'
import { Link } from '@/i18n/routing'
import type { RegionHierarchy } from '@/types/region'
import classNames from 'classnames'
import { useEffect, useState, type Dispatch, type FC, type SetStateAction } from 'react'

type Props = {
  regionsHierarchy: RegionHierarchy[]
  isNavVisible: boolean
  setIsNavVisible: Dispatch<SetStateAction<boolean>>
}

export const RegionsNav: FC<Props> = ({ regionsHierarchy, isNavVisible, setIsNavVisible }) => {
  // 展開状態を管理するための状態
  // regionの展開状態 (regionId -> 展開されているかどうか)
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({})
  // divisionの展開状態 (divisionId -> 展開されているかどうか)
  const [expandedDivisions, setExpandedDivisions] = useState<Record<string, boolean>>({})
  const [visibleDivisions, setVisibleDivisions] = useState<Record<string, boolean>>({})
  const [visibleSubDivisions, setVisibleSubDivisions] = useState<Record<string, boolean>>({})

  // regionの展開状態を切り替える
  const toggleRegion = (regionId: string) => {
    setExpandedRegions((prev) => ({
      ...prev,
      [regionId]: !prev[regionId]
    }))
  }

  // divisionの展開状態を切り替える (同一region内では1つだけ展開)
  const toggleDivision = (regionId: string, divisionId: string) => {
    setExpandedDivisions((prev) => {
      const isCurrentlyExpanded = prev[divisionId]
      const newExpandedState: Record<string, boolean> = {}

      // Find the specific region
      const region = regionsHierarchy.find((r) => r.id === regionId)
      if (!region) {
        return prev // Should not happen
      }

      // Iterate through all divisions in the hierarchy to build the new state
      regionsHierarchy.forEach((r) => {
        r.divisions.forEach((d) => {
          if (r.id === regionId) {
            // If this division is the one clicked and it was closed, open it
            if (d.id === divisionId && !isCurrentlyExpanded) {
              newExpandedState[d.id] = true
            } else {
              // Otherwise (either different division in the same region, or the clicked one was open), close it
              newExpandedState[d.id] = false
            }
          } else {
            // Keep the state of divisions in other regions
            newExpandedState[d.id] = prev[d.id] || false
          }
        })
      })

      return newExpandedState
    })
  }

  useEffect(() => {
    regionsHierarchy.forEach((region) => {
      if (expandedRegions[region.id]) {
        region.divisions.forEach((division, index) => {
          setTimeout(() => {
            setVisibleDivisions((prev) => ({
              ...prev,
              [division.id]: true
            }))
          }, index * 20) // 各divisionに遅延を設定
        })
      } else {
        region.divisions.forEach((division) => {
          setVisibleDivisions((prev) => ({
            ...prev,
            [division.id]: false
          }))
        })
      }
    })
  }, [expandedRegions, regionsHierarchy])

  useEffect(() => {
    regionsHierarchy.forEach((region) => {
      region.divisions.forEach((division) => {
        if (expandedDivisions[division.id]) {
          division.subDivisions.forEach((subDivision, index) => {
            setTimeout(() => {
              setVisibleSubDivisions((prev) => ({
                ...prev,
                [subDivision.id]: true
              }))
            }, index * 20) // 各subDivisionに遅延を設定
          })
        } else {
          division.subDivisions.forEach((subDivision) => {
            setVisibleSubDivisions((prev) => ({
              ...prev,
              [subDivision.id]: false
            }))
          })
        }
      })
    })
  }, [expandedDivisions, regionsHierarchy])

  return (
    <nav
      className={classNames(
        'hidden h-72 w-full justify-center items-start fixed top-14 left-0 right-0 z-50 bg-white drop-shadow-md',
        'transition-all duration-300 ease-in-out',
        'sm:flex',
        isNavVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-1 pointer-events-none'
      )}
      onMouseEnter={() => setIsNavVisible(true)}
      onMouseLeave={() => setIsNavVisible(false)}
    >
      <ul className="w-full grid grid-cols-9 gap-4 px-4 items-start justify-center py-4">
        {regionsHierarchy.map((region) => (
          <li className="flex flex-col items-start w-full" key={region.id}>
            <div className="flex items-center gap-2 justify-between cursor-pointer h-5">
              <Link
                href={`/articles/${region.label.toLowerCase()}`}
                className="hover-animation hover:text-primary text-xl font-semibold text-left flex-grow leading-none"
                onClick={(e) => {
                  if (region.divisions.length > 0) {
                    e.preventDefault() // リンクのデフォルト動作を停止
                    toggleRegion(region.id)
                  }
                }}
              >
                {region.label}
              </Link>
              {region.divisions.length > 0 && (
                <button onClick={() => toggleRegion(region.id)} className="p-1 rounded-full transition-transform group text-slate-400">
                  <ChevronIcon
                    width={24}
                    height={24}
                    className={classNames('transition-transform duration-300 group-hover:text-primary', expandedRegions[region.id] ? 'rotate-90' : '')}
                  />
                </button>
              )}
            </div>
            {/* divisionのリスト - regionが展開されている場合のみ表示 */}
            {expandedRegions[region.id] === true && (
              <ul className="flex flex-col justify-start items-start gap-2 pl-2 mt-2">
                {region.divisions.map((division, index) => (
                  <li
                    key={division.id}
                    className="w-full"
                    style={{
                      transitionDelay: `${index * 100}ms`, // 各アイテムに遅延を設定
                      transitionProperty: 'opacity, transform',
                      transitionDuration: '300ms',
                      transitionTimingFunction: 'ease',
                      opacity: visibleDivisions[division.id] ? 1 : 0,
                      transform: visibleDivisions[division.id] ? 'translateY(0px)' : 'translateY(-10px)'
                    }}
                  >
                    <div className="flex items-center justify-between cursor-pointer">
                      <Link
                        href={`/articles/${region.label.toLowerCase()}/${division.label.toLowerCase()}`}
                        className="hover-animation hover:text-primary text-lg flex-grow leading-none"
                        onClick={(e) => {
                          if (division.subDivisions.length > 0) {
                            e.preventDefault() // リンクのデフォルト動作を停止
                            toggleDivision(region.id, division.id)
                          }
                        }}
                      >
                        {division.label}
                      </Link>
                      {division.subDivisions.length > 0 && (
                        <button
                          onClick={() => toggleDivision(region.id, division.id)}
                          className="hover:bg-gray-100 rounded-full transition-transform group text-slate-400"
                        >
                          <ChevronIcon
                            width={18}
                            height={18}
                            className={classNames(
                              'transition-transform duration-300 group-hover:text-primary',
                              expandedDivisions[division.id] ? 'rotate-90' : ''
                            )}
                          />
                        </button>
                      )}
                    </div>
                    {/* subDivisionのリスト - divisionが展開されている場合のみ表示 */}
                    {expandedDivisions[division.id] === true && (
                      <ul className="flex flex-col justify-start items-start gap-2 pl-4 mt-1">
                        {division.subDivisions.map((subDivision, index) => (
                          <li
                            key={subDivision.id}
                            style={{
                              transitionDelay: `${index * 100}ms`, // 各subDivisionに遅延を設定
                              transitionProperty: 'opacity, transform',
                              transitionDuration: '300ms',
                              transitionTimingFunction: 'ease',
                              opacity: visibleSubDivisions[subDivision.id] ? 1 : 0,
                              transform: visibleSubDivisions[subDivision.id] ? 'translateY(0px)' : 'translateY(-10px)'
                            }}
                          >
                            <Link
                              href={`/articles/${region.label.toLowerCase()}/${division.label.toLowerCase()}/${subDivision.label.toLowerCase()}`}
                              className="hover-animation hover:text-primary"
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
    </nav>
  )
}
