export const LOGO_ASSET_ID = '5x2sMehGUOBlAhVBVzmWoB'
export const HERO_MOBILE_ASSET_ID = '20Dn5MjJUlh6fy6xNt6RBZ'
export const HERO_DESKTOP_ASSET_ID = '76pMKRS0OXj7oi6qzpVzl1'
export const HERO_TABLET_ASSET_ID = 'LCUChXjqIsyc786zGKEQx'
export const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`
export const LOGO_TITLE = 'Travel Like a Local in Japan'
export const LOGO_TITLE_SHORT = 'TTLJP'
export const LOGO_TITLE_PREFIX = 'Travel Like a Local'
export const LOGO_TITLE_SUFFIX = 'Japan'
export const EMAIL = 'ryoto.noguchi@gmail.com'
export const PHONE_NUMBER = '+81-80-3151-6605'
export const TWITTER_HANDLE = '@Bonhomme0314'
export const TWITTER_ID = '1075725018007429120'
export enum LANGUAGE {
  EN = 'en',
  FR = 'fr'
}
export enum LOCALE_CODE {
  EN = 'en-US',
  FR = 'fr-FR'
}
export const LOCALE_CODE_MAP = {
  [LANGUAGE.EN]: LOCALE_CODE.EN,
  [LANGUAGE.FR]: LOCALE_CODE.FR
}
export const REDIS_KEYS = {
  NAMESPACE: 'travel-like-a-local',
  DEDUPLICATE: 'deduplicate',
  PAGEVIEWS: 'pageviews'
}
export const DEFAULT_LOCALE = LOCALE_CODE.EN
export enum CONCEPT_SCHEME {
  CATEGORIES = 'Categories',
  REGIONS = 'Regions'
}
