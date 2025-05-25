export const LOGO_ASSET_ID = '5x2sMehGUOBlAhVBVzmWoB'
export const JAPAN_MAP_ASSET_ID = '25B0oANu72SzTcK0vteCCP'
export const HERO_MOBILE_ASSET_ID = '4M1IJ6VGM45AIvMtokkAVb'
export const HERO_DESKTOP_ASSET_ID = '3w9AuT7vyyOdAJFL34UkW9'
export const HERO_TABLET_ASSET_ID = '7LTqsPyVxqKICK3orPTq3h'
export const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`
export const LOGO_TITLE = 'Travel Like a Local in Japan'
export const LOGO_TITLE_SHORT = 'TTLJP'
export const LOGO_TITLE_PREFIX = 'Travel Like a Local'
export const LOGO_TITLE_SUFFIX = 'Japan'
export const EMAIL = 'ryoto.noguchi@gmail.com'
export const PHONE_NUMBER = '+81-80-3151-6605'
export const TWITTER_HANDLE = '@Bonhomme0314'
export const TWITTER_ID = '1075725018007429120'
export const PROFILE_IMAGE_ID = '2I6HjTmgfo41UYj57BqOtH'
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
export const ARTICLE_PATH = 'articles'
export const BOOKMARKS_PATH = 'bookmarks'

export const GEO_URL = 'https://raw.githubusercontent.com/dataofjapan/land/master/japan.topojson'

export enum REGION {
  HOKKAIDO = 'Hokkaido',
  TOHOKU = 'Tohoku',
  KANTO = 'Kanto',
  TOKAI = 'Tokai',
  KOSHINETSU = 'Koshinetsu',
  HOKURIKU = 'Hokuriku',
  KANSAI = 'Kansai',
  CHUGOKU = 'Chugoku',
  SHIKOKU = 'Shikoku',
  KYUSHU = 'Kyushu',
  OKINAWA = 'Okinawa'
}

export enum PREFECTURE {
  HOKKAIDO = 'Hokkaido',
  AOMORI = 'Aomori',
  IWATE = 'Iwate',
  MIYAGI = 'Miyagi',
  AKITA = 'Akita',
  YAMAGATA = 'Yamagata',
  FUKUSHIMA = 'Fukushima',
  IBARAKI = 'Ibaraki',
  TOCHIGI = 'Tochigi',
  GUNMA = 'Gunma',
  SAITAMA = 'Saitama',
  CHIBA = 'Chiba',
  TOKYO = 'Tokyo',
  KANAGAWA = 'Kanagawa',
  NIIGATA = 'Niigata',
  TOYAMA = 'Toyama',
  ISHIKAWA = 'Ishikawa',
  FUKUI = 'Fukui',
  YAMANASHI = 'Yamanashi',
  NAGANO = 'Nagano',
  GIFU = 'Gifu',
  SHIZUOKA = 'Shizuoka',
  AICHI = 'Aichi',
  MIE = 'Mie',
  SHIGA = 'Shiga',
  KYOTO = 'Kyoto',
  OSAKA = 'Osaka',
  HYOGO = 'Hyogo',
  NARA = 'Nara',
  WAKAYAMA = 'Wakayama',
  TOTTORI = 'Tottori',
  SHIMANE = 'Shimane',
  OKAYAMA = 'Okayama',
  HIROSHIMA = 'Hiroshima',
  YAMAGUCHI = 'Yamaguchi',
  TOKUSHIMA = 'Tokushima',
  KAGAWA = 'Kagawa',
  EHIME = 'Ehime',
  KOCHI = 'Kochi',
  FUKUOKA = 'Fukuoka',
  SAGA = 'Saga',
  NAGASAKI = 'Nagasaki',
  KUMAMOTO = 'Kumamoto',
  OITA = 'Oita',
  MIYAZAKI = 'Miyazaki',
  KAGOSHIMA = 'Kagoshima',
  OKINAWA = 'Okinawa'
}

export const REGION_PREFECTURE_MAP = {
  [REGION.HOKKAIDO]: [],
  [REGION.TOHOKU]: [PREFECTURE.AOMORI, PREFECTURE.IWATE, PREFECTURE.MIYAGI, PREFECTURE.AKITA, PREFECTURE.YAMAGATA, PREFECTURE.FUKUSHIMA],
  [REGION.KANTO]: [PREFECTURE.IBARAKI, PREFECTURE.TOCHIGI, PREFECTURE.GUNMA, PREFECTURE.SAITAMA, PREFECTURE.CHIBA, PREFECTURE.TOKYO, PREFECTURE.KANAGAWA],
  [REGION.KOSHINETSU]: [PREFECTURE.NIIGATA, PREFECTURE.YAMANASHI, PREFECTURE.NAGANO],
  [REGION.HOKURIKU]: [PREFECTURE.TOYAMA, PREFECTURE.ISHIKAWA, PREFECTURE.FUKUI],
  [REGION.TOKAI]: [PREFECTURE.GIFU, PREFECTURE.SHIZUOKA, PREFECTURE.AICHI, PREFECTURE.MIE],
  [REGION.KANSAI]: [PREFECTURE.SHIGA, PREFECTURE.KYOTO, PREFECTURE.OSAKA, PREFECTURE.HYOGO, PREFECTURE.NARA, PREFECTURE.WAKAYAMA],
  [REGION.CHUGOKU]: [PREFECTURE.TOTTORI, PREFECTURE.SHIMANE, PREFECTURE.OKAYAMA, PREFECTURE.HIROSHIMA, PREFECTURE.YAMAGUCHI],
  [REGION.SHIKOKU]: [PREFECTURE.TOKUSHIMA, PREFECTURE.KAGAWA, PREFECTURE.EHIME, PREFECTURE.KOCHI],
  [REGION.KYUSHU]: [PREFECTURE.FUKUOKA, PREFECTURE.SAGA, PREFECTURE.NAGASAKI, PREFECTURE.KUMAMOTO, PREFECTURE.OITA, PREFECTURE.MIYAZAKI, PREFECTURE.KAGOSHIMA],
  [REGION.OKINAWA]: []
}
