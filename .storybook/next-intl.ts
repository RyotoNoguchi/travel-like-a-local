import en from '../messages/en.json'
import fr from '../messages/fr.json'

type MetadataMessages = {
  home: string
  description: string
  locale: string
  alternateLocale: string
  countryName: string
  keywords: string
  creator: string
  manifestDescription: string
}

type NavMenuMessages = {
  area: string
  category: string
  search: string
  favorite: string
  language: string
  selectLanguage: string
}

type FooterMessages = {
  first: string
  second: string
  subtitle: string
}

type HeroMessages = {
  title: string
  subtitle: string
}

type Messages = {
  Metadata: MetadataMessages
  NavMenu: NavMenuMessages
  Footer: FooterMessages
  Hero: HeroMessages
}

const messagesByLocale: Record<string, Messages> = { en, fr }

const nextIntl = {
  defaultLocale: 'en',
  messagesByLocale
}

export default nextIntl
