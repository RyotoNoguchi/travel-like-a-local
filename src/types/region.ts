export type RegionHierarchy = {
  id: string
  label: string
  divisions: {
    id: string
    label: string
    subDivisions: {
      id: string
      label: string
    }[]
  }[]
}
