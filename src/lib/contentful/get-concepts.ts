/* eslint-disable no-console */
import { cmaClient } from '@/contentfulManagementClient'
import fs from 'fs/promises'
import path from 'path'

export const getConcepts = async (): Promise<{ id: string; label: string; upperLevelConceptIds: string[] }[]> => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'concepts.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.warn('Could not read cached concepts, fetching from API instead:', error)
    const rawConcepts = await cmaClient.concept.getMany({})
    const concepts = rawConcepts.items.map((concept) => ({
      id: concept.sys.id,
      label: concept.prefLabel['en-US'],
      upperLevelConceptIds: concept.broader.map((upperLevelConcept) => upperLevelConcept.sys.id) || []
    }))
    return concepts
  }
}
