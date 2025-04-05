/* eslint-disable no-console */
import type { LANGUAGE } from '@/constants'
import type { Category } from '@/types/category'
import type { RegionHierarchy } from '@/types/region'
import fs from 'fs/promises'
import { getTranslations } from 'next-intl/server'
import path from 'path'

// Define a type for the structure within concepts.json
// Based on the cache script, it looks like this:
export type ConceptData = {
  id: string
  label: string
  upperLevelConceptIds: string[]
}
export type ConceptSchemeData = {
  id: string
  label: string
  topConceptIds: string[]
  conceptIds: string[]
}

const conceptsFilePath = path.join(process.cwd(), 'public', 'data', 'concepts.json')
const conceptSchemesFilePath = path.join(process.cwd(), 'public', 'data', 'concept-schemes.json')

/**
 * Loads and parses the concepts data from the cached JSON file.
 * Note: This function uses fs and path, so it should only be run server-side
 * or during the build process. If called client-side, it will fail.
 * Consider fetching this data via an API route if needed client-side directly.
 */
export const loadConcepts = async (): Promise<ConceptData[]> => {
  try {
    const jsonData = await fs.readFile(conceptsFilePath, 'utf-8')
    const concepts: ConceptData[] = JSON.parse(jsonData)
    return concepts
  } catch (error) {
    console.error('Error loading or parsing concepts.json:', error)
    // Depending on requirements, you might return an empty array or re-throw
    return []
  }
}

export const loadConceptSchemes = async (): Promise<ConceptSchemeData[]> => {
  try {
    const jsonData = await fs.readFile(conceptSchemesFilePath, 'utf-8')
    const conceptSchemes: ConceptSchemeData[] = JSON.parse(jsonData)
    return conceptSchemes
  } catch (error) {
    console.error('Error loading or parsing concept-schemes.json:', error)
    // Depending on requirements, you might return an empty array or re-throw
    return []
  }
}

export const getCategories = async (locale: LANGUAGE): Promise<Category[]> => {
  const t = await getTranslations({ locale })
  const concepts = await loadConcepts()
  const conceptSchemes = await loadConceptSchemes()
  const categoryScheme = conceptSchemes.find((scheme) => scheme.label.toLowerCase().includes('categories'))
  return categoryScheme
    ? categoryScheme.conceptIds
        .map((conceptId) => {
          const concept = concepts.find((c) => c.id === conceptId)
          return {
            id: conceptId,
            label: concept?.label || '',
            translatedLabel: t(`CategoriesNav.${concept?.label}`),
            parentIds: concept?.upperLevelConceptIds || []
          }
        })
        .filter((category) => category.label !== '')
    : []
}

export const getRegionsHierarchy = async (): Promise<RegionHierarchy[]> => {
  const concepts = await loadConcepts()
  const conceptSchemes = await loadConceptSchemes()
  const regionConceptIds = conceptSchemes.find((scheme) => scheme.label.toLowerCase().includes('regions'))?.topConceptIds
  return regionConceptIds
    ? concepts
        .filter((concept) => regionConceptIds.includes(concept.id))
        .map((regionConcept) => ({
          id: regionConcept.id,
          label: regionConcept.label || '',
          divisions: concepts
            .filter((concept) => concept.upperLevelConceptIds.includes(regionConcept.id))
            .map((areaConcept) => ({
              id: areaConcept.id,
              label: areaConcept.label || '',
              subDivisions: concepts
                .filter((concept) => concept.upperLevelConceptIds.includes(areaConcept.id))
                .map((subDivisionConcept) => ({
                  id: subDivisionConcept.id,
                  label: subDivisionConcept.label || ''
                }))
            }))
        }))
    : []
}

export const getRegions = async () => {
  const concepts = await loadConcepts()
  const conceptSchemes = await loadConceptSchemes()
  const regionConceptIds = conceptSchemes.find((scheme) => scheme.label.toLowerCase().includes('regions'))?.topConceptIds
  const regions = concepts
    .filter((concept: ConceptData) => regionConceptIds?.includes(concept.id))
    .map((region) => ({
      id: region.id,
      name: region.label
    }))
  return regions
}

export const getPrefectures = async (): Promise<{ id: string; name: string }[]> => {
  const regions = await getRegionsHierarchy()
  const prefectures: { id: string; name: string }[] = []

  for (const region of regions) {
    // 北海道は特殊ケース - 直接追加
    if (region.label === 'Hokkaido') {
      prefectures.push({ id: region.id, name: region.label })
      continue
    }

    // divisionsがない場合は直接都道府県として扱う
    if (!region.divisions || region.divisions.length === 0) {
      prefectures.push({ id: region.id, name: region.label })
      continue
    }

    // 各地域の中の都道府県を抽出
    for (const division of region.divisions) {
      // subDivisionsがある場合はそれらが都道府県
      if (division.subDivisions && division.subDivisions.length > 0) {
        division.subDivisions.forEach((subDivision) => prefectures.push({ id: subDivision.id, name: subDivision.label }))
      }
      // subDivisionsが空配列の場合、divisionが都道府県
      else {
        prefectures.push({ id: division.id, name: division.label })
      }
    }
  }

  return prefectures
}
