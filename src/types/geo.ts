export type Geo = {
  type: 'Feature'
  properties: {
    nam: string // e.g. 'Kanagawa Ken'
    nam_ja: string // e.g. '神奈川県'
    id: number // e.g. 14
  }
  geometry: {
    type: 'MultiPolygon'
    coordinates: Array<Array<Array<Array<number>>>>
  }
  rsmKey: string // e.g. "geo-46"
  svgPath: string
}
