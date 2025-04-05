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

export type Prefecture = {
  id: string
  name: string
}

export type Region = {
  id: string
  name: string
}
