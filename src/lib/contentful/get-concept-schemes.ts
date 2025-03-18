/* eslint-disable no-console */
import { cmaClient } from '@/contentfulManagementClient'
import fs from 'fs/promises'
import path from 'path'

export const getConceptSchemes = async (): Promise<{ id: string; label: string; topConceptIds: string[]; conceptIds: string[] }[]> => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'concept-schemes.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.warn('Could not read cached concept schemes, fetching from API instead:', error)
    const rawConceptSchemes = await cmaClient.conceptScheme.getMany({})
    const conceptSchemes = rawConceptSchemes.items.map((conceptScheme) => ({
      id: conceptScheme.sys.id,
      label: conceptScheme.prefLabel['en-US'],
      topConceptIds: conceptScheme.topConcepts.map((topConcept) => topConcept.sys.id),
      conceptIds: conceptScheme.concepts.map((concept) => concept.sys.id)
    }))
    return conceptSchemes
  }
}
