import type { Link } from 'contentful-management'
import type { TaxonomyConceptLink } from 'contentful-management/dist/typings/entities/concept'

export type Concept = {
  uri: string | null
  prefLabel: {
    [key: string]: string
  }
  altLabels: string[]
  hiddenLabels: string[]
  definition: string | null
  editorialNote: string | null
  historyNote: string | null
  example: string | null
  note: string | null
  scopeNote: string | null
  notations: string[]
  broader: TaxonomyConceptLink[]
  related: TaxonomyConceptLink[]
  sys: {
    type: 'TaxonomyConcept'
    createdAt: string
    updatedAt: string
    id: string
    version: number
    createdBy: Link<'User'>
    updatedBy: Link<'User'>
  }
}
