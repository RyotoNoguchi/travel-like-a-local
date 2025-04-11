import type { RegionHierarchy } from '@/types/region'
import { formatNameForUrl } from './url-helpers'

type PrefectureData = {
  prefecture: string
  path: string
}

type PrefecturesMap = {
  [key: string]: PrefectureData[]
}

export const generatePrefecturesData = (regionHierarchy: RegionHierarchy[]): PrefecturesMap => {
  const prefecturesMap: PrefecturesMap = {}

  regionHierarchy.forEach((region) => {
    const regionName = region.label.toLowerCase()

    // 北海道の特別処理
    if (regionName === 'hokkaido') {
      prefecturesMap[regionName] = [
        {
          prefecture: 'hokkaido',
          path: '/hokkaido'
        }
      ]
      return
    }

    // 沖縄の特別処理
    if (regionName === 'okinawa') {
      prefecturesMap[regionName] = [
        {
          prefecture: 'okinawa',
          path: '/okinawa'
        }
      ]
      return
    }

    // 中部地方の場合は、各エリア（東海、甲信越、北陸）が別々のトップレベルキーになる
    if (regionName === 'chubu') {
      region.divisions.forEach((division) => {
        const divisionName = division.label.toLowerCase()

        if (!prefecturesMap[divisionName]) {
          prefecturesMap[divisionName] = []
        }

        division.subDivisions.forEach((subDivision) => {
          const prefectureName = subDivision.label.toLowerCase()
          prefecturesMap[divisionName].push({
            prefecture: prefectureName,
            path: `/${regionName}/${formatNameForUrl(divisionName)}/${prefectureName}`
          })
        })
      })
      return
    }

    // その他の地域
    if (!prefecturesMap[regionName]) {
      prefecturesMap[regionName] = []
    }

    region.divisions.forEach((division) => {
      const divisionName = formatNameForUrl(division.label.toLowerCase())

      // subDivisionsが空の場合（関西、四国、九州など）
      if (division.subDivisions.length === 0) {
        prefecturesMap[regionName].push({
          prefecture: division.label.toLowerCase(),
          path: `/${regionName}/${divisionName}`
        })
      } else {
        // subDivisionsがある場合（東北、関東、中国など）
        division.subDivisions.forEach((subDivision) => {
          const prefectureName = formatNameForUrl(subDivision.label.toLowerCase())
          prefecturesMap[regionName].push({
            prefecture: prefectureName,
            path: `/${regionName}/${divisionName}/${prefectureName}`
          })
        })
      }
    })
  })

  return prefecturesMap
}
