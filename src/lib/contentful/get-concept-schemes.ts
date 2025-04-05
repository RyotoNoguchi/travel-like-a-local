/* eslint-disable no-console */
import { cmaClient } from '@/contentfulManagementClient'
// Removed fs and path imports as they are server-only

/**
 * Fetches concept schemes directly from the Contentful Management API.
 * Note: This makes a live API call.
 */
export const getConceptSchemes = async (): Promise<{ id: string; label: string; topConceptIds: string[]; conceptIds: string[] }[]> => {
  try {
    // Always fetch directly from Contentful CMA
    console.log('Fetching concept schemes directly from Contentful CMA...') // Added log for clarity
    const rawConceptSchemes = await cmaClient.conceptScheme.getMany({})
    const conceptSchemes = rawConceptSchemes.items.map((conceptScheme) => ({
      id: conceptScheme.sys.id,
      // Assuming 'en-US' is the primary locale label needed
      label: conceptScheme.prefLabel['en-US'],
      // Ensure related arrays exist and map safely
      topConceptIds: conceptScheme.topConcepts?.map((topConcept) => topConcept.sys.id) || [],
      conceptIds: conceptScheme.concepts?.map((concept) => concept.sys.id) || []
    }))
    return conceptSchemes
  } catch (error) {
    console.error('Failed to fetch concept schemes from Contentful CMA:', error)
    // Return empty array or re-throw depending on desired error handling
    return []
  }
}
