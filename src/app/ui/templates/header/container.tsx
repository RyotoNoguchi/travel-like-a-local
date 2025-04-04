import { COLORS } from '@/app/ui/colors'
import { AreaIcon } from '@/app/ui/components/atoms/icons/area-icon'
import { BookmarkIcon } from '@/app/ui/components/atoms/icons/bookmark-icon'
import { CategoryIcon } from '@/app/ui/components/atoms/icons/category-icon'
import { SearchIcon } from '@/app/ui/components/atoms/icons/search-icon'
import { Header } from '@/app/ui/templates/header/presenter'
import { BOOKMARKS_PATH, type LANGUAGE } from '@/constants'
import { getConceptSchemes } from '@/lib/contentful/get-concept-schemes'
import { getConcepts } from '@/lib/contentful/get-concepts'
import type { Category } from '@/types/category'
import type { RegionHierarchy } from '@/types/region'
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
  const t = await getTranslations({ locale })

  // Get Category Information
  const concepts = await getConcepts()
  const conceptSchemes = await getConceptSchemes()
  const categoryScheme = conceptSchemes.find((scheme) => scheme.label.toLowerCase().includes('categories'))
  const regionConceptIds = conceptSchemes.find((scheme) => scheme.label.toLowerCase().includes('regions'))?.topConceptIds

  const regionsHierarchy: RegionHierarchy[] = regionConceptIds
    ? concepts
        .filter((concept) => regionConceptIds.includes(concept.id))
        .map((regionConcept) => ({
          id: regionConcept.id,
          label: regionConcept.label || '',
          divisions: concepts
            .filter((concept) => concept.upperLevelConceptIds.includes(regionConcept.id))
            .map((areaConcept) => ({
              id: areaConcept.id,
              label: areaConcept.label || '',
              subDivisions: concepts
                .filter((concept) => concept.upperLevelConceptIds.includes(areaConcept.id))
                .map((subDivisionConcept) => ({
                  id: subDivisionConcept.id,
                  label: subDivisionConcept.label || ''
                }))
            }))
        }))
    : []

  // Create Category Hierarchy
  const categories = categoryScheme
    ? categoryScheme.conceptIds
        .map((conceptId) => {
          const concept = concepts.find((c) => c.id === conceptId)
          return {
            id: conceptId,
            label: concept?.label || '',
            translatedLabel: t(`CategoriesNav.${concept?.label}`),
            parentIds: concept?.upperLevelConceptIds || []
          }
        })
        .filter((category) => category.label !== '')
    : []
  // Extract Top Level Categories
  const topLevelCategories: Category[] = categories.filter((category) => category.parentIds.length === 0)

  const listNavLinks = (px: number) => [
    { icon: <SearchIcon width={px} height={px} color={COLORS.GRAY} />, label: t('NavMenu.search'), href: '/search' },
    { icon: <AreaIcon width={px} height={px} color={COLORS.GRAY} />, label: t('NavMenu.area'), href: '/#', isRegion: true },
    {
      icon: <CategoryIcon width={px} height={px} color={COLORS.GRAY} />,
      label: t('NavMenu.category'),
      href: '#',
      isCategory: true
    },
    {
      icon: <BookmarkIcon width={px} height={px} strokeColor={COLORS.GRAY} fillColor={COLORS.TRANSPARENT} strokeWidth={2} />,
      label: t('NavMenu.bookmarks'),
      href: `/${BOOKMARKS_PATH}`
    }
  ]
  return (
    <Header
      logo={logo}
      locale={locale}
      categories={topLevelCategories}
      regionsHierarchy={regionsHierarchy}
      navLinks={listNavLinks(24)}
      hamburgerMenuNavLinks={listNavLinks(32)}
      languageTitle={t('NavMenu.language')}
      subtitle={t('Footer.subtitle')}
    />
  )
}
