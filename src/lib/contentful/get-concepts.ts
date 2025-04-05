/* eslint-disable no-console */
import { cmaClient } from '@/contentfulManagementClient'
// Removed fs and path imports as they are server-only

/**
 * Fetches concepts directly from the Contentful Management API.
 * Note: This makes a live API call. For client-side needs, prefer fetching
 * from the cached data via the `/api/concepts` route.
 */
export const getConcepts = async (): Promise<{ id: string; label: string; upperLevelConceptIds: string[] }[]> => {
  try {
    // Always fetch directly from Contentful CMA
    console.log('Fetching concepts directly from Contentful CMA...') // Added log for clarity
    const rawConcepts = await cmaClient.concept.getMany({})
    const concepts = rawConcepts.items.map((concept) => ({
      id: concept.sys.id,
      // Assuming 'en-US' is the primary locale label needed
      label: concept.prefLabel['en-US'],
      // Ensure 'broader' exists and map safely
      upperLevelConceptIds: concept.broader?.map((upperLevelConcept) => upperLevelConcept.sys.id) || []
    }))
    return concepts
  } catch (error) {
    console.error('Failed to fetch concepts from Contentful CMA:', error)
    // Return empty array or re-throw depending on desired error handling
    return []
  }
}
