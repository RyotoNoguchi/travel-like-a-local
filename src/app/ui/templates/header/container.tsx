import { COLORS } from '@/app/ui/colors'
import { AreaIcon } from '@/app/ui/components/atoms/icons/area-icon'
import { BookmarkIcon } from '@/app/ui/components/atoms/icons/bookmark-icon'
import { CategoryIcon } from '@/app/ui/components/atoms/icons/category-icon'
import { SearchIcon } from '@/app/ui/components/atoms/icons/search-icon'
import { Header } from '@/app/ui/templates/header/presenter'
import { type LANGUAGE } from '@/constants'
import { getConceptSchemes } from '@/lib/contentful/get-concept-schemes'
import { getConcepts } from '@/lib/contentful/get-concepts'
import type { Category } from '@/types/category'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Props = {
  logo: {
    url: string
    title: string
  }
  locale: LANGUAGE
}

export const HeaderContainer: FC<Props> = async ({ logo, locale }) => {
  const tHeader = await getTranslations('NavMenu')
  const tFooter = await getTranslations('Footer')
  const tCategoriesNav = await getTranslations('CategoriesNav')

  // Get Category Information
  const concepts = await getConcepts()
  const conceptSchemes = await getConceptSchemes()
  const categoryScheme = conceptSchemes.find((scheme) => scheme.label.toLowerCase().includes('categories'))

  // Create Category Hierarchy
  const categories = categoryScheme
    ? categoryScheme.conceptIds
        .map((conceptId) => {
          const concept = concepts.find((c) => c.id === conceptId)
          return {
            id: conceptId,
            label: concept?.label || '',
            translatedLabel: tCategoriesNav(concept?.label || ''),
            parentIds: concept?.upperLevelConceptIds || []
          }
        })
        .filter((category) => category.label !== '')
    : []
  // Extract Top Level Categories
  const topLevelCategories: Category[] = categories.filter((category) => category.parentIds.length === 0)

  const listNavLinks = (px: number) => [
    { icon: <SearchIcon width={px} height={px} color={COLORS.GRAY} />, label: tHeader('search'), href: '/search' },
    { icon: <AreaIcon width={px} height={px} color={COLORS.GRAY} />, label: tHeader('area'), href: '/area' },
    {
      icon: <CategoryIcon width={px} height={px} color={COLORS.GRAY} />,
      label: tHeader('category'),
      href: '/category',
      isCategory: true
    },
    {
      icon: <BookmarkIcon width={px} height={px} color={COLORS.GRAY} fillColor={COLORS.TRANSPARENT} />,
      label: tHeader('bookmarks'),
      href: '/bookmarks'
    }
  ]
  return (
    <Header
      logo={logo}
      locale={locale}
      categories={topLevelCategories}
      navLinks={listNavLinks(24)}
      hamburgerMenuNavLinks={listNavLinks(32)}
      languageTitle={tHeader('language')}
      subtitle={tFooter('subtitle')}
    />
  )
}
