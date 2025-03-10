import type { Link } from 'contentful-management'
import type { TaxonomyConceptLink } from 'contentful-management/dist/typings/entities/concept'

export type ConceptScheme = {
  uri: string | null
  prefLabel: {
    [key: string]: string
  }
  definition: string | null
  topConcepts: TaxonomyConceptLink[]
  concepts: TaxonomyConceptLink[]
  totalConcepts: number
  sys: {
    type: 'TaxonomyConceptScheme'
    createdAt: string
    updatedAt: string
    id: string
    version: number
    createdBy: Link<'User'>
    updatedBy: Link<'User'>
  }
}
